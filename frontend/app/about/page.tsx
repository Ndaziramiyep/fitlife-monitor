import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Award, Users, BarChart2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About FitLife Monitor</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our mission is to help people understand and improve their health through personalized insights and
            AI-powered recommendations.
          </p>
        </div>

        {/* Our Story */}
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              FitLife Monitor was founded in 2023 with a simple goal: make health monitoring accessible, understandable,
              and actionable for everyone. We believe that understanding your body is the first step toward better
              health.
            </p>
            <p>
              What started as a simple BMI calculator has evolved into a comprehensive health monitoring platform that
              combines cutting-edge technology with evidence-based health science to provide personalized
              recommendations and insights.
            </p>
            <p>
              Our team of health experts, data scientists, and developers work together to create tools that help you
              make informed decisions about your health journey.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col items-center text-center p-6">
            <Heart className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Health First</h3>
            <p className="text-muted-foreground">
              We prioritize evidence-based health information and recommendations above all else.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Inclusivity</h3>
            <p className="text-muted-foreground">
              Our platform is designed to be accessible and helpful for people of all backgrounds and health journeys.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <BarChart2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Data-Driven</h3>
            <p className="text-muted-foreground">
              We use data science and AI to provide personalized insights while respecting your privacy.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Continuous Improvement</h3>
            <p className="text-muted-foreground">
              We're constantly learning and improving our platform based on the latest research and user feedback.
            </p>
          </Card>
        </div>

        {/* Our Team */}
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>Meet the experts behind FitLife Monitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Chief Medical Officer",
                  bio: "Board-certified physician with a passion for preventive health and nutrition.",
                },
                {
                  name: "Michael Chen",
                  role: "Lead Data Scientist",
                  bio: "Expert in AI and machine learning with a focus on health analytics.",
                },
                {
                  name: "Priya Patel",
                  role: "Head of Product",
                  bio: "Product leader with experience in health tech and user-centered design.",
                },
                {
                  name: "James Wilson",
                  role: "Chief Technology Officer",
                  bio: "Software engineer specializing in secure health data systems.",
                },
                {
                  name: "Maria Rodriguez",
                  role: "Nutritionist",
                  bio: "Registered dietitian with expertise in personalized nutrition plans.",
                },
                {
                  name: "David Kim",
                  role: "Fitness Specialist",
                  bio: "Certified personal trainer focused on accessible fitness for all levels.",
                },
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${member.name.charAt(0)}`} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Our Approach */}
        <Card>
          <CardHeader>
            <CardTitle>Our Approach to Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At FitLife Monitor, we believe in a holistic approach to health that considers physical, mental, and
              lifestyle factors. Our recommendations are based on:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Evidence-based science:</strong> All our health information and recommendations are grounded in
                peer-reviewed research and established medical guidelines.
              </li>
              <li>
                <strong>Personalization:</strong> We recognize that everyone's health journey is unique, which is why
                our AI assistant provides tailored advice based on your specific metrics and goals.
              </li>
              <li>
                <strong>Sustainability:</strong> We focus on gradual, sustainable changes rather than quick fixes,
                helping you build healthy habits that last.
              </li>
              <li>
                <strong>Empowerment through education:</strong> We aim to help you understand your health data so you
                can make informed decisions about your wellbeing.
              </li>
            </ul>
            <p className="mt-4">
              While we provide valuable health insights and recommendations, FitLife Monitor is not a substitute for
              professional medical advice. We encourage users to consult with healthcare providers for medical concerns
              and before making significant changes to their health routines.
            </p>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Our Vision for the Future</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We're constantly evolving FitLife Monitor to better serve our users. Our roadmap includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Integration with IoT health devices for automated data collection</li>
              <li>Advanced AI capabilities for even more personalized health insights</li>
              <li>Expanded community features to connect with others on similar health journeys</li>
              <li>Partnerships with healthcare providers for more comprehensive health monitoring</li>
            </ul>
            <p className="mt-4">
              Our ultimate goal is to create a platform that not only helps you monitor your health but also empowers
              you to make positive changes that improve your quality of life.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

