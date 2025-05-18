import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about FitLife Monitor
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for answers..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col">
            <span className="text-lg font-medium">Getting Started</span>
            <span className="text-sm text-muted-foreground">Account setup and basics</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col">
            <span className="text-lg font-medium">BMI & Health</span>
            <span className="text-sm text-muted-foreground">Understanding your metrics</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col">
            <span className="text-lg font-medium">Subscription</span>
            <span className="text-sm text-muted-foreground">Billing and plans</span>
          </Button>
        </div>

        {/* General Questions */}
        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
            <CardDescription>Basic information about FitLife Monitor</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is FitLife Monitor?</AccordionTrigger>
                <AccordionContent>
                  FitLife Monitor is a comprehensive health tracking platform that helps you monitor your BMI, get
                  personalized health recommendations, track your progress over time, and chat with an AI health
                  assistant for personalized advice.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is FitLife Monitor free to use?</AccordionTrigger>
                <AccordionContent>
                  FitLife Monitor offers both free and premium features. The basic BMI calculator and general health
                  information are available for free. Premium features, including personalized recommendations, progress
                  tracking, and the AI health assistant, require a subscription.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  To create an account, click on the "Sign Up" button in the top right corner of the page. You can sign
                  up using your email address or through Google or GitHub authentication. Follow the prompts to complete
                  your profile with basic information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my health data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All your health information is encrypted and stored
                  securely. We use industry-standard security measures to protect your data, and we never share your
                  personal information with third parties without your explicit consent. You can learn more in our
                  Privacy Policy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What devices can I use FitLife Monitor on?</AccordionTrigger>
                <AccordionContent>
                  FitLife Monitor is accessible on any device with a web browser, including desktops, laptops, tablets,
                  and smartphones. We also offer native mobile apps for iOS and Android devices for a more optimized
                  experience on mobile.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* BMI and Health Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>BMI and Health Tracking</CardTitle>
            <CardDescription>Questions about health metrics and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate is the BMI calculator?</AccordionTrigger>
                <AccordionContent>
                  Our BMI calculator uses the standard formula recognized by health organizations worldwide: weight (kg)
                  / height² (m). While BMI is a useful screening tool, it does have limitations. It doesn't distinguish
                  between muscle and fat, and may not be as accurate for athletes, elderly individuals, or pregnant
                  women. We recommend using BMI as one of several health indicators.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How often should I update my measurements?</AccordionTrigger>
                <AccordionContent>
                  For most people, updating measurements once a week or every two weeks is sufficient to track progress
                  effectively. Weighing yourself daily can lead to frustration due to normal weight fluctuations.
                  Consistency is key, so try to take measurements at the same time of day (preferably in the morning)
                  and under similar conditions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I track metrics other than BMI?</AccordionTrigger>
                <AccordionContent>
                  Yes, FitLife Monitor allows you to track various health metrics beyond BMI, including body
                  measurements (waist, chest, hips), activity levels, and custom goals. Premium users can also track
                  additional metrics like body fat percentage, muscle mass, and more detailed body composition data.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How are the health recommendations generated?</AccordionTrigger>
                <AccordionContent>
                  Our health recommendations are generated based on your BMI, activity level, goals, and other health
                  information you provide. We use evidence-based guidelines from reputable health organizations and
                  current scientific research. Our AI system personalizes these recommendations to your specific
                  situation. Remember that these recommendations are for educational purposes and not a substitute for
                  professional medical advice.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I export my health data?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can export your health data in CSV or PDF format from your profile settings. This makes it
                  easy to share information with healthcare providers or use in other health apps. We provide options to
                  export specific date ranges and select which metrics to include in your export.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* AI Health Assistant */}
        <Card>
          <CardHeader>
            <CardTitle>AI Health Assistant</CardTitle>
            <CardDescription>Questions about our AI chatbot</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What can the AI Health Assistant help with?</AccordionTrigger>
                <AccordionContent>
                  Our AI Health Assistant can provide personalized health advice, answer questions about nutrition and
                  exercise, explain your health metrics, suggest meal plans and workout routines based on your goals,
                  and offer general health information. It's designed to be a supportive companion on your health
                  journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is the AI Health Assistant a replacement for medical advice?</AccordionTrigger>
                <AccordionContent>
                  No, the AI Health Assistant is not a substitute for professional medical advice, diagnosis, or
                  treatment. While it provides evidence-based information, it should be used for educational purposes
                  only. Always consult with healthcare professionals for medical concerns or before making significant
                  changes to your health routine.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does the AI Health Assistant personalize its responses?</AccordionTrigger>
                <AccordionContent>
                  The AI Health Assistant uses your profile information, health data, and conversation history to
                  provide personalized responses. It considers factors like your BMI, activity level, goals, and
                  preferences to tailor its advice to your specific situation. The more you interact with it and update
                  your health information, the more personalized its responses become.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my conversation with the AI Health Assistant private?</AccordionTrigger>
                <AccordionContent>
                  Yes, your conversations with the AI Health Assistant are private and encrypted. We do not share the
                  content of your conversations with third parties. We may use anonymized data to improve the AI system,
                  but this never includes personally identifiable information. You can delete your conversation history
                  at any time from your account settings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Account and Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Account and Billing</CardTitle>
            <CardDescription>Questions about your account and subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I change my password?</AccordionTrigger>
                <AccordionContent>
                  To change your password, go to your Profile settings, select the "Security" tab, and click on "Change
                  Password." You'll need to enter your current password and then your new password twice to confirm. For
                  security reasons, we recommend using a strong, unique password.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I upgrade to a premium subscription?</AccordionTrigger>
                <AccordionContent>
                  To upgrade to a premium subscription, go to your Profile settings and select the "Subscription" tab.
                  You'll see the available subscription plans with their features and pricing. Select the plan that best
                  suits your needs and follow the prompts to complete your purchase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                <AccordionContent>
                  To cancel your subscription, go to your Profile settings, select the "Subscription" tab, and click on
                  "Cancel Subscription." Follow the prompts to complete the cancellation. Your premium features will
                  remain active until the end of your current billing period. You can reactivate your subscription at
                  any time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I get a refund?</AccordionTrigger>
                <AccordionContent>
                  Refund policies vary depending on your subscription type and location. Generally, we offer a 14-day
                  money-back guarantee for new subscriptions. If you're within this period and unhappy with the service,
                  please contact our support team. For other refund requests, please reach out to our customer support
                  team, and we'll review your case according to our refund policy and applicable laws.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                <AccordionContent>
                  To delete your account, go to your Profile settings, select the "Account" tab, and click on "Delete
                  Account" at the bottom of the page. You'll need to confirm your decision and may need to enter your
                  password. Please note that account deletion is permanent and will remove all your data from our
                  systems.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Still Have Questions?</h2>
              <p className="max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Button variant="secondary" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link href="/chatbot">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask AI Assistant
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

