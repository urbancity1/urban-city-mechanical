import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";

const IS_REPLIT = !!process.env.REPL_ID;

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: IS_REPLIT ? true : process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  // Password-based auth mode (Railway / non-Replit environments)
  if (!IS_REPLIT) {
    app.get("/api/auth/mode", (_req, res) => res.json({ mode: "password" }));

    app.post("/api/admin-login", (req, res) => {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        return res.status(500).json({ message: "ADMIN_PASSWORD not configured" });
      }
      if (password === adminPassword) {
        (req.session as any).isAdmin = true;
        return res.json({ success: true });
      }
      return res.status(401).json({ message: "Incorrect password" });
    });

    app.get("/api/login", (_req, res) => res.redirect("/login"));

    app.get("/api/logout", (req, res) => {
      req.session.destroy(() => {
        res.redirect("/");
      });
    });

    return;
  }

  // Replit OIDC auth mode — dynamically imported to avoid ESM issues in CJS builds
  app.get("/api/auth/mode", (_req, res) => res.json({ mode: "replit" }));

  const client = await import("openid-client");
  const { Strategy } = await import("openid-client/passport");

  const memoize = (await import("memoizee")).default;

  const getOidcConfig = memoize(
    async () => {
      return await client.discovery(
        new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
        process.env.REPL_ID!
      );
    },
    { maxAge: 3600 * 1000 }
  );

  const config = await getOidcConfig();

  function updateUserSession(user: any, tokens: any) {
    user.claims = tokens.claims();
    user.access_token = tokens.access_token;
    user.refresh_token = tokens.refresh_token;
    user.expires_at = user.claims?.exp;
  }

  async function upsertUser(claims: any) {
    const { authStorage } = await import("./storage");
    await authStorage.upsertUser({
      id: claims["sub"],
      email: claims["email"],
      firstName: claims["first_name"],
      lastName: claims["last_name"],
      profileImageUrl: claims["profile_image_url"],
    });
  }

  const registeredStrategies = new Set<string>();

  const ensureStrategy = (domain: string) => {
    const strategyName = `replitauth:${domain}`;
    if (!registeredStrategies.has(strategyName)) {
      const strategy = new Strategy(
        {
          name: strategyName,
          config,
          scope: "openid email profile offline_access",
          callbackURL: `https://${domain}/api/callback`,
        },
        async (tokens: any, verified: passport.AuthenticateCallback) => {
          const user = {};
          updateUserSession(user, tokens);
          await upsertUser(tokens.claims());
          verified(null, user);
        }
      );
      passport.use(strategy);
      registeredStrategies.add(strategyName);
    }
  };

  app.get("/api/login", (req, res, next) => {
    ensureStrategy(req.hostname);
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    ensureStrategy(req.hostname);
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    })(req, res, next);
  });

  app.get("/api/logout", async (req, res) => {
    const config = await getOidcConfig();
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // Password auth (Railway / non-Replit)
  if ((req.session as any)?.isAdmin) {
    return next();
  }

  // Replit OIDC auth
  const user = req.user as any;
  if (!req.isAuthenticated() || !user?.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const client = await import("openid-client");
    const memoize = (await import("memoizee")).default;
    const getOidcConfig = memoize(
      async () => {
        return await client.discovery(
          new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
          process.env.REPL_ID!
        );
      },
      { maxAge: 3600 * 1000 }
    );
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    const claims = tokenResponse.claims();
    user.claims = claims;
    user.access_token = tokenResponse.access_token;
    user.refresh_token = tokenResponse.refresh_token;
    user.expires_at = claims?.exp;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
