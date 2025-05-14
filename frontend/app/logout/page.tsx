"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  // In a real app, this would call your logout API endpoint
  const handleLogout = () => {
    // Simulate logout process
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Out</CardTitle>
            <CardDescription className="text-center">Are you sure you want to sign out?</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LogOut className="h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button onClick={handleLogout} className="w-full">
              Yes, Sign me out
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.back()}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

