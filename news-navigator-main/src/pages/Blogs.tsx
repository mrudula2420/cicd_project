import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import heroImg from "@/assets/hero-news.jpg";

type BlogItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  imageBase64?: string | null;
  important: boolean;
  createdAt: string;
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<BlogItem[]>("/admin/blogs");
        setBlogs(data);
      } catch (e: any) {
        setError(e.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const saveItem = (item: BlogItem) => {
    const raw = localStorage.getItem("bookmarks");
    const list: any[] = raw ? JSON.parse(raw) : [];
    const exists = list.find((x) => x.type === "blog" && x.id === item.id);
    const image = item.imageBase64 ? `data:image/*;base64,${item.imageBase64}` : heroImg;
    if (exists) return;
    list.push({ type: "blog", id: item.id, title: item.title, description: item.description, category: item.category, image });
    localStorage.setItem("bookmarks", JSON.stringify(list));
    alert("Saved to bookmarks");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-sm text-muted-foreground">Loading blogs...</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogs.map((b) => (
                  <div key={b.id} className="border rounded-lg overflow-hidden">
                    <img src={b.imageBase64 ? `data:image/*;base64,${b.imageBase64}` : heroImg} alt={b.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{b.title}</h3>
                      <p className="text-xs text-muted-foreground">{new Date(b.createdAt).toLocaleString()} • {b.category}</p>
                      <p className="text-sm mt-2 line-clamp-3">{b.description}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => saveItem(b)}>Save</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && <p className="text-muted-foreground">No blogs found.</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;