import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-news.jpg";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="NewsHub" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold text-primary-foreground mb-4">NewsHub</h1>
            <p className="text-xl text-primary-foreground/90 mb-6">Your Trusted Source for Latest News & Updates</p>
            <div className="flex gap-3 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search news or blogs..." className="pl-10 h-12 bg-card/90 backdrop-blur-sm border-border" />
              </div>
              <Button size="lg" className="h-12" asChild>
                <Link to="/search">Search</Link>
              </Button>
            </div>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link to="/news">Browse News</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/blogs">Read Blogs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/bookmarks">Bookmarks</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="text-xl font-semibold mb-2">Reliable Coverage</h3>
            <p className="text-sm text-muted-foreground">Stay updated with curated stories from trusted sources.</p>
          </div>
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="text-xl font-semibold mb-2">In-Depth Blogs</h3>
            <p className="text-sm text-muted-foreground">Explore thoughtful articles and opinions from our authors.</p>
          </div>
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="text-xl font-semibold mb-2">Save For Later</h3>
            <p className="text-sm text-muted-foreground">Bookmark items to read anytime from your devices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
