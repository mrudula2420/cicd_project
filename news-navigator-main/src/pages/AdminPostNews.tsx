import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";

type NewsResponse = {
  id: number;
  title: string;
  category: string;
  description?: string;
  content?: string;
  imageBase64?: string;
  important: boolean;
  createdAt: string;
};

const categories = [
  "Technology",
  "Sports",
  "Politics",
  "Entertainment",
  "Health",
  "Business",
  "Science",
];

const AdminPostNews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const toPureBase64 = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.*);base64,(.*)$/);
    return match ? match[2] : dataUrl; // strip prefix if present
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageBase64(toPureBase64(result));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      toast({ title: "Missing fields", description: "Title and category are required." });
      return;
    }
    setSubmitting(true);
    try {
      const payload = { title, category, description, content, imageBase64, important };
      const res = await api.post<NewsResponse>("/admin/news", payload);
      toast({ title: "News posted", description: `Created: ${res.title}` });
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({ title: "Post failed", description: err.message || "Unable to post news" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Post News</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short summary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content" rows={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                {imageBase64 && <p className="text-xs text-muted-foreground">Image ready (base64)</p>}
              </div>
              <div className="flex items-center gap-2">
                <input id="important" type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} />
                <Label htmlFor="important">Mark as important</Label>
              </div>
              <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Posting..." : "Post News"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPostNews;