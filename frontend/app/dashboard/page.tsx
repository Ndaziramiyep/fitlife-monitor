"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Activity, Settings, Award, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/src/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BmiCalculator } from "@/components/bmi-calculator";
import { useRouter } from "next/navigation";
import api, { setAuthToken } from "@/src/services/api";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [bmiData, setBmiData] = useState<any>(null);
  const [loadingBmi, setLoadingBmi] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // Fetch user only if token exists
      getCurrentUser().then(setUser).finally(() => setLoading(false));
      // Fetch BMI data
      api.get('/api/bmi/history')
        .then(response => {
          const currentBmi = response.data.current;
          setBmiData({
            value: currentBmi.bmi,
            category: currentBmi.category,
            lastCalculated: currentBmi.last_calculated
          });
        })
        .catch(error => console.error('Failed to fetch BMI data:', error))
        .finally(() => setLoadingBmi(false));
    }
  }, [router]); // Add router to dependencies array

  const handleLogout = async () => {
    try {
      await api.post('/logout'); // Call the backend logout endpoint
    } catch (error) {
      console.error('Logout failed on backend:', error);
      // Continue with local logout even if backend call fails
    }
    localStorage.removeItem('token');
    setAuthToken(null);
    router.push('/login');
  };

  return (
    <div className="container py-8">
      {/* Personal Profile Widget */}
      <div className="mb-6">
        <Card className="flex flex-row items-center gap-6 p-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            {loading ? (
              <div>Loading profile...</div>
            ) : user ? (
              <>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm">Height: {user?.height ?? "-"} cm</span>
                  <span className="text-sm">Weight: {user?.weight ?? "-"} kg</span>
                  <span className="text-sm">Goal: {user.fitness_goal ?? "-"}</span>
                </div>
              </>
            ) : (
              <div>Failed to load profile.</div>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Update Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">
              Keep your profile up to date for accurate recommendations
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/bmi-calculator">
                <div className="flex items-center">
                  Update Now <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">
              Get personalized health advice and answers to your questions
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/chatbot">
                <div className="flex items-center">
                  Start Chat <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Set New Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">
              Define your health objectives and track your progress
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/profile">
                <div className="flex items-center">
                  Set Goals <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
        {/* New Card for Content Management */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Manage My Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">
              Create, view, edit, and delete your personal content.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/content">
                <div className="flex items-center">
                  Manage Content <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* BMI Status Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle>Your BMI Status</CardTitle>
          <CardDescription>Last updated: {bmiData?.lastCalculated ? new Date(bmiData.lastCalculated).toLocaleDateString() : '-'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 flex items-center justify-center">
                {loadingBmi ? (
                  <span className="text-xl font-bold">Loading...</span>
                ) : bmiData ? (
                  <span className="text-4xl font-bold">{bmiData.value.toFixed(1)}</span>
                ) : (
                  <span className="text-xl font-bold">N/A</span>
                )}
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset={bmiData ? 283 - (bmiData.value / 40) * 283 : 283}
                  className="text-primary"
                />
              </svg>
            </div>
            <div className="flex-1">
              {loadingBmi ? (
                <h3 className="text-xl font-medium mb-2">Loading...</h3>
              ) : bmiData ? (
                <>
                  <h3 className={`text-xl font-medium mb-2 ${bmiData.category === 'Healthy Weight' ? 'text-primary' : ''}`}>{bmiData.category}</h3>
                  <p className="text-muted-foreground mb-4">
                    {bmiData.category === 'Healthy Weight'
                      ? 'Your BMI is within the healthy range of 18.5 to 24.9. Keep up the good work!'
                      : bmiData.category === 'Underweight'
                      ? 'Your BMI is in the underweight range. Consider consulting a professional.'
                      : bmiData.category === 'Overweight'
                      ? 'Your BMI is in the overweight range. Consider making some changes.'
                      : bmiData.category === 'Obese'
                      ? 'Your BMI is in the obese range. It is recommended to seek professional advice.'
                      : 'BMI information available.'}
                  </p>
                </>
              ) : (
                <h3 className="text-xl font-medium mb-2">BMI data not available.</h3>
              )}
              <div className="w-full bg-muted rounded-full h-4 mb-2">
                <div
                  className={`h-4 rounded-full ${
                    bmiData?.category === 'Healthy Weight' 
                      ? 'bg-primary' 
                      : bmiData?.category === 'Underweight' 
                      ? 'bg-yellow-500' 
                      : bmiData?.category === 'Overweight' 
                      ? 'bg-orange-500' 
                      : bmiData?.category === 'Obese' 
                      ? 'bg-red-500' 
                      : 'bg-muted'
                  }`}
                  style={{ width: bmiData ? `${Math.min(100, (bmiData.value / 40) * 100)}%` : '0%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key User Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.weight ?? "-"} kg</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Height</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.height ?? "-"} cm</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
            <p className="text-xs text-muted-foreground">Based on your profile settings</p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="bmi" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="bmi" className="space-y-4 pt-4">
          <BmiCalculator />
        </TabsContent>

        <TabsContent value="workouts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Workout content will go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Stats content will go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Health Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Stay Hydrated</h4>
                  <p className="text-sm text-muted-foreground">
                    Aim to drink at least 8 glasses of water today to maintain optimal health.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Take a Break</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember to take short breaks throughout the day to stretch and rest your eyes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Balanced Diet</h4>
                  <p className="text-sm text-muted-foreground">
                    Include a variety of fruits and vegetables in your meals for essential nutrients.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>BMI Progress</CardTitle>
              <CardDescription>Your BMI changes over the past 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
                <p className="text-muted-foreground">BMI Progress Chart Visualization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your current BMI and health profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Nutrition</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 h-2 w-2 mt-2"></div>
                    <span>Maintain a balanced diet with plenty of fruits and vegetables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 h-2 w-2 mt-2"></div>
                    <span>Aim for 2000-2200 calories per day based on your activity level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 h-2 w-2 mt-2"></div>
                    <span>Include lean proteins and whole grains in your meals</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Exercise</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 h-2 w-2 mt-2"></div>
                    <span>Aim for 150 minutes of moderate exercise per week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 h-2 w-2 mt-2"></div>
                    <span>Include both cardio and strength training in your routine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500 h-2 w-2 mt-2"></div>
                    <span>Consider activities like walking, swimming, or cycling</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Lifestyle</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-purple-500 h-2 w-2 mt-2"></div>
                    <span>Aim for 7-8 hours of quality sleep each night</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-purple-500 h-2 w-2 mt-2"></div>
                    <span>Practice stress management techniques like meditation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-purple-500 h-2 w-2 mt-2"></div>
                    <span>Stay hydrated throughout the day</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Track your health milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4 text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">First Weigh-In</h3>
                  <p className="text-xs text-muted-foreground">Started your health journey</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Healthy BMI</h3>
                  <p className="text-xs text-muted-foreground">Maintained a healthy BMI for 30 days</p>
                </div>
                <div className="border rounded-lg p-4 text-center bg-muted/30">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-muted-foreground">Weight Goal</h3>
                  <p className="text-xs text-muted-foreground">Reach your target weight</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

