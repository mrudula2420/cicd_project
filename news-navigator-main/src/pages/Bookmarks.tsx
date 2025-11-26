import { Button } from "@/components/ui/button";

type SavedItem = {
  type: "blog" | "news";
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
};

const Bookmarks = () => {
  const raw = localStorage.getItem("bookmarks");
  const saved: SavedItem[] = raw ? JSON.parse(raw) : [];

  const clearAll = () => {
    localStorage.removeItem("bookmarks");
    location.reload();
  };

  const removeOne = (type: string, id: number) => {
    const next = saved.filter((x) => !(x.type === type && x.id === id));
    localStorage.setItem("bookmarks", JSON.stringify(next));
    location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Bookmarks</h1>
          <p className="text-muted-foreground">Your saved blogs and news</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">{saved.length} saved items</p>
          <Button variant="outline" size="sm" onClick={clearAll}>Clear All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((item) => (
            <div key={`${item.type}-${item.id}`} className="bg-card rounded-lg shadow-card overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{item.type.toUpperCase()} • {item.category}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{item.description}</p>
                <div className="mt-3">
                  <Button variant="destructive" size="sm" onClick={() => removeOne(item.type, item.id)}>Remove</Button>
                </div>
              </div>
            </div>
          ))}
          {saved.length === 0 && <p className="text-muted-foreground">No bookmarks yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
