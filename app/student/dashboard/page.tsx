"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  GraduationCap,
  BarChart2,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Download,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { fetchStudentData, handleAction } from "@/lib/student"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function StudentDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getCurrentUser()
        if (!user || user.role !== "student") {
          router.push("/login")
          return
        }

        const data = await fetchStudentData()
        setStudentData(data)
      } catch (err) {
        setError("Failed to load student data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleLogout = async () => {
    router.push("/login")
  }

  const handleDownloadAssignment = async (assignmentId: string, title: string) => {
    await handleAction("downloadAssignment", { assignmentId })
    toast({
      title: "Assignment Downloaded",
      description: `${title} has been downloaded.`,
    })
  }

  const handleSubmitAssignment = async (assignmentId: string, title: string) => {
    await handleAction("submitAssignment", { assignmentId })
    toast({
      title: "Assignment Submitted",
      description: `${title} has been submitted successfully.`,
    })
  }

  const handlePayFees = async () => {
    await handleAction("payFees", {})
    toast({
      title: "Payment Initiated",
      description: "You will be redirected to the payment gateway.",
    })
  }

  const handleDownloadReceipt = async (transactionId: string) => {
    await handleAction("downloadReceipt", { transactionId })
    toast({
      title: "Receipt Downloaded",
      description: "The receipt has been downloaded to your device.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg">Loading student dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  // Mock data for demonstration
  const student = {
    id: "ST12345",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    program: "Bachelor of Computer Science",
    semester: "Fall 2023",
    year: "3rd Year",
    gpa: 3.75,
    attendance: 92,
    profileImage: "/placeholder.svg?height=100&width=100",
    courses: [
      { id: "CS301", name: "Data Structures", instructor: "Dr. Smith", grade: "A", credits: 4, attendance: 95 },
      { id: "CS302", name: "Algorithms", instructor: "Dr. Johnson", grade: "A-", credits: 4, attendance: 90 },
      { id: "CS303", name: "Database Systems", instructor: "Prof. Williams", grade: "B+", credits: 3, attendance: 88 },
      { id: "CS304", name: "Web Development", instructor: "Prof. Davis", grade: "A", credits: 3, attendance: 96 },
      { id: "MATH301", name: "Discrete Mathematics", instructor: "Dr. Brown", grade: "B", credits: 3, attendance: 85 },
    ],
    assignments: [
      {
        id: "A1001",
        course: "CS301",
        title: "Binary Tree Implementation",
        dueDate: "2023-10-15",
        status: "Submitted",
        grade: "95/100",
      },
      {
        id: "A1002",
        course: "CS302",
        title: "Sorting Algorithm Analysis",
        dueDate: "2023-10-20",
        status: "Pending",
        grade: "-",
      },
      {
        id: "A1003",
        course: "CS303",
        title: "Database Design Project",
        dueDate: "2023-10-25",
        status: "Submitted",
        grade: "88/100",
      },
      {
        id: "A1004",
        course: "CS304",
        title: "React Application",
        dueDate: "2023-10-30",
        status: "In Progress",
        grade: "-",
      },
      {
        id: "A1005",
        course: "MATH301",
        title: "Graph Theory Problems",
        dueDate: "2023-11-05",
        status: "Not Started",
        grade: "-",
      },
    ],
    exams: [
      {
        id: "E2001",
        course: "CS301",
        title: "Midterm Exam",
        date: "2023-10-10",
        time: "10:00 AM - 12:00 PM",
        location: "Hall A",
      },
      {
        id: "E2002",
        course: "CS302",
        title: "Quiz 2",
        date: "2023-10-18",
        time: "2:00 PM - 3:00 PM",
        location: "Room 105",
      },
      {
        id: "E2003",
        course: "CS303",
        title: "Practical Test",
        date: "2023-10-22",
        time: "9:00 AM - 11:00 AM",
        location: "Lab 3",
      },
      {
        id: "E2004",
        course: "MATH301",
        title: "Final Exam",
        date: "2023-11-20",
        time: "1:00 PM - 4:00 PM",
        location: "Hall B",
      },
    ],
    financials: {
      tuitionFee: 12000,
      paidAmount: 8000,
      dueAmount: 4000,
      dueDate: "2023-10-30",
      transactions: [
        { id: "T3001", date: "2023-08-15", description: "Tuition Fee Payment", amount: 5000, type: "Credit" },
        { id: "T3002", date: "2023-09-10", description: "Library Fine", amount: 50, type: "Debit" },
        { id: "T3003", date: "2023-09-20", description: "Tuition Fee Payment", amount: 3000, type: "Credit" },
        { id: "T3004", date: "2023-10-05", description: "Lab Fee", amount: 200, type: "Debit" },
      ],
    },
    notifications: [
      {
        id: "N4001",
        date: "2023-10-08",
        title: "Assignment Deadline Extended",
        message: "The deadline for CS302 Sorting Algorithm Analysis has been extended to October 25.",
      },
      {
        id: "N4002",
        date: "2023-10-07",
        title: "New Course Material Available",
        message: "New lecture notes for Database Systems are now available on the course portal.",
      },
      {
        id: "N4003",
        date: "2023-10-05",
        title: "Tuition Fee Reminder",
        message: "Please clear your remaining tuition fee balance by October 30.",
      },
      {
        id: "N4004",
        date: "2023-10-03",
        title: "Campus Event",
        message: "Tech Symposium will be held on October 15 at the Main Auditorium.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                      <span className="ml-2 text-lg font-bold">CMS</span>
                      <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMobileNavOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start">
                        <BookOpen className="mr-2 h-5 w-5" /> Courses
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <FileText className="mr-2 h-5 w-5" /> Assignments
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Calendar className="mr-2 h-5 w-5" /> Exams
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <CreditCard className="mr-2 h-5 w-5" /> Financials
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <BarChart2 className="mr-2 h-5 w-5" /> Performance
                      </Button>
                    </div>
                    <div className="mt-auto">
                      <Button variant="ghost" className="justify-start w-full">
                        <User className="mr-2 h-5 w-5" /> Profile
                      </Button>
                      <Button variant="ghost" className="justify-start text-red-500 w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-5 w-5" /> Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 hidden md:block">College Management System</span>
                <span className="ml-2 text-xl font-bold text-gray-900 md:hidden">CMS</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <Avatar className="ml-4">
                <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Student Info */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <p className="text-gray-600">
                  {student.program} | {student.year}
                </p>
                <p className="text-gray-600">Student ID: {student.id}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-purple-50">
                    Semester: {student.semester}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50">
                    GPA: {student.gpa}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Attendance: {student.attendance}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {student.courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>
                        {course.id} | {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Grade:</span>
                          <span className="font-medium">{course.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Credits:</span>
                          <span>{course.credits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Attendance:</span>
                          <span>{course.attendance}%</span>
                        </div>
                        <div className="pt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="pt-2 flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              toast({
                                title: "Course Materials",
                                description: `Viewing materials for ${course.name}`,
                              })
                            }}
                          >
                            Materials
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              toast({
                                title: "Course Details",
                                description: `Viewing details for ${course.name}`,
                              })
                            }}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>View and manage your course assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.title}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                assignment.status === "Submitted"
                                  ? "bg-green-50"
                                  : assignment.status === "In Progress"
                                    ? "bg-blue-50"
                                    : assignment.status === "Pending"
                                      ? "bg-yellow-50"
                                      : "bg-gray-50"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{assignment.grade}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadAssignment(assignment.id, assignment.title)}
                              >
                                Download
                              </Button>
                              {(assignment.status === "Not Started" ||
                                assignment.status === "In Progress" ||
                                assignment.status === "Pending") && (
                                <Button
                                  size="sm"
                                  onClick={() => handleSubmitAssignment(assignment.id, assignment.title)}
                                >
                                  Submit
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Exams</CardTitle>
                  <CardDescription>Schedule of your upcoming exams and assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.exams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.course}</TableCell>
                          <TableCell>{exam.title}</TableCell>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>{exam.time}</TableCell>
                          <TableCell>{exam.location}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Exam Details",
                                  description: `Viewing details for ${exam.title}`,
                                })
                              }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financials Tab */}
            <TabsContent value="financials">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Tuition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${student.financials.tuitionFee.toLocaleString()}</div>
                    <p className="text-sm text-gray-500">For {student.semester}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Paid Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ${student.financials.paidAmount.toLocaleString()}
                    </div>
                    <Progress
                      value={(student.financials.paidAmount / student.financials.tuitionFee) * 100}
                      className="h-2 mt-2"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Due Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      ${student.financials.dueAmount.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500">Due by: {student.financials.dueDate}</p>
                    <Button className="mt-2 w-full" onClick={handlePayFees}>
                      Pay Now
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Recent financial transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.financials.transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={transaction.type === "Credit" ? "bg-green-50" : "bg-red-50"}
                            >
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadReceipt(transaction.id)}>
                              <Download className="h-4 w-4 mr-1" /> Receipt
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated with important announcements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.notifications.map((notification) => (
                      <div key={notification.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-sm text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            toast({
                              title: "Notification Details",
                              description: `Viewing details for ${notification.title}`,
                            })
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
