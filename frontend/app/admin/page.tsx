import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, MessageSquare, ArrowUpRight, UserPlus, FileText, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total Users",
      value: "4,328",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Today",
      value: "587",
      change: "+8%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Support Tickets",
      value: "18",
      change: "+3",
      trend: "up",
      icon: MessageSquare,
    },
    {
      title: "New Signups",
      value: "86",
      change: "+24%",
      trend: "up",
      icon: UserPlus,
    },
  ]

  // Mock recent activities
  const recentActivities = [
    {
      type: "user_signup",
      user: "Alex Johnson",
      timestamp: "10 minutes ago",
      icon: UserPlus,
    },
    {
      type: "support_ticket",
      user: "Emma Garcia",
      timestamp: "1 hour ago",
      description: "Issue with BMI calculation",
      icon: AlertCircle,
    },
    {
      type: "content_update",
      user: "Admin",
      timestamp: "3 hours ago",
      description: "Updated nutrition guidelines",
      icon: FileText,
    },
    {
      type: "user_signup",
      user: "Michael Chen",
      timestamp: "5 hours ago",
      icon: UserPlus,
    },
    {
      type: "support_ticket",
      user: "Sarah Williams",
      timestamp: "8 hours ago",
      description: "Password reset request",
      icon: AlertCircle,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Administrator</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Recent Activity */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and events across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                      <span className="text-muted-foreground font-normal"> - {activity.timestamp}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === "user_signup" && "New user signed up"}
                      {activity.type === "support_ticket" && `Created support ticket: ${activity.description}`}
                      {activity.type === "content_update" && `${activity.description}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/admin/users/create"
                className="flex items-center justify-between p-3 text-sm rounded-lg border hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Create New User</span>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admin/content/create"
                className="flex items-center justify-between p-3 text-sm rounded-lg border hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Add Health Content</span>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admin/support"
                className="flex items-center justify-between p-3 text-sm rounded-lg border hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>View Support Tickets</span>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center justify-between p-3 text-sm rounded-lg border hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>View Analytics</span>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Current status of the FitLife Monitor platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Server Status</span>
                  <span className="flex items-center text-sm text-green-500">
                    <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                    Operational
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "98%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">98% uptime</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <span className="flex items-center text-sm text-green-500">
                    <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                    Healthy
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "94%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">6% resources used</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Services</span>
                  <span className="flex items-center text-sm text-green-500">
                    <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                    Normal
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "96%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">246ms average response</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

