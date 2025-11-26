import { useParams } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import techImage from "@/assets/category-tech.jpg";
import sportsImage from "@/assets/category-sports.jpg";
import businessImage from "@/assets/category-business.jpg";
import healthImage from "@/assets/category-health.jpg";

const mockArticles = [
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
    title: "Quantum Computing Breakthrough Announced",
    description: "Scientists achieve major milestone in quantum computing development.",
    category: "Technology",
    image: techImage,
    source: "Science Today",
    date: "5 hours ago",
  },
  {
    id: "3",
    title: "Cybersecurity Threats in the Modern Digital Age",
    description: "Understanding the evolving landscape of digital security challenges.",
    category: "Technology",
    image: techImage,
    source: "Security Watch",
    date: "1 day ago",
  },
];

const Category = () => {
  const { category } = useParams();
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">Latest news and updates in {categoryName?.toLowerCase()}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select defaultValue="latest">
            <SelectTrigger className="w-full sm:w-[200px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="recommended">Recommended</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
          {mockArticles.map((article) => (
            <ArticleCard key={`${article.id}-dup`} {...article} id={`${article.id}-dup`} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button size="lg" variant="outline">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Category;
