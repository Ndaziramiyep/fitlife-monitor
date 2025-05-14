import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Activity, BarChart2, MessageSquare, Brain, ArrowRight, Zap } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">How FitLife Monitor Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding the technology and science behind our health monitoring platform
          </p>
        </div>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>The FitLife Approach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              FitLife Monitor combines health science, data analytics, and artificial intelligence to provide you with
              personalized health insights and recommendations. Our platform is designed to be both scientifically
              accurate and user-friendly.
            </p>
            <p>
              We believe that understanding your health metrics is the first step toward improvement. That's why we not
              only calculate your BMI and other health indicators but also explain what they mean and provide actionable
              recommendations.
            </p>
          </CardContent>
        </Card>

        {/* Step by Step Process */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">How It Works: Step by Step</h2>

          <div className="relative border-l border-primary/30 pl-6 ml-4">
            <div className="absolute w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-4">
              1
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Data Collection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You provide basic health information such as your height, weight, age, and activity level. This can be
                  done manually or through connected devices (coming soon).
                </p>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">What we collect:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Basic measurements (height, weight)</li>
                    <li>Activity levels and exercise habits</li>
                    <li>Optional: health goals and preferences</li>
                    <li>Optional: additional body measurements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative border-l border-primary/30 pl-6 ml-4">
            <div className="absolute w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-4">
              2
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  Analysis & Calculation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our system calculates your BMI and other health metrics using scientifically validated formulas. We
                  analyze your data in context, considering factors like age, gender, and activity level.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Our calculations include:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Body Mass Index (BMI) = weight(kg) / height²(m)</li>
                    <li>Body fat percentage estimation</li>
                    <li>Basal Metabolic Rate (BMR)</li>
                    <li>Total Daily Energy Expenditure (TDEE)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative border-l border-primary/30 pl-6 ml-4">
            <div className="absolute w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-4">
              3
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our AI system analyzes your health data and generates personalized recommendations based on scientific
                  research and medical guidelines. These recommendations are tailored to your specific metrics, goals,
                  and preferences.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Recommendation areas:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Nutrition advice based on your BMI and goals</li>
                    <li>Exercise recommendations suitable for your fitness level</li>
                    <li>Lifestyle adjustments for better health</li>
                    <li>Goal-setting guidance for realistic progress</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative border-l border-primary/30 pl-6 ml-4">
            <div className="absolute w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-4">
              4
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Interactive AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our AI health assistant provides on-demand guidance and answers to your health questions. It's trained
                  on medical literature and can provide evidence-based information tailored to your specific situation.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">AI assistant capabilities:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Answers to health and nutrition questions</li>
                    <li>Explanation of your health metrics in plain language</li>
                    <li>Personalized advice based on your profile</li>
                    <li>24/7 availability for health guidance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative pl-6 ml-4">
            <div className="absolute w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-4">
              5
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Progress Tracking & Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  As you continue to use FitLife Monitor, our system tracks your progress over time, identifying trends
                  and patterns in your health data. This longitudinal analysis provides deeper insights and helps you
                  stay motivated.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Tracking features:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Visual charts showing BMI and weight changes</li>
                    <li>Progress toward your health goals</li>
                    <li>Achievement badges for health milestones</li>
                    <li>Personalized insights based on your data trends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Behind FitLife */}
        <Card>
          <CardHeader>
            <CardTitle>The Technology Behind FitLife</CardTitle>
            <CardDescription>How we combine health science with cutting-edge technology</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Health Algorithms</h3>
                <p className="text-sm text-muted-foreground">
                  Our health calculations are based on established medical formulas and guidelines from organizations
                  like the World Health Organization and the American Heart Association.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Artificial Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  We use advanced machine learning models trained on medical literature to provide personalized
                  recommendations and power our AI health assistant.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Data Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive charts and graphs help you understand your health data at a glance and track changes over
                  time.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Secure Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Your health data is protected with industry-standard encryption and security practices to ensure
                  privacy and confidentiality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future IoT Integration */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle>Coming Soon: IoT Integration</CardTitle>
            <CardDescription>The future of automated health monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We're working on integrating with Internet of Things (IoT) health devices to make data collection even
              easier and more accurate. Soon, you'll be able to connect smart scales, fitness trackers, and other health
              monitoring devices directly to FitLife Monitor.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-background rounded-lg p-4">
                <h3 className="font-medium mb-2">Smart Scales</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically sync your weight, body fat percentage, and other metrics.
                </p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <h3 className="font-medium mb-2">Fitness Trackers</h3>
                <p className="text-sm text-muted-foreground">
                  Import activity data, heart rate, and sleep patterns for more comprehensive health insights.
                </p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <h3 className="font-medium mb-2">Health Monitors</h3>
                <p className="text-sm text-muted-foreground">
                  Connect blood pressure monitors and other health devices for a complete health profile.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scientific Basis */}
        <Card>
          <CardHeader>
            <CardTitle>The Science Behind Our Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              All recommendations provided by FitLife Monitor are based on peer-reviewed scientific research and
              established medical guidelines. Our team of health experts regularly reviews and updates our knowledge
              base to ensure accuracy.
            </p>
            <p>
              We follow evidence-based approaches to nutrition, exercise, and lifestyle recommendations, tailoring them
              to individual needs while adhering to recognized health standards.
            </p>
            <div className="rounded-md bg-muted p-4 mt-4">
              <h4 className="font-medium mb-2">Key scientific sources:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>World Health Organization (WHO) guidelines</li>
                <li>American Heart Association recommendations</li>
                <li>Peer-reviewed nutrition and exercise science journals</li>
                <li>Evidence-based behavioral change research</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Note:</strong> While our platform provides valuable health information based on scientific
              research, it is not a substitute for professional medical advice. Always consult with healthcare providers
              for medical concerns.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Ready to Start Your Health Journey?</h2>
              <p className="max-w-2xl mx-auto">
                Experience the power of FitLife Monitor's personalized health insights and AI-powered recommendations.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup" legacyBehavior>
                  <div className="flex items-center">
                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

