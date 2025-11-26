import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

type UserSummary = {
  id: number;
  name: string;
  email: string;
  lastLoginAt?: string | null;
};

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

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const adminUser = localStorage.getItem("admin_user");
  const username = adminUser ? JSON.parse(adminUser).username : "Admin";

  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(true);
  const [errorNews, setErrorNews] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  const [errorBlogs, setErrorBlogs] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<UserSummary[]>("/admin/users");
        setUsers(data);
      } catch (e: any) {
        setError(e.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      setErrorNews(null);
      try {
        const data = await api.get<NewsItem[]>("/admin/news");
        setNews(data);
      } catch (e: any) {
        setErrorNews(e.message || "Failed to load news");
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      setErrorBlogs(null);
      try {
        const data = await api.get<BlogItem[]>("/admin/blogs");
        setBlogs(data);
      } catch (e: any) {
        setErrorBlogs(e.message || "Failed to load blogs");
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    try {
      await api.delete<void>(`/admin/news/${id}`);
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (e: any) {
      alert(e.message || "Failed to delete news item");
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete<void>(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (e: any) {
      alert(e.message || "Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </CardHeader>
          <CardContent>
            <p>Welcome, {username}. Here are the users who signed up and their last sign-in times.</p>
            <div className="mt-4">
              {loading && <p className="text-sm text-muted-foreground">Loading users...</p>}
              {error && <p className="text-sm text-destructive">{error}</p>}
              {!loading && !error && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Email</th>
                        <th className="py-2 pr-4">Last Login</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => {
                        const last = u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : "Never";
                        const status = u.lastLoginAt ? "Signed In" : "Signed Up";
                        return (
                          <tr key={u.id} className="border-b hover:bg-muted/40">
                            <td className="py-2 pr-4">{u.name}</td>
                            <td className="py-2 pr-4">{u.email}</td>
                            <td className="py-2 pr-4">{last}</td>
                            <td className="py-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs ${u.lastLoginAt ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {users.length === 0 && (
                        <tr>
                          <td className="py-4 text-center text-muted-foreground" colSpan={4}>No users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl">Manage Blogs</CardTitle>
            <Button variant="secondary" asChild>
              <Link to="/admin/post-blog">Add Blog</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              {loadingBlogs && <p className="text-sm text-muted-foreground">Loading blogs...</p>}
              {errorBlogs && <p className="text-sm text-destructive">{errorBlogs}</p>}
              {!loadingBlogs && !errorBlogs && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Category</th>
                        <th className="py-2 pr-4">Created</th>
                        <th className="py-2 pr-4">Important</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.id} className="border-b hover:bg-muted/40">
                          <td className="py-2 pr-4">{b.title}</td>
                          <td className="py-2 pr-4">{b.category}</td>
                          <td className="py-2 pr-4">{new Date(b.createdAt).toLocaleString()}</td>
                          <td className="py-2 pr-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${b.important ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{b.important ? "Yes" : "No"}</span>
                          </td>
                          <td className="py-2">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(b.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                      {blogs.length === 0 && (
                        <tr>
                          <td className="py-4 text-center text-muted-foreground" colSpan={5}>No blogs found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl">Manage News</CardTitle>
            <Button variant="secondary" asChild>
              <Link to="/admin/post-news">Add News</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              {loadingNews && <p className="text-sm text-muted-foreground">Loading news...</p>}
              {errorNews && <p className="text-sm text-destructive">{errorNews}</p>}
              {!loadingNews && !errorNews && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Category</th>
                        <th className="py-2 pr-4">Created</th>
                        <th className="py-2 pr-4">Important</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.map((n) => (
                        <tr key={n.id} className="border-b hover:bg-muted/40">
                          <td className="py-2 pr-4">{n.title}</td>
                          <td className="py-2 pr-4">{n.category}</td>
                          <td className="py-2 pr-4">{new Date(n.createdAt).toLocaleString()}</td>
                          <td className="py-2 pr-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${n.important ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{n.important ? "Yes" : "No"}</span>
                          </td>
                          <td className="py-2">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteNews(n.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                      {news.length === 0 && (
                        <tr>
                          <td className="py-4 text-center text-muted-foreground" colSpan={5}>No news found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;