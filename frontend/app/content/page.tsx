"use client";

import { useEffect, useState } from "react";
import api from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit } from "lucide-react";

interface Content {
  id: number;
  user_id: number;
  title: string;
  body: string;
  status: string;
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
  };
}

export default function ContentManagementPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<Content | null>(null); // For editing
  const [form, setForm] = useState({
    title: '',
    body: '',
    status: 'draft', // Default status
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const response = await api.get<Content[]>('/contents');
      setContents(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, status: e.target.value });
  };

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/contents', form);
      setIsModalOpen(false);
      setForm({ title: '', body: '', status: 'draft' });
      fetchContents(); // Refresh the list
    } catch (err: any) {
      alert('Failed to create content: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEditContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentContent) return;
    try {
      await api.put(`/contents/${currentContent.id}`, form);
      setIsModalOpen(false);
      setForm({ title: '', body: '', status: 'draft' });
      setCurrentContent(null);
      fetchContents(); // Refresh the list
    } catch (err: any) {
      alert('Failed to update content: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteContent = async (contentId: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        await api.delete(`/contents/${contentId}`);
        fetchContents(); // Refresh the list
      } catch (err: any) {
        alert('Failed to delete content: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const openCreateModal = () => {
    setCurrentContent(null); // Ensure no content is selected for editing
    setForm({ title: '', body: '', status: 'draft' }); // Reset form
    setIsModalOpen(true);
  };

  const openEditModal = (content: Content) => {
    setCurrentContent(content);
    setForm({ title: content.title, body: content.body, status: content.status });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContent(null);
    setForm({ title: '', body: '', status: 'draft' });
  };

  if (loading) return <div className="container mx-auto py-10">Loading content...</div>;
  if (error) return <div className="container mx-auto py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Content</h1>
        <Button onClick={openCreateModal}>Add New Content</Button>
      </div>

      <div className="grid gap-6">
        {contents.length > 0 ? (
          contents.map((content) => (
            <Card key={content.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{content.title}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(content)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" color="destructive" onClick={() => handleDeleteContent(content.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="whitespace-pre-wrap">{content.body}</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">Status: {content.status}</p>
                 <p className="text-sm text-muted-foreground">Created: {new Date(content.created_at).toLocaleString()}</p>
                {content.user && (
                  <p className="text-sm text-muted-foreground">Author: {content.user.name}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No content created yet.</p>
        )}
      </div>

      {/* Add/Edit Content Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentContent ? 'Edit Content' : 'Create New Content'}</DialogTitle>
            <DialogDescription>
              {currentContent ? 'Edit the details of your content.' : 'Fill in the details to create new content.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={currentContent ? handleEditContent : handleCreateContent}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="body">Body</Label>
                <Textarea
                  id="body"
                  value={form.body}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={handleStatusChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{currentContent ? 'Save Changes' : 'Create Content'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 