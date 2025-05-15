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
  Bell,
  User,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getCurrentUser, getStudentByParentId, handleAction } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function ParentDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [parentData, setParentData] = useState<any>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getCurrentUser()
        if (!user || user.role !== "parent") {
          router.push("/login")
          return
        }

        setParentData(user)

        // Get child data
        const student = await getStudentByParentId(user.id)
        if (student) {
          setStudentData(student)
        } else {
          setError("Could not find student data for this parent")
        }
      } catch (err) {
        setError("Failed to load parent data")
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

  const handleContactTeacher = async (teacherName: string) => {
    await handleAction("contactTeacher", { teacherName })
    toast({
      title: "Message Sent",
      description: `Your message to ${teacherName} has been sent successfully.`,
    })
  }

  const handleRequestMeeting = async () => {
    await handleAction("requestMeeting", {})
    toast({
      title: "Meeting Requested",
      description: "Your meeting request has been submitted. You will be notified once it's scheduled.",
    })
  }

  const handlePayFees = async () => {
    await handleAction("payFees", {})
    toast({
      title: "Payment Initiated",
      description: "You will be redirected to the payment gateway.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg">Loading parent dashboard...</p>
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
    attendance: {
      overall: 92,
      monthly: [
        { month: "August", percentage: 95 },
        { month: "September", percentage: 90 },
        { month: "October", percentage: 88 },
      ],
      absences: [
        { date: "2023-09-05", course: "CS302", reason: "Sick" },
        { date: "2023-09-15", course: "MATH301", reason: "Family Emergency" },
        { date: "2023-10-02", course: "CS303", reason: "Not Provided" },
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
                        <BookOpen className="mr-2 h-5 w-5" /> Academic Progress
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <FileText className="mr-2 h-5 w-5" /> Assignments
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Calendar className="mr-2 h-5 w-5" /> Attendance
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <CreditCard className="mr-2 h-5 w-5" /> Financials
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <MessageSquare className="mr-2 h-5 w-5" /> Contact Teachers
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
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={parentData?.firstName} />
                <AvatarFallback>
                  {parentData?.firstName?.[0]}
                  {parentData?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Parent Info */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={parentData?.firstName} />
                  <AvatarFallback>
                    {parentData?.firstName?.[0]}
                    {parentData?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {parentData?.firstName} {parentData?.lastName}
                  </h1>
                  <p className="text-gray-600">Parent of {student.name}</p>
                  <p className="text-gray-600">Parent ID: {parentData?.id}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                <Button className="mb-2" onClick={handleRequestMeeting}>
                  <Calendar className="mr-2 h-4 w-4" /> Request Meeting
                </Button>
                <div className="text-sm text-gray-500">Last Login: Today, 9:45 AM</div>
              </div>
            </div>
          </div>

          {/* Student Overview */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Student Overview</h2>
            <div className="flex flex-col md:flex-row items-start">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{student.name}</h3>
                    <p className="text-gray-600">
                      {student.program} | {student.year}
                    </p>
                    <p className="text-gray-600">Student ID: {student.id}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-purple-50">
                      Semester: {student.semester}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50">
                      GPA: {student.gpa}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50">
                      Attendance: {student.attendance.overall}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert for Due Payments */}
          {student.financials.dueAmount > 0 && (
            <Alert className="mb-6 border-yellow-300 bg-yellow-50">
              <AlertTitle className="text-yellow-800">Payment Due</AlertTitle>
              <AlertDescription className="text-yellow-800">
                Your child has a pending payment of ${student.financials.dueAmount.toLocaleString()} due by{" "}
                {student.financials.dueDate}.{" "}
                <Button variant="outline" size="sm" className="ml-2" onClick={handlePayFees}>
                  Pay Now
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Dashboard Tabs */}
          <Tabs defaultValue="academic" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="academic">Academic Progress</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            {/* Academic Progress Tab */}
            <TabsContent value="academic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Courses & Grades</CardTitle>
                  <CardDescription>Overview of your child's academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.id}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                course.grade.startsWith("A")
                                  ? "bg-green-50"
                                  : course.grade.startsWith("B")
                                    ? "bg-blue-50"
                                    : "bg-yellow-50"
                              }
                            >
                              {course.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>{course.attendance}%</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleContactTeacher(course.instructor)}>
                              Contact Teacher
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>GPA Trend</CardTitle>
                    <CardDescription>Academic performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current GPA</span>
                          <span>{student.gpa}</span>
                        </div>
                        <Progress value={(student.gpa / 4) * 100} className="h-2" />
                      </div>
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">Previous Semesters</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Spring 2023</span>
                            <span>3.70</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Fall 2022</span>
                            <span>3.65</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Spring 2022</span>
                            <span>3.60</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Exams</CardTitle>
                    <CardDescription>Schedule of upcoming assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.exams.map((exam) => (
                        <div key={exam.id} className="border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{exam.title}</h4>
                              <p className="text-sm text-gray-500">{exam.course}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{exam.date}</p>
                              <p className="text-sm text-gray-500">{exam.time}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Location: {exam.location}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Your child's attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Overall Attendance</h3>
                      <div className="text-3xl font-bold text-purple-600">{student.attendance.overall}%</div>
                      <Progress value={student.attendance.overall} className="h-2 mt-2" />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Monthly Trend</h3>
                      <div className="space-y-2">
                        {student.attendance.monthly.map((month) => (
                          <div key={month.month}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{month.month}</span>
                              <span>{month.percentage}%</span>
                            </div>
                            <Progress value={month.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Absences</h3>
                      <div className="space-y-2">
                        {student.attendance.absences.map((absence, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{absence.date}</span> - {absence.course}
                            <div className="text-gray-500">Reason: {absence.reason}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-4">Course-wise Attendance</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Classes Attended</TableHead>
                        <TableHead>Total Classes</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="font-medium">{course.name}</div>
                            <div className="text-sm text-gray-500">{course.id}</div>
                          </TableCell>
                          <TableCell>{course.attendance}%</TableCell>
                          <TableCell>{Math.round((course.attendance / 100) * 30)}</TableCell>
                          <TableCell>30</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                course.attendance >= 90
                                  ? "bg-green-50"
                                  : course.attendance >= 75
                                    ? "bg-yellow-50"
                                    : "bg-red-50"
                              }
                            >
                              {course.attendance >= 90
                                ? "Excellent"
                                : course.attendance >= 75
                                  ? "Good"
                                  : "Needs Improvement"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Track your child's assignments and submissions</CardDescription>
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const course = student.courses.find((c) => c.id === assignment.course)
                                if (course) {
                                  handleContactTeacher(course.instructor)
                                }
                              }}
                            >
                              Discuss with Teacher
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
                        <TableHead className="text-right">Receipt</TableHead>
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Receipt Downloaded",
                                  description: `Receipt for ${transaction.description} has been downloaded.`,
                                })
                              }}
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Teachers</CardTitle>
                    <CardDescription>Reach out to your child's instructors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.courses.map((course) => (
                        <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <h4 className="font-medium">{course.instructor}</h4>
                            <p className="text-sm text-gray-500">
                              {course.name} ({course.id})
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Email Opened",
                                  description: `Compose email to ${course.instructor}`,
                                })
                              }}
                            >
                              <Mail className="h-4 w-4 mr-1" /> Email
                            </Button>
                            <Button size="sm" onClick={() => handleContactTeacher(course.instructor)}>
                              <MessageSquare className="h-4 w-4 mr-1" /> Message
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>School Contacts</CardTitle>
                    <CardDescription>Important contacts at the institution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">Academic Advisor</h4>
                        <p className="text-sm text-gray-500">Dr. Michael Roberts</p>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-1 text-gray-500" /> m.roberts@example.edu
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" /> (555) 123-4567
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">Department Office</h4>
                        <p className="text-sm text-gray-500">Computer Science Department</p>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-1 text-gray-500" /> cs.dept@example.edu
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" /> (555) 123-4568
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">Financial Aid Office</h4>
                        <p className="text-sm text-gray-500">Student Services Building</p>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-1 text-gray-500" /> financial.aid@example.edu
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" /> (555) 123-4569
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Important updates and announcements</CardDescription>
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
