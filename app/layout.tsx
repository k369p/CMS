import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "College Management System",
  description: "A comprehensive platform for managing all aspects of college operations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <div
          className="fixed inset-0 bg-cover bg-center z-[-1] opacity-25"
          style={{ backgroundImage: "url(/images/college.png)" }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
