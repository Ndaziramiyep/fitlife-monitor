import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center p-6">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Data Protection</h3>
            <p className="text-muted-foreground">Your health data is encrypted and stored securely</p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Privacy Controls</h3>
            <p className="text-muted-foreground">You control what data is collected and how it's used</p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <Eye className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Transparency</h3>
            <p className="text-muted-foreground">Clear information about our data practices</p>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Last Updated: March 17, 2023</p>
            <p>
              FitLife Monitor ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our website and mobile
              application (collectively, the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you
              have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree
              with our policies and practices, do not use our Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Personal Information</h3>
              <p className="text-muted-foreground">
                We may collect personal information that you voluntarily provide to us when you register for the
                Service, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, and contact information</li>
                <li>Account credentials (username and password)</li>
                <li>Profile information (age, gender, profile picture)</li>
                <li>Health information (height, weight, BMI, activity levels)</li>
                <li>Goals and preferences related to health and fitness</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Automatically Collected Information</h3>
              <p className="text-muted-foreground">
                When you access or use our Service, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Device information (device type, operating system, browser type)</li>
                <li>Usage data (how you interact with our Service)</li>
                <li>IP address and location information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Providing and improving the Service:</strong> To calculate your BMI, provide personalized health
                recommendations, and enhance your user experience.
              </li>
              <li>
                <strong>Personalization:</strong> To tailor content and features based on your preferences and health
                data.
              </li>
              <li>
                <strong>Communication:</strong> To respond to your inquiries, provide updates, and send notifications
                related to the Service.
              </li>
              <li>
                <strong>Analytics:</strong> To analyze usage patterns and improve our Service.
              </li>
              <li>
                <strong>Security:</strong> To protect our Service and users from fraud and unauthorized access.
              </li>
              <li>
                <strong>Legal compliance:</strong> To comply with applicable laws and regulations.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>With your consent:</strong> We may share your information when you have given us permission to
                do so.
              </li>
              <li>
                <strong>Service providers:</strong> We may share information with third-party vendors who provide
                services on our behalf, such as hosting, data analysis, and customer service.
              </li>
              <li>
                <strong>Business transfers:</strong> If we are involved in a merger, acquisition, or sale of assets,
                your information may be transferred as part of that transaction.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose your information if required by law, such as in
                response to a subpoena or court order.
              </li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from
              unauthorized access, disclosure, alteration, and destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Encryption of sensitive data</li>
              <li>Secure storage systems</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your personal information, we cannot guarantee its
              absolute security.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access:</strong> You can request access to the personal information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> You can request that we delete your personal information in certain
                circumstances.
              </li>
              <li>
                <strong>Restriction:</strong> You can request that we restrict the processing of your information.
              </li>
              <li>
                <strong>Data portability:</strong> You can request a copy of your data in a structured, commonly used,
                and machine-readable format.
              </li>
              <li>
                <strong>Objection:</strong> You can object to the processing of your personal information in certain
                circumstances.
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section
              below.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our Service is not directed to children under the age of 13. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe that your child has
              provided us with personal information, please contact us so that we can delete the information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
              at:
            </p>
            <div className="bg-muted p-4 rounded-md">
              <p>FitLife Monitor</p>
              <p>Email: privacy@fitlifemonitor.com</p>
              <p>Address: 123 Health Street, Tech City, TC 12345, United States</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

