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

const PERMISSIONS = [
  { key: "read", label: "Read" },
  { key: "write", label: "Write" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState<number | null>(null)
  const [showPermEdit, setShowPermEdit] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", email: "", password: "", permissions: {} as Record<string, boolean> })
  const [permEditForm, setPermEditForm] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    setLoading(true)
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false))
  }

  const handleCheckbox = (perm: string) => {
    setForm(f => ({ ...f, permissions: { ...f.permissions, [perm]: !f.permissions[perm] } }))
  }

  const handleAdd = async (e: any) => {
    e.preventDefault()
    try {
      await api.post("/users", { ...form, permissions: form.permissions })
      setShowAdd(false)
      setForm({ name: "", email: "", password: "", permissions: {} })
      fetchUsers()
    } catch {
      alert("Failed to add user.")
    }
  }

  const handleEdit = async (e: any) => {
    e.preventDefault()
    try {
      await api.patch(`/users/${showEdit}`, { ...form, permissions: form.permissions })
      setShowEdit(null)
      setForm({ name: "", email: "", password: "", permissions: {} })
      fetchUsers()
    } catch {
      alert("Failed to update user.")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await api.delete(`/users/${id}`)
      fetchUsers()
    } catch {
      alert("Failed to delete user.")
    }
  }

  const openEdit = (user: any) => {
    setShowEdit(user.id)
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      permissions: PERMISSIONS.reduce((acc, p) => ({ ...acc, [p.key]: user.permissions ? !!user.permissions[p.key] : false }), {}),
    })
  }

  const openPermEdit = (user: any) => {
    setShowPermEdit(user.id)
    setPermEditForm(PERMISSIONS.reduce((acc, p) => ({ ...acc, [p.key]: user.permissions ? !!user.permissions[p.key] : false }), {}))
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

  const handleAdminToggle = async (user: any) => {
    try {
      await api.patch(`/users/${user.id}`, { is_admin: !user.is_admin });
      fetchUsers();
    } catch {
      alert("Failed to update admin status.");
    }
  };

  if (loading) return <div>Loading users...</div>
  if (error) return <div>{error}</div>

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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="border px-4 py-2">
                      <Button size="sm" variant={user.is_admin ? "default" : "outline"} disabled>
                        {user.is_admin ? "Yes" : "No"}
                      </Button>
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      <Button size="sm" variant={user.is_admin ? "destructive" : "default"} onClick={() => handleAdminToggle(user)}>
                        {user.is_admin ? "Revoke" : "Grant"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => openEdit(user)} className="mr-2">Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>Delete</Button>
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
        <form onSubmit={handleEdit} className="mb-4 p-4 border rounded bg-white">
          <h2 className="font-bold mb-2">Edit User</h2>
          <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="mb-2" />
          <Input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="mb-2" />
          <Input placeholder="Password (leave blank to keep)" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="mb-2" />
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
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={() => setShowEdit(null)} className="ml-2">Cancel</Button>
        </form>
      )}
    </div>
  )
}

