import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("auth_token"));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(!!localStorage.getItem("admin_token"));
  const [userName, setUserName] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
    const adminToken = localStorage.getItem("admin_token");
    setIsAdminLoggedIn(!!adminToken);
    try {
      const userRaw = localStorage.getItem("user");
      const user = userRaw ? JSON.parse(userRaw) : null;
      setUserName(user?.name || "");
    } catch {
      setUserName("");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    toast({ title: "Logged out", description: "You have been signed out." });
    navigate("/signin");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsAdminLoggedIn(false);
    toast({ title: "Admin logged out", description: "Admin session ended." });
    navigate("/admin/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold text-foreground">NewsHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/news">News</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/blogs">Blogs</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/about">About</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
            {isLoggedIn && (
              <Button variant="secondary" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/bookmarks">Bookmarks</Link>
            </Button>
            {isAdminLoggedIn ? (
              <>
                <Button variant="secondary" size="sm" asChild className="hidden sm:flex">
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </Button>
                <Button variant="secondary" size="sm" asChild className="hidden sm:flex">
                  <Link to="/admin/post-news">Post News</Link>
                </Button>
                <Button variant="secondary" size="sm" asChild className="hidden sm:flex">
                  <Link to="/admin/post-blog">Post Blog</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleAdminLogout} className="hidden sm:flex">
                  <LogOut className="h-4 w-4 mr-2" /> Admin Logout
                </Button>
              </>
            ) : (
              <Button variant="secondary" size="sm" asChild className="hidden sm:flex">
                <Link to="/admin/login">Admin</Link>
              </Button>
            )}
            {isLoggedIn ? (
              <>
                <span className="hidden sm:flex text-sm text-muted-foreground">{userName}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" asChild className="hidden sm:flex">
                <Link to="/signin">
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/news">News</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/blogs">Blogs</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/about">About</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/contact">Contact</Link>
              </Button>
              {isLoggedIn && (
                <Button variant="secondary" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              )}
              <div className="mt-4 px-4">
                {isAdminLoggedIn ? (
                  <>
                    <Button variant="secondary" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </Button>
                    <Button variant="secondary" className="w-full mt-2" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/admin/post-news">Post News</Link>
                    </Button>
                    <Button variant="secondary" className="w-full mt-2" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/admin/post-blog">Post Blog</Link>
                    </Button>
                    <Button variant="outline" className="w-full mt-2" onClick={() => { setMobileMenuOpen(false); handleAdminLogout(); }}>
                      Admin Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/admin/login">Admin</Link>
                  </Button>
                )}
                {isLoggedIn ? (
                  <Button variant="outline" className="w-full" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="default" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/signin">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {isLoggedIn && location.pathname === "/dashboard" && (
          <div className="py-2 text-center text-sm text-muted-foreground">
            Welcome back — NewsHub: Your Trusted Source for Latest News & Updates
          </div>
        )}
      </div>
    </nav>
  );
};
