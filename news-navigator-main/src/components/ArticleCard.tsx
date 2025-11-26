import { Link } from "react-router-dom";
import { Clock, TrendingUp, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  source: string;
  date: string;
  trending?: boolean;
  size?: "default" | "large";
}

export const ArticleCard = ({
  id,
  title,
  description,
  category,
  image,
  source,
  date,
  trending = false,
  size = "default",
}: ArticleCardProps) => {
  const cardClass = size === "large" 
    ? "md:col-span-2 md:flex" 
    : "";
  
  const imageClass = size === "large" 
    ? "md:w-1/2" 
    : "aspect-[16/9]";

  return (
    <Link
      to={`/article/${id}`}
      className={`group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 ${cardClass}`}
    >
      <div className={`relative overflow-hidden ${imageClass}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">{category}</Badge>
          {trending && (
            <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Trending
            </Badge>
          )}
        </div>
      </div>

      <div className={`p-4 flex flex-col ${size === "large" ? "md:w-1/2 md:p-6" : ""}`}>
        <h3 className={`font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors ${size === "large" ? "text-2xl" : "text-lg"}`}>
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{source}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {date}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.preventDefault()}>
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
