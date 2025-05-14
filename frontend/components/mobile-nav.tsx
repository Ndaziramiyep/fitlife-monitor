"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" onClick={() => setOpen(false)} legacyBehavior>
            <div className="flex items-center">
              <span className="font-bold">FitLife Monitor</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-4 px-2 py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features" className="border-b-0">
              <AccordionTrigger className="py-2 px-4 hover:no-underline">Features</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <MobileLink href="/dashboard" setOpen={setOpen}>
                    Dashboard
                  </MobileLink>
                  <MobileLink href="/bmi-calculator" setOpen={setOpen}>
                    BMI Calculator
                  </MobileLink>
                  <MobileLink href="/recommendations" setOpen={setOpen}>
                    Recommendations
                  </MobileLink>
                  <MobileLink href="/progress" setOpen={setOpen}>
                    Progress Tracking
                  </MobileLink>
                  <MobileLink href="/chatbot" setOpen={setOpen}>
                    AI Health Assistant
                  </MobileLink>
                  <MobileLink href="/profile" setOpen={setOpen}>
                    Profile
                  </MobileLink>
                  <MobileLink href="/achievements" setOpen={setOpen}>
                    Achievements
                  </MobileLink>
                  <MobileLink href="/community" setOpen={setOpen}>
                    Community
                  </MobileLink>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="resources" className="border-b-0">
              <AccordionTrigger className="py-2 px-4 hover:no-underline">Resources</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <MobileLink href="/how-it-works" setOpen={setOpen}>
                    How It Works
                  </MobileLink>
                  <MobileLink href="/research" setOpen={setOpen}>
                    Research & Science
                  </MobileLink>
                  <MobileLink href="/blog" setOpen={setOpen}>
                    Health Articles
                  </MobileLink>
                  <MobileLink href="/faq" setOpen={setOpen}>
                    FAQ
                  </MobileLink>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-col space-y-3 px-4">
            <MobileLink href="/about" setOpen={setOpen}>
              About
            </MobileLink>
            <MobileLink href="/contact" setOpen={setOpen}>
              Contact
            </MobileLink>
          </div>
          <div className="flex flex-col space-y-2 px-4 pt-4">
            <Button asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                Log In
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  setOpen: (open: boolean) => void
}

function MobileLink({ href, setOpen, children, ...props }: MobileLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        isActive && "text-foreground font-medium",
      )}
      {...props}
      legacyBehavior>
      {children}
    </Link>
  );
}

