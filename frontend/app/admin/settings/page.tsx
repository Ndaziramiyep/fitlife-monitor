"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Shield, Bell, Globe, Database, Zap } from "lucide-react"

export default function SystemSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [dataCollection, setDataCollection] = useState(true)
  const [debugMode, setDebugMode] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure and manage platform settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Platform Name</Label>
                <Input id="site-name" defaultValue="FitLife Monitor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Platform Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="A comprehensive health monitoring and fitness tracking platform"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Support Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@fitlifemonitor.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable the platform for maintenance</p>
                </div>
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save General Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure localization and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="default-language">
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
              <div className="space-y-2">
                <Label htmlFor="default-units">Default Unit System</Label>
                <Select defaultValue="metric">
                  <SelectTrigger id="default-units">
                    <SelectValue placeholder="Select unit system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lbs, ft/in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="yyyy-mm-dd">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Regional Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Send promotional content and updates</p>
                </div>
                <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-sender">Email Sender Name</Label>
                <Input id="email-sender" defaultValue="FitLife Monitor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-footer">Email Footer Text</Label>
                <Textarea id="email-footer" defaultValue="© 2023 FitLife Monitor. All rights reserved." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Customize system notification templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-template">Welcome Email</Label>
                <Textarea
                  id="welcome-template"
                  className="min-h-[100px]"
                  defaultValue="Welcome to FitLife Monitor! We're excited to have you join our community of health enthusiasts. Get started by setting up your profile and health goals."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-reset">Password Reset</Label>
                <Textarea
                  id="password-reset"
                  className="min-h-[100px]"
                  defaultValue="You've requested a password reset for your FitLife Monitor account. Click the link below to set a new password. If you didn't request this, please ignore this email."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Templates</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure platform security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (min 8 characters)</SelectItem>
                    <SelectItem value="medium">Medium (min 8 chars, 1 number, 1 uppercase)</SelectItem>
                    <SelectItem value="strong">Strong (min 10 chars, 1 number, 1 uppercase, 1 special)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">For admin accounts</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-collection">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">Collect anonymous usage data to improve the platform</p>
                </div>
                <Switch id="data-collection" checked={dataCollection} onCheckedChange={setDataCollection} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>Configure data retention policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-data-retention">User Data Retention</Label>
                <Select defaultValue="indefinite">
                  <SelectTrigger id="user-data-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year after account deletion</SelectItem>
                    <SelectItem value="2years">2 Years after account deletion</SelectItem>
                    <SelectItem value="5years">5 Years after account deletion</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-retention">System Log Retention</Label>
                <Select defaultValue="90days">
                  <SelectTrigger id="log-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">30 Days</SelectItem>
                    <SelectItem value="90days">90 Days</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Retention Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API settings and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-enabled">Enable API Access</Label>
                  <p className="text-sm text-muted-foreground">Allow external applications to access the API</p>
                </div>
                <Switch id="api-enabled" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
                <Input id="api-rate-limit" type="number" defaultValue="100" />
              </div>
              <div className="p-4 border rounded-md bg-muted/50">
                <div className="font-medium mb-2">API Key</div>
                <div className="flex items-center gap-2">
                  <Input value="••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This key provides access to the API. Keep it secure.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save API Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Configure external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Google Analytics</div>
                      <div className="text-sm text-muted-foreground">Track website traffic and user behavior</div>
                    </div>
                  </div>
                  <Switch id="google-analytics" defaultChecked />
                </div>
                <div className="pl-7 space-y-2">
                  <Label htmlFor="ga-tracking-id">Tracking ID</Label>
                  <Input id="ga-tracking-id" defaultValue="UA-XXXXXXXXX-X" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Email Service Provider</div>
                      <div className="text-sm text-muted-foreground">Send transactional and marketing emails</div>
                    </div>
                  </div>
                  <Switch id="email-provider" defaultChecked />
                </div>
                <div className="pl-7 space-y-2">
                  <Label htmlFor="email-api-key">API Key</Label>
                  <Input id="email-api-key" defaultValue="••••••••••••••••••••••••••••••" type="password" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Database Backup Service</div>
                      <div className="text-sm text-muted-foreground">Automated database backups</div>
                    </div>
                  </div>
                  <Switch id="backup-service" defaultChecked />
                </div>
                <div className="pl-7 space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

