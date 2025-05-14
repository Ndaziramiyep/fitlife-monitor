"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

type LogoutButtonProps = {
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
}

export function LogoutButton({ variant = "default", size = "default" }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/logout")
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} className="gap-2">
      <LogOut className="h-4 w-4" /> Sign Out
    </Button>
  )
}