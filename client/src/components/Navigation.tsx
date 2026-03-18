import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Wrench, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900 tracking-tight">
              Urban City <span className="text-primary">Mechanical</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Click-to-Call CTA */}
            <a
              href="tel:5106196586"
              data-testid="link-call-now"
              className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors"
            >
              📞 (510) 619-6586
            </a>

            {user ? (
              <>
                <Link href="/admin">
                  <Button 
                    variant={location === "/admin" ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    {user.firstName || user.username}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => logout()}>
                    <LogOut className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="gap-2">
                  <UserIcon className="w-4 h-4" />
                  Staff Login
                </Button>
              </Link>
            )}
            
            {/* Mobile CTA */}
            <div className="md:hidden">
               <a href="#quote" className="btn-accent px-4 py-2 rounded-lg text-sm font-bold">
                 Get Quote
               </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
