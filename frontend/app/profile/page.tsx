import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, Bell, Shield } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="health">Health Data</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">This will be displayed on your profile</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Patrick" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Ndaziramiye" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="patrick@gmail.com" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" defaultValue="1990-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>Update your health measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" defaultValue="170" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" defaultValue="68" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-level">Activity Level</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger id="activity-level">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Very active (very hard exercise & physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Health Conditions</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {["Diabetes", "Hypertension", "Heart Disease", "Asthma"].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Switch id={`condition-${condition.toLowerCase()}`} />
                        <Label htmlFor={`condition-${condition.toLowerCase()}`}>{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies or Dietary Restrictions</Label>
                  <Input id="allergies" placeholder="E.g., Lactose intolerant, Gluten-free, etc." />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Health Data</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
                <CardDescription>Track additional body measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (cm)</Label>
                    <Input id="waist" type="number" defaultValue="80" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chest">Chest (cm)</Label>
                    <Input id="chest" type="number" defaultValue="95" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hips">Hips (cm)</Label>
                    <Input id="hips" type="number" defaultValue="92" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thighs">Thighs (cm)</Label>
                    <Input id="thighs" type="number" defaultValue="55" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Measurements</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Health Goals</CardTitle>
                <CardDescription>Set and track your health objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-type">Primary Goal</Label>
                  <Select defaultValue="maintain">
                    <SelectTrigger id="goal-type">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Weight</SelectItem>
                      <SelectItem value="fitness">Improve Fitness</SelectItem>
                      <SelectItem value="health">General Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="target-weight">Target Weight (kg)</Label>
                    <Input id="target-weight" type="number" defaultValue="65" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-date">Target Date</Label>
                    <Input id="target-date" type="date" defaultValue="2023-12-31" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly-goal">Weekly Goal</Label>
                  <Select defaultValue="0.5">
                    <SelectTrigger id="weekly-goal">
                      <SelectValue placeholder="Select weekly goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.25">Lose 0.25 kg per week</SelectItem>
                      <SelectItem value="0.5">Lose 0.5 kg per week</SelectItem>
                      <SelectItem value="0.75">Lose 0.75 kg per week</SelectItem>
                      <SelectItem value="1">Lose 1 kg per week</SelectItem>
                      <SelectItem value="0">Maintain weight</SelectItem>
                      <SelectItem value="-0.5">Gain 0.5 kg per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Exercise Goals</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Cardio Exercise</h4>
                        <p className="text-sm text-muted-foreground">Minutes per week</p>
                      </div>
                      <Input className="w-20" type="number" defaultValue="150" />
                    </div>
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Strength Training</h4>
                        <p className="text-sm text-muted-foreground">Sessions per week</p>
                      </div>
                      <Input className="w-20" type="number" defaultValue="3" />
                    </div>
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Steps</h4>
                        <p className="text-sm text-muted-foreground">Daily step goal</p>
                      </div>
                      <Input className="w-20" type="number" defaultValue="10000" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Goals</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" /> Notifications
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-progress">Progress Updates</Label>
                      <Switch id="notify-progress" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-tips">Daily Health Tips</Label>
                      <Switch id="notify-tips" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-reminders">Measurement Reminders</Label>
                      <Switch id="notify-reminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-news">News & Updates</Label>
                      <Switch id="notify-news" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Preferences
                  </h3>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="units">Unit System</Label>
                      <Select defaultValue="metric">
                        <SelectTrigger id="units">
                          <SelectValue placeholder="Select unit system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                          <SelectItem value="imperial">Imperial (lbs, ft/in)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Privacy
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-collection">Allow Data Collection</Label>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="personalized-content">Personalized Content</Label>
                      <Switch id="personalized-content" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We use your data to provide personalized health recommendations. You can opt out at any time.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <LogoutButton variant="outline" />
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

