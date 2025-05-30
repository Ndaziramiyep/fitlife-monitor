"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Search, MoreHorizontal, Filter } from "lucide-react"
import api from "@/src/services/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const PERMISSIONS = [
  { key: "read", label: "Read" },
  { key: "write", label: "Write" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  permissions?: { [key: string]: boolean } | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState<number | null>(null)
  const [showPermEdit, setShowPermEdit] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", email: "", password: "", permissions: {} as Record<string, boolean> })
  const [permEditForm, setPermEditForm] = useState<Record<string, boolean>>({})
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      // Fetch all users (admin only endpoint)
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users.');
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search query
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchQuery, users])

  const handleCheckbox = (perm: string) => {
    setForm(f => ({ ...f, permissions: { ...f.permissions, [perm]: !f.permissions[perm] } }))
  }

  const handleAdd = async (e: any) => {
    e.preventDefault();
    setActionLoading(-1);
    setActionError(null);
    try {
      await api.post("/users", { ...form, permissions: form.permissions });
      setShowAdd(false);
      setForm({ name: "", email: "", password: "", permissions: {} });
      fetchUsers();
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to add user.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    setActionLoading(showEdit!);
    setActionError(null);
    try {
      const updateData: any = { ...form, permissions: form.permissions };
      // Only include password if it's not empty
      if (updateData.password === '') {
        delete updateData.password;
      }
      await api.patch(`/users/${showEdit}`, updateData);
      setShowEdit(null);
      setForm({ name: "", email: "", password: "", permissions: {} });
      fetchUsers();
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to update user.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setActionLoading(id);
    setActionError(null);
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to delete user.");
    } finally {
      setActionLoading(null);
    }
  };

  const openEdit = (user: User) => {
    setShowEdit(user.id)
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      permissions: PERMISSIONS.reduce((acc: { [key: string]: boolean }, p) => {
        acc[p.key] = (user.permissions && user.permissions[p.key]) ?? false;
        return acc;
      }, {} as { [key: string]: boolean }),
    })
  }

  const openPermEdit = (user: User) => {
    setShowPermEdit(user.id)
    setPermEditForm(PERMISSIONS.reduce((acc: { [key: string]: boolean }, p) => {
      acc[p.key] = (user.permissions && user.permissions[p.key]) ?? false;
      return acc;
    }, {} as { [key: string]: boolean }))
  }

  const handlePermCheckbox = (perm: string) => {
    setPermEditForm(f => ({ ...f, [perm]: !f[perm] }))
  }

  const savePermEdit = async (userId: number) => {
    try {
      await api.patch(`/users/${userId}`, { permissions: permEditForm })
      setShowPermEdit(null)
      fetchUsers()
    } catch {
      alert("Failed to update permissions.")
    }
  }

  const handleAdminToggle = async (user: User) => {
    setActionLoading(user.id);
    setActionError(null);
    try {
      const newIsAdmin = !user.is_admin;
      await api.patch(`/users/${user.id}`, { is_admin: newIsAdmin });
      // Refresh the users list to ensure the database state is reflected
      fetchUsers();
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to update admin status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownloadReport = async (userId: number) => {
    try {
      // Call the backend endpoint to generate the report
      const response = await api.get(`/admin/users/${userId}/report`, {
        responseType: 'blob' // Important for downloading files
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element and trigger a download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Extract filename from headers if available, otherwise use a default name
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'report.json'; // Default filename
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err: any) {
      alert('Failed to download report: ' + (err.response?.data?.message || err.message));
      console.error("Error downloading report:", err);
    }
  };

  if (loading) return <div className="container mx-auto py-10">Loading users...</div>
  if (error) return <div className="container mx-auto py-10 text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Button onClick={() => setShowAdd(true)} className="mb-4">Add User</Button>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage user accounts, permissions, and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="border px-4 py-2">Admin</TableHead>
                  <TableHead className="border px-4 py-2">Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="border px-4 py-2">
                      <Button 
                        size="sm" 
                        variant={user.is_admin ? "default" : "outline"} 
                        disabled
                      >
                        {user.is_admin ? "Yes" : "No"}
                      </Button>
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      <Button 
                        size="sm" 
                        variant={user.is_admin ? "destructive" : "default"} 
                        onClick={() => handleAdminToggle(user)} 
                        disabled={actionLoading === user.id}
                      >
                        {actionLoading === user.id ? "..." : user.is_admin ? "Revoke" : "Grant"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleDownloadReport(user.id)} disabled={actionLoading === user.id}>Download Report</Button>
                        <Button size="sm" onClick={() => openEdit(user)} className="mr-2" disabled={actionLoading === user.id}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)} disabled={actionLoading === user.id}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 p-4 border rounded bg-white">
          <h2 className="font-bold mb-2">Add User</h2>
          <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="mb-2" />
          <Input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="mb-2" />
          <Input placeholder="Password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required className="mb-2" />
          <div className="mb-2">
            <span className="font-semibold">Permissions:</span>
            <div className="flex flex-wrap gap-4 mt-2">
              {PERMISSIONS.map(p => (
                <label key={p.key} className="flex items-center gap-1">
                  <input type="checkbox" checked={!!form.permissions[p.key]} onChange={() => handleCheckbox(p.key)} /> {p.label}
                </label>
              ))}
            </div>
          </div>
          <Button type="submit">Add</Button>
          <Button type="button" variant="outline" onClick={() => setShowAdd(false)} className="ml-2">Cancel</Button>
        </form>
      )}

      {/* Edit User Modal */}
      {showEdit && (
        <Dialog open={!!showEdit} onOpenChange={() => setShowEdit(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to user details and permissions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEdit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Name</label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    placeholder="Password (leave blank to keep)"
                    type="password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <span className="font-semibold">Permissions:</span>
                  <div className="flex flex-wrap gap-4">
                    {PERMISSIONS.map(p => (
                      <label key={p.key} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={!!form.permissions[p.key]}
                          onChange={() => handleCheckbox(p.key)}
                        />
                        {p.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={actionLoading === showEdit}>
                  {actionLoading === showEdit ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEdit(null)}
                  disabled={actionLoading === showEdit}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Show error feedback */}
      {actionError && <div className="text-red-600 mt-2">{actionError}</div>}
    </div>
  )
}

