import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  path: string;
  image: string;
  articleCount: number;
}

export const CategoryCard = ({ name, path, image, articleCount }: CategoryCardProps) => {
  return (
    <Link
      to={path}
      className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 aspect-[16/9]"
    >
      <div className="absolute inset-0">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-primary-foreground mb-1">{name}</h3>
        <p className="text-sm opacity-80 mb-3">{articleCount} articles</p>
        <div className="flex items-center text-primary group-hover:gap-2 transition-all">
          <span className="text-sm font-semibold">Explore</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
