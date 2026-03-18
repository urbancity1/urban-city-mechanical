import type { Express } from "express";
import { authStorage } from "./storage";
import { isAuthenticated } from "./replitAuth";

const IS_REPLIT = !!process.env.REPL_ID;

export function registerAuthRoutes(app: Express): void {
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      if (!IS_REPLIT) {
        return res.json({
          id: "admin",
          username: "admin",
          firstName: "Shaun",
          lastName: "",
          profileImageUrl: null,
        });
      }
      const userId = req.user.claims.sub;
      const user = await authStorage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}
