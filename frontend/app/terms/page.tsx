import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using FitLife Monitor
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center p-6">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Legal Agreement</h3>
            <p className="text-muted-foreground">These terms constitute a binding legal agreement</p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <Scale className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Your Rights</h3>
            <p className="text-muted-foreground">Understanding what you can and cannot do</p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Our Responsibilities</h3>
            <p className="text-muted-foreground">What we commit to providing</p>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Last Updated: March 17, 2023</p>
            <p>
              Welcome to FitLife Monitor. These Terms of Service ("Terms") govern your access to and use of the FitLife
              Monitor website and mobile application (collectively, the "Service"). Please read these Terms carefully
              before using our Service.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
              the Terms, you may not access the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use of the Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Eligibility</h3>
              <p className="text-muted-foreground">
                You must be at least 13 years old to use the Service. If you are under 18, you must have parental
                consent to use the Service. By using the Service, you represent and warrant that you meet these
                eligibility requirements.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Account Registration</h3>
              <p className="text-muted-foreground">
                To access certain features of the Service, you may be required to register for an account. You agree to
                provide accurate, current, and complete information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>
              <p className="text-muted-foreground">
                You are responsible for safeguarding your password and for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Acceptable Use</h3>
              <p className="text-muted-foreground">You agree not to use the Service:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>In any way that violates any applicable law or regulation</li>
                <li>
                  To impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                  entity
                </li>
                <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>To attempt to gain unauthorized access to the Service, other accounts, or computer systems</li>
                <li>To transmit any viruses, malware, or other harmful code</li>
                <li>To collect or track the personal information of others</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Information Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Not Medical Advice:</strong> The Service provides general health information and tools for
                educational purposes only. The information and recommendations provided by the Service are not intended
                to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your
                physician or other qualified health provider with any questions you may have regarding a medical
                condition.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Accuracy of Information:</strong> While we strive to provide accurate and up-to-date
                information, we make no representations or warranties of any kind, express or implied, about the
                completeness, accuracy, reliability, suitability, or availability of the information, products,
                services, or related graphics contained on the Service for any purpose.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Individual Variation:</strong> Health information and recommendations may not be suitable for
                all individuals. Factors such as age, existing health conditions, medications, and other individual
                characteristics can affect the appropriateness of health information and recommendations.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Service Content</h3>
              <p className="text-muted-foreground">
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of FitLife Monitor and its licensors. The Service is protected by copyright, trademark, and
                other laws of both the United States and foreign countries.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">User Content</h3>
              <p className="text-muted-foreground">
                By submitting, posting, or displaying content on or through the Service ("User Content"), you grant us a
                worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate,
                create derivative works from, distribute, and display such User Content in connection with providing and
                improving the Service.
              </p>
              <p className="text-muted-foreground">
                You represent and warrant that: (i) you own the User Content or have the right to use and grant us the
                rights and license as provided in these Terms, and (ii) the posting of your User Content on or through
                the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any
                other rights of any person.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Free and Paid Services</h3>
              <p className="text-muted-foreground">
                The Service may offer both free and paid features. By subscribing to a paid plan, you agree to pay the
                subscription fees as described at the time of purchase.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Billing</h3>
              <p className="text-muted-foreground">
                We use third-party payment processors to bill you through a payment account linked to your account. The
                processing of payments will be subject to the terms, conditions, and privacy policies of the payment
                processor in addition to these Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Automatic Renewal</h3>
              <p className="text-muted-foreground">
                Subscriptions automatically renew unless canceled at least 24 hours before the end of the current
                period. You can cancel your subscription at any time through your account settings. If you cancel, you
                will continue to have access to the paid features until the end of your current billing period.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Refunds</h3>
              <p className="text-muted-foreground">
                Refunds are provided in accordance with applicable laws. Please contact our customer support team if you
                believe you are entitled to a refund.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              To the maximum extent permitted by law, in no event shall FitLife Monitor, its directors, employees,
              partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential,
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p>
              In no event shall our total liability to you for all claims exceed the amount you have paid to us for the
              Service in the past twelve months.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
              account, you may simply discontinue using the Service or delete your account through the account settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you have any questions about these Terms, please contact us at:</p>
            <div className="bg-muted p-4 rounded-md">
              <p>FitLife Monitor</p>
              <p>Email: legal@fitlifemonitor.com</p>
              <p>Address: 123 Health Street, Tech City, TC 12345, United States</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

