"use client";

import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideHeaderAndFooter = pathname && (pathname.startsWith('/admin') || pathname.startsWith('/dashboard'));
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            {!hideHeaderAndFooter && <SiteHeader />}
            <main className="flex-1">{children}</main>
            {!hideHeaderAndFooter && <SiteFooter />}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

