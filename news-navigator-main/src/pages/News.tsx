import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import heroImg from "@/assets/hero-news.jpg";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  imageBase64?: string | null;
  important: boolean;
  createdAt: string;
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<NewsItem[]>("/admin/news");
        setNews(data);
      } catch (e: any) {
        setError(e.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const saveItem = (item: NewsItem) => {
    const raw = localStorage.getItem("bookmarks");
    const list: any[] = raw ? JSON.parse(raw) : [];
    const exists = list.find((x) => x.type === "news" && x.id === item.id);
    const image = item.imageBase64 ? `data:image/*;base64,${item.imageBase64}` : heroImg;
    if (exists) return;
    list.push({ type: "news", id: item.id, title: item.title, description: item.description, category: item.category, image });
    localStorage.setItem("bookmarks", JSON.stringify(list));
    alert("Saved to bookmarks");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>News</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-sm text-muted-foreground">Loading news...</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.map((n) => (
                  <div key={n.id} className="border rounded-lg overflow-hidden">
                    <img src={n.imageBase64 ? `data:image/*;base64,${n.imageBase64}` : heroImg} alt={n.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{n.title}</h3>
                      <p className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()} • {n.category}</p>
                      <p className="text-sm mt-2 line-clamp-3">{n.description}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => saveItem(n)}>Save</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {news.length === 0 && <p className="text-muted-foreground">No news found.</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default News;