"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap } from "lucide-react"
import { loginUser } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    })

    // Show sample credentials based on role
    if (value === "student") {
      setInfo("Sample credentials: alex.johnson@example.com / password123")
    } else if (value === "faculty") {
      setInfo("Sample credentials: sarah.williams@example.com / password123")
    } else if (value === "admin") {
      setInfo("Sample credentials: john.anderson@example.com / password123")
    } else if (value === "finance") {
      setInfo("Sample credentials: jennifer.taylor@example.com / password123")
    } else if (value === "parent") {
      setInfo("Sample credentials: robert.johnson@example.com / password123")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await loginUser(formData)
      if (result.success) {
        // Redirect based on role
        switch (formData.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "registrar":
            router.push("/registrar/dashboard")
            break
          case "faculty":
            router.push("/faculty/dashboard")
            break
          case "finance":
            router.push("/finance/dashboard")
            break
          case "student":
            router.push("/student/dashboard")
            break
          case "parent":
            router.push("/parent/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        setError(result.message || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to CMS</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {info && (
            <Alert className="mb-4 bg-blue-50">
              <AlertDescription>{info}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Login As</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="registrar">Registrar</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            <Link href="/forgot-password" className="text-purple-600 hover:text-purple-500">
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-center text-gray-500">
            Contact your administrator if you don't have access credentials.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
