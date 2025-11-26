import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/ArticleCard";
import { Clock, Bookmark, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import techImage from "@/assets/category-tech.jpg";
import sportsImage from "@/assets/category-sports.jpg";

const relatedArticles = [
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
    title: "Championship Finals: Dramatic Last-Minute Victory",
    description: "An incredible comeback in the final seconds secures the championship title.",
    category: "Sports",
    image: sportsImage,
    source: "Sports Network",
    date: "1 day ago",
  },
];

const ArticleDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Category Badge */}
        <Badge className="mb-4 bg-primary text-primary-foreground">Technology</Badge>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          AI Revolution: How Machine Learning is Transforming Industries
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          <span className="font-medium text-foreground">Tech Daily</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            2 hours ago
          </span>
          <span>By John Smith</span>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
          <img src={techImage} alt="Article" className="w-full h-full object-cover" />
        </div>

        {/* Sharing & Bookmark */}
        <div className="sticky top-20 float-right ml-6 mb-6 flex flex-col gap-2 bg-card p-3 rounded-lg shadow-card">
          <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Facebook className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-xl text-muted-foreground mb-6">
            Artificial Intelligence is reshaping the way we work, live, and interact with technology. From
            healthcare to finance, machine learning algorithms are driving unprecedented innovation.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Rise of AI Technology</h2>
          <p className="mb-4">
            Over the past decade, artificial intelligence has evolved from a theoretical concept to a practical
            tool that powers everything from smartphone assistants to autonomous vehicles. Machine learning
            algorithms can now process vast amounts of data, identify patterns, and make decisions with minimal
            human intervention.
          </p>

          <p className="mb-4">
            Companies across industries are investing heavily in AI research and development. Tech giants like
            Google, Microsoft, and Amazon are at the forefront, but startups and traditional enterprises are
            also embracing this transformative technology.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Impact Across Industries</h2>
          <p className="mb-4">
            In healthcare, AI is being used to diagnose diseases earlier and more accurately than ever before. In
            finance, algorithms detect fraudulent transactions in real-time. Manufacturing benefits from
            predictive maintenance, while retail uses AI for personalized customer experiences.
          </p>

          <p className="mb-4">
            The automotive industry is perhaps seeing the most visible impact, with self-driving cars becoming
            increasingly sophisticated. These vehicles use complex neural networks to navigate roads, recognize
            obstacles, and make split-second decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Challenges and Considerations</h2>
          <p className="mb-4">
            Despite the promise, AI adoption comes with challenges. Concerns about job displacement, data
            privacy, and algorithmic bias need to be addressed. Experts emphasize the importance of responsible
            AI development that prioritizes ethical considerations alongside technological advancement.
          </p>

          <div className="bg-muted p-6 rounded-lg my-8">
            <p className="text-lg font-semibold mb-2">Key Takeaway</p>
            <p className="text-muted-foreground">
              AI is not just a technological trend but a fundamental shift in how we approach problem-solving and
              innovation across all sectors of society.
            </p>
          </div>

          <p className="mb-4">
            As we look to the future, the integration of AI into our daily lives will only deepen. The question
            is no longer whether AI will transform industries, but how quickly and effectively organizations can
            adapt to leverage its potential while mitigating its risks.
          </p>
        </div>

        {/* Source Link */}
        <div className="mt-8 pt-8 border-t border-border">
          <a
            href="#"
            className="text-primary hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read original article →
          </a>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-muted py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
