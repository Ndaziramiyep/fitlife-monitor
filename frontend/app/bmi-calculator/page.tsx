"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Info } from "lucide-react"
import { BmiCalculator } from '@/components/bmi-calculator'
import { useRouter } from 'next/navigation'

export default function BMICalculatorPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <Button variant="outline" className="self-start" onClick={handleBack}>
          Back to Dashboard
        </Button>

        <div>
          <h1 className="text-3xl font-bold">BMI Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index and understand what it means for your health
          </p>
        </div>

        <BmiCalculator />

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

