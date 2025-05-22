"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, FileText, BarChart3, Settings, LifeBuoy, Home, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Content Management",
      href: "/admin/content",
      icon: FileText,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "System Settings",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Support Center",
      href: "/admin/support",
      icon: LifeBuoy,
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow border-r bg-background pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center px-4 mb-6">
            <Link href="/admin" className="flex items-center">
              <span className="font-bold text-lg">FitLife Admin</span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className={cn("mr-3 h-4 w-4")} />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
            <div className="px-2 mt-6 mb-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/">
                  <Home className="mr-3 h-4 w-4" />
                  Back to Site
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start mt-2" asChild>
                <Link href="/logout">
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background">
        <Link href="/admin" className="flex items-center">
          <span className="font-bold">FitLife Admin</span>
        </Link>
        <div className="flex space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md p-2",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6 px-4 md:px-6 pt-16 md:pt-6">{children}</main>
      </div>
    </div>
  )
}

