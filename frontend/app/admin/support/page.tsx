"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MoreHorizontal,
  Filter,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock,
  HelpCircle,
} from "lucide-react"

export default function SupportCenter() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock support tickets
  const tickets = [
    {
      id: "T-1001",
      subject: "Can't update my weight measurements",
      user: "john.doe@example.com",
      status: "open",
      priority: "high",
      category: "Technical",
      created: "2023-06-18",
      lastUpdated: "2023-06-19",
    },
    {
      id: "T-1002",
      subject: "Question about BMI calculation",
      user: "jane.smith@example.com",
      status: "in-progress",
      priority: "medium",
      category: "Information",
      created: "2023-06-17",
      lastUpdated: "2023-06-19",
    },
    {
      id: "T-1003",
      subject: "Request for account deletion",
      user: "michael.j@example.com",
      status: "open",
      priority: "low",
      category: "Account",
      created: "2023-06-19",
      lastUpdated: "2023-06-19",
    },
    {
      id: "T-1004",
      subject: "App crashes when viewing progress charts",
      user: "emily.brown@example.com",
      status: "in-progress",
      priority: "high",
      category: "Technical",
      created: "2023-06-16",
      lastUpdated: "2023-06-18",
    },
    {
      id: "T-1005",
      subject: "Billing issue with premium subscription",
      user: "david.wilson@example.com",
      status: "resolved",
      priority: "medium",
      category: "Billing",
      created: "2023-06-15",
      lastUpdated: "2023-06-17",
    },
  ]

  // Mock FAQs
  const faqs = [
    {
      id: "1",
      question: "How is BMI calculated?",
      answer: "BMI is calculated by dividing your weight in kilograms by your height in meters squared...",
      category: "Health",
      views: 1245,
      lastUpdated: "2023-05-15",
    },
    {
      id: "2",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page...",
      category: "Account",
      views: 987,
      lastUpdated: "2023-05-20",
    },
    {
      id: "3",
      question: "What is a healthy BMI range?",
      answer: "A healthy BMI range is generally considered to be between 18.5 and 24.9...",
      category: "Health",
      views: 2156,
      lastUpdated: "2023-06-01",
    },
    {
      id: "4",
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription by going to your account settings and selecting 'Manage Subscription'...",
      category: "Billing",
      views: 876,
      lastUpdated: "2023-05-25",
    },
    {
      id: "5",
      question: "Is my health data secure?",
      answer: "Yes, we take data security very seriously. All your health data is encrypted and stored securely...",
      category: "Privacy",
      views: 1532,
      lastUpdated: "2023-06-10",
    },
  ]

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Create FAQ
        </Button>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage user support requests and inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(ticket.status)}
                            <Badge
                              variant={
                                ticket.status === "open"
                                  ? "outline"
                                  : ticket.status === "in-progress"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {ticket.status === "in-progress"
                                ? "In Progress"
                                : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ticket.priority === "high"
                                ? "destructive"
                                : ticket.priority === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>{ticket.created}</TableCell>
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Assign Ticket</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                              <DropdownMenuItem>Change Priority</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage FAQ content for the help center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search FAQs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="privacy">Privacy</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium">{faq.question}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{faq.category}</Badge>
                        </TableCell>
                        <TableCell>{faq.views}</TableCell>
                        <TableCell>{faq.lastUpdated}</TableCell>
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
                              <DropdownMenuItem>View FAQ</DropdownMenuItem>
                              <DropdownMenuItem>Edit FAQ</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete FAQ</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ Analytics</CardTitle>
              <CardDescription>View statistics about FAQ usage and effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Most Viewed FAQs</div>
                  <div className="space-y-2">
                    {faqs
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((faq, index) => (
                        <div key={faq.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="text-sm truncate max-w-[200px]">{faq.question}</div>
                          <div className="text-sm font-medium">{faq.views} views</div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">FAQ Categories</div>
                  <div className="space-y-2">
                    {["Health", "Account", "Billing", "Privacy"].map((category) => {
                      const count = faqs.filter((faq) => faq.category === category).length
                      return (
                        <div key={category} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="text-sm">{category}</div>
                          <div className="text-sm font-medium">{count} FAQs</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Recently Updated</div>
                  <div className="space-y-2">
                    {faqs
                      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                      .slice(0, 3)
                      .map((faq) => (
                        <div key={faq.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="text-sm truncate max-w-[200px]">{faq.question}</div>
                          <div className="text-sm text-muted-foreground">{faq.lastUpdated}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

