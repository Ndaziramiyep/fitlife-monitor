import Link from "next/link"
import { ArrowRight, Activity, BarChart2, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Monitor Your Health with FitLife
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track your BMI, get personalized recommendations, and chat with our AI health assistant to achieve
                  your fitness goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    <div className="flex items-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="FitLife Monitor Dashboard Preview"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Healthy BMI Range</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to monitor and improve your health in one place
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <Activity className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">BMI Calculator</CardTitle>
                <CardDescription>
                  Calculate your Body Mass Index and understand what it means for your health
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/bmi-calculator">
                    <div className="flex items-center">
                      Try it now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <BarChart2 className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your health metrics over time with interactive charts and insights
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/progress">
                    <div className="flex items-center">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">AI Health Assistant</CardTitle>
                <CardDescription>Get personalized advice and answers to your health questions</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/chatbot">
                    <div className="flex items-center">
                      Chat now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have improved their health with FitLife Monitor
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 mt-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">User {i}</h3>
                      <p className="text-sm text-muted-foreground">FitLife Member</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "FitLife Monitor has completely changed how I approach my health. The personalized recommendations
                    and easy tracking have helped me achieve my goals."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Health Journey Today
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join FitLife Monitor and take control of your health with our comprehensive tools and AI assistant
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  <div className="flex items-center">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

