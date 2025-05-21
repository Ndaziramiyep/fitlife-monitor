"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Users, Activity, TrendingUp, BarChart3, PieChart, LineChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Monitor platform usage and health data trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,328</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+12%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,856</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+8%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+3%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8m 42s</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+15%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="user-metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user-metrics" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            User Metrics
          </TabsTrigger>
          <TabsTrigger value="health-data" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Health Data
          </TabsTrigger>
          <TabsTrigger value="platform-usage" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Platform Usage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user-metrics" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">User Growth Chart</p>
                  <p className="text-xs text-muted-foreground">Showing steady growth of 8-12% month over month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age and gender distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">Demographics Chart</p>
                  <p className="text-xs text-muted-foreground">
                    Primary user base: 25-45 years old, 58% female, 42% male
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Activity levels across different features</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">Feature Usage Chart</p>
                <p className="text-xs text-muted-foreground">
                  Most popular features: BMI tracking (78%), Goal setting (65%), AI chatbot (52%)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health-data" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>BMI Distribution</CardTitle>
              <CardDescription>Anonymized BMI data across user base</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">BMI Distribution Chart</p>
                <p className="text-xs text-muted-foreground">
                  45% Normal weight, 32% Overweight, 15% Obese, 8% Underweight
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weight Change Trends</CardTitle>
                <CardDescription>Average weight changes over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">Weight Trends Chart</p>
                  <p className="text-xs text-muted-foreground">
                    Average weight loss of 0.5kg per month for users with weight loss goals
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activity Level Distribution</CardTitle>
                <CardDescription>User-reported activity levels</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">Activity Levels Chart</p>
                  <p className="text-xs text-muted-foreground">
                    12% Sedentary, 28% Light, 35% Moderate, 20% Active, 5% Very Active
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platform-usage" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most used platform features</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">Feature Usage Chart</p>
                  <p className="text-xs text-muted-foreground">
                    Dashboard (92%), BMI Calculator (78%), Goal Tracking (65%), AI Chatbot (52%)
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where users are coming from</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">Traffic Sources Chart</p>
                  <p className="text-xs text-muted-foreground">
                    Direct (45%), Organic Search (30%), Referrals (15%), Social Media (10%)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Peak Usage Times</CardTitle>
              <CardDescription>When users are most active on the platform</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <LineChart className="h-16 w-16 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">Usage Time Chart</p>
                <p className="text-xs text-muted-foreground">
                  Peak usage: Mornings (6-8am) and Evenings (7-10pm), with highest activity on Mondays
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

