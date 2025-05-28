"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/services/api";
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, MessageSquare, ArrowUpRight, UserPlus, FileText, AlertCircle, UserCheck, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    new_users: 0,
    admin_users: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    is_admin: false,
  });

  useEffect(() => {
    api.get("/user")
      .then(res => {
        if (res.data && res.data.is_admin) {
          setIsAdmin(true);
        } else {
          router.replace("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          router.replace("/login");
        } else {
          router.replace("/");
        }
      })
      .finally(() => setLoading(false));

    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      const activitiesResponse = await api.get('/activities');
      setStats(response.data.stats);
      setRecentUsers(response.data.recent_users);
      setRecentActivities(activitiesResponse.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', newUserForm);
      setIsSignupModalOpen(false);
      setNewUserForm({ name: '', email: '', password: '', is_admin: false });
      fetchDashboardData();
    } catch (error: any) {
      alert('Failed to create user: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (!isAdmin) return null;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_users}</div>
            <p className="text-xs text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active_users}</div>
            <p className="text-xs text-muted-foreground">Currently logged in users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new_users}</div>
            <p className="text-xs text-muted-foreground">Joined in last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admin_users}</div>
            <p className="text-xs text-muted-foreground">Users with admin privileges</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Add New User</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <CardDescription>Create a new user account.</CardDescription>
             <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
               <DialogTrigger asChild>
                 <ShadcnButton className="mt-4">Add User</ShadcnButton>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                 <DialogHeader>
                   <DialogTitle>Create New User</DialogTitle>
                   <DialogDescription>
                     Fill in the details to create a new user account.
                   </DialogDescription>
                 </DialogHeader>
                 <form onSubmit={handleCreateUser}>
                   <div className="grid gap-4 py-4">
                     <div className="grid gap-2">
                       <Label htmlFor="name">Name</Label>
                       <Input
                         id="name"
                         value={newUserForm.name}
                         onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                         required
                       />
                     </div>
                     <div className="grid gap-2">
                       <Label htmlFor="email">Email</Label>
                       <Input
                         id="email"
                         type="email"
                         value={newUserForm.email}
                         onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                         required
                       />
                     </div>
                     <div className="grid gap-2">
                       <Label htmlFor="password">Password</Label>
                       <Input
                         id="password"
                         type="password"
                         value={newUserForm.password}
                         onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                         required
                       />
                     </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="is_admin"
                          checked={newUserForm.is_admin}
                          onCheckedChange={(checked) => setNewUserForm({ ...newUserForm, is_admin: !!checked })}
                        />
                        <Label htmlFor="is_admin">Grant Admin Privileges</Label>
                      </div>
                   </div>
                   <DialogFooter>
                     <ShadcnButton type="submit">Create User</ShadcnButton>
                   </DialogFooter>
                 </form>
               </DialogContent>
             </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest user logins and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {user.name}
                    {user.is_active && (
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500" title="Active"></span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last login: {new Date(user.last_login).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities Section */}
       <Card className="mt-8">
         <CardHeader>
           <CardTitle>All System Activity</CardTitle>
           <CardDescription>Recent actions performed by users and admins.</CardDescription>
         </CardHeader>
         <CardContent>
           <div className="space-y-4 text-sm text-muted-foreground">
             {recentActivities.length > 0 ? (
               recentActivities.map((activity: any) => (
                 <div key={activity.id} className="flex items-center justify-between">
                   <div>
                     <p className="font-medium text-foreground">{activity.description}</p>
                     <p className="text-xs">By {activity.user_name || 'System'}</p>
                   </div>
                   <div className="text-xs">
                     {new Date(activity.created_at).toLocaleString()}
                   </div>
                 </div>
               ))
             ) : (
               <p>No recent activity recorded.</p>
             )}
           </div>
         </CardContent>
       </Card>
    </div>
  )
}

