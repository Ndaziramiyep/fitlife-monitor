"use client"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Filter, PlusCircle, MessageSquare, BookOpen, Lightbulb } from "lucide-react"

export default function ContentManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("health-tips")

  // Mock content data
  const healthTips = [
    {
      id: "1",
      title: "Stay Hydrated Throughout the Day",
      category: "Nutrition",
      status: "published",
      author: "Dr. Sarah Johnson",
      publishDate: "2023-05-15",
      views: 1245,
    },
    {
      id: "2",
      title: "Benefits of Morning Stretching",
      category: "Exercise",
      status: "published",
      author: "Michael Chen, PT",
      publishDate: "2023-05-20",
      views: 987,
    },
    {
      id: "3",
      title: "Mindfulness for Stress Reduction",
      category: "Mental Health",
      status: "draft",
      author: "Dr. Emily Williams",
      publishDate: "-",
      views: 0,
    },
    {
      id: "4",
      title: "Healthy Snack Alternatives",
      category: "Nutrition",
      status: "published",
      author: "Nutritionist Team",
      publishDate: "2023-06-01",
      views: 2156,
    },
    {
      id: "5",
      title: "Improving Sleep Quality",
      category: "Wellness",
      status: "review",
      author: "Dr. James Wilson",
      publishDate: "-",
      views: 0,
    },
  ]

  const articles = [
    {
      id: "1",
      title: "Understanding BMI: Benefits and Limitations",
      category: "Health Education",
      status: "published",
      author: "Dr. Robert Smith",
      publishDate: "2023-04-10",
      views: 3245,
    },
    {
      id: "2",
      title: "The Science of Weight Loss",
      category: "Nutrition",
      status: "published",
      author: "Nutritionist Team",
      publishDate: "2023-05-05",
      views: 4567,
    },
    {
      id: "3",
      title: "Building a Sustainable Exercise Routine",
      category: "Exercise",
      status: "published",
      author: "Fitness Team",
      publishDate: "2023-05-12",
      views: 2890,
    },
  ]

  const chatbotResponses = [
    {
      id: "1",
      query: "How to calculate BMI?",
      response: "BMI is calculated by dividing your weight in kilograms by your height in meters squared...",
      category: "Calculations",
      lastUpdated: "2023-06-01",
    },
    {
      id: "2",
      query: "What is a healthy diet?",
      response: "A healthy diet includes a variety of fruits, vegetables, whole grains, lean proteins...",
      category: "Nutrition",
      lastUpdated: "2023-05-28",
    },
    {
      id: "3",
      query: "How much exercise do I need?",
      response: "Adults should aim for at least 150 minutes of moderate-intensity exercise per week...",
      category: "Exercise",
      lastUpdated: "2023-06-05",
    },
  ]

  // Filter content based on search query and active tab
  const getFilteredContent = () => {
    let content = []

    switch (activeTab) {
      case "health-tips":
        content = healthTips
        break
      case "articles":
        content = articles
        break
      case "chatbot":
        content = chatbotResponses
        break
      default:
        content = healthTips
    }

    if (!searchQuery) return content

    return content.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.query?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button asChild>
          <Link href="/admin/content/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Content
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Content</CardTitle>
          <CardDescription>Create, edit, and publish content for the FitLife Monitor platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="health-tips" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="health-tips" className="flex items-center">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Health Tips
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="chatbot" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chatbot Responses
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search content..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>

            <TabsContent value="health-tips" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredContent().map((tip) => (
                      <TableRow key={tip.id}>
                        <TableCell className="font-medium">{tip.title}</TableCell>
                        <TableCell>{tip.category}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tip.status === "published" ? "default" : tip.status === "draft" ? "outline" : "secondary"
                            }
                          >
                            {tip.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{tip.author}</TableCell>
                        <TableCell>{tip.publishDate}</TableCell>
                        <TableCell>{tip.views}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              {tip.status !== "published" ? (
                                <DropdownMenuItem>Publish</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>Unpublish</DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredContent().map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              article.status === "published"
                                ? "default"
                                : article.status === "draft"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>{article.publishDate}</TableCell>
                        <TableCell>{article.views}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              {article.status !== "published" ? (
                                <DropdownMenuItem>Publish</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>Unpublish</DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Query</TableHead>
                      <TableHead>Response Preview</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredContent().map((response) => (
                      <TableRow key={response.id}>
                        <TableCell className="font-medium">{response.query}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{response.response}</TableCell>
                        <TableCell>{response.category}</TableCell>
                        <TableCell>{response.lastUpdated}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Full Response</DropdownMenuItem>
                              <DropdownMenuItem>Edit Response</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

