import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Loader2, Lock, Wrench } from "lucide-react";
import { useState, useEffect } from "react";

export default function Login() {
  const { user, isLoading } = useAuth();
  const [mode, setMode] = useState<"replit" | "password" | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/auth/mode", { credentials: "include" })
      .then(r => r.json())
      .then(data => setMode(data.mode))
      .catch(() => setMode("replit"));
  }, []);

  if (isLoading || mode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Redirect to="/admin" />;

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        const data = await res.json();
        setError(data.message || "Incorrect password");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary p-2 rounded-lg">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">Urban City Mechanical</span>
        </div>

        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Staff Login</h1>
        <p className="text-gray-500 mb-8">Access the admin dashboard</p>

        {mode === "password" ? (
          <form onSubmit={handlePasswordLogin} className="text-left space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-gray-400" />
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                data-testid="input-admin-password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              data-testid="button-login-submit"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <a
            href="/api/login"
            className="block w-full btn-primary py-3 rounded-xl font-bold text-center"
            data-testid="link-replit-login"
          >
            Login with Replit
          </a>
        )}

        <p className="mt-6 text-xs text-gray-400">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
