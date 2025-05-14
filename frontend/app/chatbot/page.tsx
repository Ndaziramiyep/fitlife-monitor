import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, ThumbsUp, ThumbsDown, User, Bot } from "lucide-react"

export default function ChatbotPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">AI Health Assistant</h1>
          <p className="text-muted-foreground">Get personalized health advice and answers to your questions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-3">
            <Card className="h-[calc(100vh-250px)] flex flex-col">
              <CardHeader>
                <CardTitle>Chat with FitLife AI</CardTitle>
                <CardDescription>Ask questions about nutrition, exercise, or general health advice</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto space-y-4 p-4">
                {/* Welcome Message */}
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      Hello! I'm your FitLife AI assistant. I can help you with health advice, nutrition tips, exercise
                      recommendations, and answer questions about your BMI. How can I assist you today?
                    </p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-3 items-start justify-end">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <p className="text-sm">What are some good exercises for someone with a BMI of 23.5?</p>
                  </div>
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* AI Response */}
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  </Avatar>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">
                        With a BMI of 23.5, you're in the healthy weight range! Here are some exercise recommendations:
                      </p>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Cardiovascular exercises: jogging, cycling, swimming (150 minutes/week)</li>
                        <li>Strength training: weight lifting, bodyweight exercises (2-3 times/week)</li>
                        <li>Flexibility: yoga, stretching (2-3 times/week)</li>
                        <li>High-intensity interval training (HIIT) for efficiency</li>
                      </ul>
                      <p className="text-sm mt-2">
                        Since you're at a healthy weight, focus on exercises you enjoy that help maintain fitness and
                        strength rather than weight loss specifically.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Helpful</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ThumbsDown className="h-4 w-4" />
                        <span className="sr-only">Not Helpful</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form className="flex w-full items-center space-x-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Suggested Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Nutrition advice for my BMI
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    How to improve my sleep
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Stress management techniques
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Healthy meal planning
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Your Health Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current BMI:</span>
                    <span className="font-medium">23.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">68 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Height:</span>
                    <span className="font-medium">170 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activity Level:</span>
                    <span className="font-medium">Moderate</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About FitLife AI Assistant</CardTitle>
            <CardDescription>How our AI can help you on your health journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <div className="bg-primary/10 p-2 rounded-full w-fit mb-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Personalized Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Get health recommendations tailored to your BMI, goals, and preferences
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="bg-primary/10 p-2 rounded-full w-fit mb-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Evidence-Based</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI is trained on scientific research and medical guidelines
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="bg-primary/10 p-2 rounded-full w-fit mb-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Ask questions anytime and get immediate responses to support your health journey
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> While our AI provides helpful health information, it's not a substitute for
              professional medical advice. Always consult with healthcare professionals for medical concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

