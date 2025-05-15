import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">College Management System</span>
            </div>
            <div>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to College Management System
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              A comprehensive platform for managing all aspects of college operations.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed font-sans">
                Our college is committed to fostering a nurturing and inclusive learning environment that empowers
                students to achieve academic excellence and personal growth. We aim to provide quality education through
                innovative teaching methods, cutting-edge technology, and comprehensive support services. By cultivating
                critical thinking, creativity, and leadership skills, our goal is to prepare students to become
                responsible global citizens who contribute positively to society and succeed in their chosen careers.
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Link href="/login">
              <Button size="lg" className="px-8">
                Login to System
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; 2017 College Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
