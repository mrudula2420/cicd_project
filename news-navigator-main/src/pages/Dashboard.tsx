import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const name = user?.name || "User";

  const token = localStorage.getItem("auth_token");
  if (!token) {
    navigate("/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Welcome back, {name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">NewsHub — Your Trusted Source for Latest News & Updates</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/news">Browse News</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/blogs">Read Blogs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/bookmarks">View Bookmarks</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
