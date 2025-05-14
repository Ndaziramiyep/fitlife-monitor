import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart } from "@/components/ui/chart"
import { BarChart2, Calendar, Download, Share2 } from "lucide-react"

export default function ProgressPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your health metrics over time</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="3months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download data</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current BMI</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↓ 0.3</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68 kg</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↓ 0.5kg</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal Weight</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65 kg</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-muted-foreground">3 kg to go</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Measurements</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Total entries recorded</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="bmi">BMI History</TabsTrigger>
            <TabsTrigger value="weight">Weight History</TabsTrigger>
            <TabsTrigger value="measurements">Body Measurements</TabsTrigger>
          </TabsList>

          <TabsContent value="bmi" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>BMI Over Time</CardTitle>
                <CardDescription>Track how your BMI has changed</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <LineChart
                    data={[
                      { name: "Jan", value: 24.2 },
                      { name: "Feb", value: 24.0 },
                      { name: "Mar", value: 23.8 },
                      { name: "Apr", value: 23.7 },
                      { name: "May", value: 23.5 },
                      { name: "Jun", value: 23.5 },
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value} BMI`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    yAxisWidth={40}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>BMI Category Distribution</CardTitle>
                <CardDescription>Time spent in each BMI category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <BarChart
                    data={[
                      { name: "Underweight", value: 0 },
                      { name: "Normal", value: 24 },
                      { name: "Overweight", value: 0 },
                      { name: "Obese", value: 0 },
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value} weeks`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    yAxisWidth={40}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Over Time</CardTitle>
                <CardDescription>Track how your weight has changed</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <LineChart
                    data={[
                      { name: "Jan", value: 70.0 },
                      { name: "Feb", value: 69.5 },
                      { name: "Mar", value: 69.0 },
                      { name: "Apr", value: 68.5 },
                      { name: "May", value: 68.0 },
                      { name: "Jun", value: 68.0 },
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value} kg`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    yAxisWidth={40}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weight vs. Goal</CardTitle>
                <CardDescription>Progress toward your weight goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Current: 68 kg</span>
                    <span>Goal: 65 kg</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4">
                    <div className="bg-primary h-4 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">You've lost 2 kg out of your 5 kg goal (40% complete)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measurements" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
                <CardDescription>Track changes in your body measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Waist</span>
                        <span>80 cm</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↓ 2 cm</span> from initial measurement
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Chest</span>
                        <span>95 cm</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↓ 1 cm</span> from initial measurement
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hips</span>
                        <span>92 cm</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↓ 1.5 cm</span> from initial measurement
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Thighs</span>
                        <span>55 cm</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "55%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">↓ 1 cm</span> from initial measurement
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Add New Measurement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Measurement History</CardTitle>
            <CardDescription>Your recent BMI and weight measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Weight (kg)</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">BMI</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Jun 15, 2023", weight: "68.0", bmi: "23.5", category: "Normal", change: "0" },
                      { date: "May 15, 2023", weight: "68.0", bmi: "23.5", category: "Normal", change: "-0.2" },
                      { date: "Apr 15, 2023", weight: "68.5", bmi: "23.7", category: "Normal", change: "-0.1" },
                      { date: "Mar 15, 2023", weight: "69.0", bmi: "23.8", category: "Normal", change: "-0.2" },
                      { date: "Feb 15, 2023", weight: "69.5", bmi: "24.0", category: "Normal", change: "-0.2" },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{row.date}</td>
                        <td className="p-4 align-middle">{row.weight}</td>
                        <td className="p-4 align-middle">{row.bmi}</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {row.category}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          {Number.parseFloat(row.change) === 0 ? (
                            <span className="text-muted-foreground">No change</span>
                          ) : Number.parseFloat(row.change) < 0 ? (
                            <span className="text-green-500">{row.change}</span>
                          ) : (
                            <span className="text-red-500">+{row.change}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

