import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bookmark } from "lucide-react";
import techImage from "@/assets/category-tech.jpg";
import sportsImage from "@/assets/category-sports.jpg";

const savedArticles = [
  {
    id: "1",
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    description: "Explore the latest advancements in artificial intelligence and their impact on various sectors.",
    category: "Technology",
    image: techImage,
    source: "Tech Daily",
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "Championship Finals: Dramatic Last-Minute Victory",
    description: "An incredible comeback in the final seconds secures the championship title.",
    category: "Sports",
    image: sportsImage,
    source: "Sports Network",
    date: "4 hours ago",
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">John Smith</h1>
                <p className="text-muted-foreground mb-4">john.smith@example.com</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Technology</Badge>
                  <Badge variant="secondary">Sports</Badge>
                  <Badge variant="secondary">Business</Badge>
                </div>
              </div>
              <Button variant="outline" size="lg">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved Articles
            </TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Saved Articles</h2>
              <p className="text-muted-foreground">{savedArticles.length} articles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>News Preferences</CardTitle>
                <CardDescription>Customize your news feed and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Favorite Categories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Technology", "Sports", "Politics", "Entertainment", "Health", "Business", "Science"].map(
                      (category) => (
                        <Button key={category} variant="outline" className="justify-start">
                          {category}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Button size="lg">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
