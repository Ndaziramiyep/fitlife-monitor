import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Info } from "lucide-react"

export default function BMICalculatorPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">BMI Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index and understand what it means for your health
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your BMI</CardTitle>
            <CardDescription>Enter your height and weight to calculate your BMI</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="metric" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (ft/lbs)</TabsTrigger>
              </TabsList>

              <TabsContent value="metric" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="height">Height (cm)</Label>
                      <span className="text-sm text-muted-foreground">170 cm</span>
                    </div>
                    <Slider id="height" defaultValue={[170]} max={220} min={120} step={1} className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <span className="text-sm text-muted-foreground">68 kg</span>
                    </div>
                    <Slider id="weight" defaultValue={[68]} max={150} min={30} step={0.5} className="w-full" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="imperial" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feet">Height (ft)</Label>
                    <Input id="feet" type="number" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inches">Height (in)</Label>
                    <Input id="inches" type="number" placeholder="7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pounds">Weight (lbs)</Label>
                  <Input id="pounds" type="number" placeholder="150" />
                </div>
              </TabsContent>

              <Button className="w-full mt-6">Calculate BMI</Button>
            </Tabs>
          </CardContent>
        </Card>

        {/* BMI Result Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle>Your BMI Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">23.5</span>
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
                    strokeDashoffset="70"
                    className="text-primary"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2">Healthy Weight</h3>
                <p className="text-muted-foreground mb-4">
                  Your BMI is within the healthy range of 18.5 to 24.9. Keep up the good work!
                </p>
                <div className="w-full bg-muted rounded-full h-4 mb-2">
                  <div className="bg-primary h-4 rounded-full" style={{ width: "65%" }}></div>
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

        {/* BMI Information */}
        <Card>
          <CardHeader>
            <CardTitle>Understanding BMI</CardTitle>
            <CardDescription>What your BMI result means and how to interpret it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-full">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">What is BMI?</h4>
                <p className="text-sm text-muted-foreground">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men
                  and women. It's a simple calculation that gives a general indication of whether you're at a healthy
                  weight.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">BMI Categories:</h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 p-2 rounded-md bg-blue-100 dark:bg-blue-950">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div>
                    <span className="font-medium">Underweight</span>
                    <span className="text-sm text-muted-foreground ml-2">BMI less than 18.5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-green-100 dark:bg-green-950">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div>
                    <span className="font-medium">Normal weight</span>
                    <span className="text-sm text-muted-foreground ml-2">BMI 18.5 to 24.9</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-yellow-100 dark:bg-yellow-950">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div>
                    <span className="font-medium">Overweight</span>
                    <span className="text-sm text-muted-foreground ml-2">BMI 25 to 29.9</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-red-100 dark:bg-red-950">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div>
                    <span className="font-medium">Obesity</span>
                    <span className="text-sm text-muted-foreground ml-2">BMI 30 or greater</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-full">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Limitations of BMI</h4>
                <p className="text-sm text-muted-foreground">
                  BMI is a useful measure for most people, but it does have limitations. It may overestimate body fat in
                  athletes and others with muscular builds, and it may underestimate body fat in older persons and
                  others who have lost muscle mass.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>What to do with your BMI results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button className="w-full" variant="default">
                <Activity className="mr-2 h-4 w-4" />
                View Recommendations
              </Button>
              <Button className="w-full" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Save Results
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Remember that BMI is just one indicator of health. For a more comprehensive assessment, consult with a
              healthcare professional.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

