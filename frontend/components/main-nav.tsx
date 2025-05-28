"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Activity, BarChart2, MessageSquare, Award, Users } from "lucide-react"

export function MainNav() {
  const pathname = usePathname() || ""

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              asChild 
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === "/" && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              pathname.startsWith("/features") && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className={cn(
                        "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md",
                        pathname === "/dashboard" && "bg-primary/20"
                      )}
                      href="/dashboard"
                    >
                      <Activity className="h-6 w-6 text-primary" />
                      <div className="mb-2 mt-4 text-lg font-medium">Dashboard</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Your personalized health overview with BMI status and daily tips
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/bmi-calculator"
                  title="BMI Calculator"
                  icon={<Activity className="h-4 w-4 text-primary" />}
                  className={pathname === "/bmi-calculator" ? "bg-primary/10" : ""}
                >
                  Calculate and understand your Body Mass Index
                </ListItem>
                <ListItem
                  href="/progress"
                  title="Progress Tracking"
                  icon={<BarChart2 className="h-4 w-4 text-primary" />}
                  className={pathname === "/progress" ? "bg-primary/10" : ""}
                >
                  Monitor your health metrics over time
                </ListItem>
                <ListItem
                  href="/chatbot"
                  title="AI Health Assistant"
                  icon={<MessageSquare className="h-4 w-4 text-primary" />}
                  className={pathname === "/chatbot" ? "bg-primary/10" : ""}
                >
                  Get personalized health advice
                </ListItem>
                <ListItem 
                  href="/achievements" 
                  title="Achievements" 
                  icon={<Award className="h-4 w-4 text-primary" />}
                  className={pathname === "/achievements" ? "bg-primary/10" : ""}
                >
                  Track your health milestones
                </ListItem>
                <ListItem 
                  href="/community" 
                  title="Community" 
                  icon={<Users className="h-4 w-4 text-primary" />}
                  className={pathname === "/community" ? "bg-primary/10" : ""}
                >
                  Connect with other health enthusiasts
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              pathname.startsWith("/resources") && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem 
                  href="/how-it-works" 
                  title="How It Works"
                  className={pathname === "/how-it-works" ? "bg-primary/10" : ""}
                >
                  Learn about our methodology and technology
                </ListItem>
                <ListItem 
                  href="/research" 
                  title="Research & Science"
                  className={pathname === "/research" ? "bg-primary/10" : ""}
                >
                  The scientific basis of our recommendations
                </ListItem>
                <ListItem 
                  href="/blog" 
                  title="Health Articles"
                  className={pathname === "/blog" ? "bg-primary/10" : ""}
                >
                  Latest insights on health and wellness
                </ListItem>
                <ListItem 
                  href="/faq" 
                  title="FAQ"
                  className={pathname === "/faq" ? "bg-primary/10" : ""}
                >
                  Answers to common questions
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink 
              asChild 
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === "/about" && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Link href="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink 
              asChild 
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === "/contact" && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Link href="/contact">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

