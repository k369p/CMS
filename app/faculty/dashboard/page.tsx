"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  Users,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchFacultyData } from "@/lib/faculty"

export default function FacultyDashboard() {
  const [facultyData, setFacultyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFacultyData()
        setFacultyData(data)
      } catch (err) {
        setError("Failed to load faculty data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg">Loading faculty dashboard...</p>
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
  const faculty = {
    id: "FAC12345",
    name: "Dr. Sarah Williams",
    email: "sarah.williams@example.com",
    department: "Computer Science",
    position: "Associate Professor",
    joinDate: "2018-08-15",
    profileImage: "/placeholder.svg?height=100&width=100",
    courses: [
      {
        id: "CS301",
        name: "Data Structures",
        schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
        room: "CS Building, Room 105",
        students: 45,
        attendance: 92,
      },
      {
        id: "CS302",
        name: "Algorithms",
        schedule: "Tue, Thu 1:00 PM - 3:00 PM",
        room: "CS Building, Room 201",
        students: 38,
        attendance: 88,
      },
      {
        id: "CS401",
        name: "Advanced Programming",
        schedule: "Mon, Wed 3:30 PM - 5:00 PM",
        room: "CS Building, Room 110",
        students: 30,
        attendance: 95,
      },
    ],
    students: [
      { id: "ST1001", name: "Alex Johnson", email: "alex.j@example.com", course: "CS301", attendance: 95, grade: "A" },
      { id: "ST1002", name: "Emma Davis", email: "emma.d@example.com", course: "CS301", attendance: 88, grade: "B+" },
      {
        id: "ST1003",
        name: "Michael Brown",
        email: "michael.b@example.com",
        course: "CS301",
        attendance: 92,
        grade: "A-",
      },
      {
        id: "ST1004",
        name: "Sophia Wilson",
        email: "sophia.w@example.com",
        course: "CS302",
        attendance: 90,
        grade: "B",
      },
      {
        id: "ST1005",
        name: "James Taylor",
        email: "james.t@example.com",
        course: "CS302",
        attendance: 85,
        grade: "B-",
      },
      {
        id: "ST1006",
        name: "Olivia Martinez",
        email: "olivia.m@example.com",
        course: "CS401",
        attendance: 98,
        grade: "A+",
      },
      {
        id: "ST1007",
        name: "William Anderson",
        email: "william.a@example.com",
        course: "CS401",
        attendance: 93,
        grade: "A",
      },
    ],
    assignments: [
      {
        id: "A1001",
        course: "CS301",
        title: "Binary Tree Implementation",
        dueDate: "2023-10-15",
        status: "Active",
        submissions: 35,
        totalStudents: 45,
      },
      {
        id: "A1002",
        course: "CS302",
        title: "Sorting Algorithm Analysis",
        dueDate: "2023-10-20",
        status: "Active",
        submissions: 20,
        totalStudents: 38,
      },
      {
        id: "A1003",
        course: "CS301",
        title: "Linked List Problems",
        dueDate: "2023-10-05",
        status: "Completed",
        submissions: 42,
        totalStudents: 45,
      },
      {
        id: "A1004",
        course: "CS401",
        title: "Advanced OOP Project",
        dueDate: "2023-10-25",
        status: "Active",
        submissions: 15,
        totalStudents: 30,
      },
    ],
    exams: [
      {
        id: "E2001",
        course: "CS301",
        title: "Midterm Exam",
        date: "2023-10-18",
        time: "10:00 AM - 12:00 PM",
        location: "Hall A",
        status: "Scheduled",
      },
      {
        id: "E2002",
        course: "CS302",
        title: "Quiz 2",
        date: "2023-10-12",
        time: "2:00 PM - 3:00 PM",
        location: "Room 201",
        status: "Scheduled",
      },
      {
        id: "E2003",
        course: "CS401",
        title: "Practical Test",
        date: "2023-10-20",
        time: "3:30 PM - 5:30 PM",
        location: "Lab 3",
        status: "Scheduled",
      },
      {
        id: "E2004",
        course: "CS301",
        title: "Quiz 1",
        date: "2023-10-02",
        time: "10:00 AM - 11:00 AM",
        location: "Room 105",
        status: "Completed",
      },
    ],
    schedule: [
      {
        day: "Monday",
        slots: [
          { time: "10:00 AM - 11:30 AM", course: "CS301", room: "Room 105" },
          { time: "3:30 PM - 5:00 PM", course: "CS401", room: "Room 110" },
        ],
      },
      { day: "Tuesday", slots: [{ time: "1:00 PM - 3:00 PM", course: "CS302", room: "Room 201" }] },
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM - 11:30 AM", course: "CS301", room: "Room 105" },
          { time: "3:30 PM - 5:00 PM", course: "CS401", room: "Room 110" },
        ],
      },
      { day: "Thursday", slots: [{ time: "1:00 PM - 3:00 PM", course: "CS302", room: "Room 201" }] },
      {
        day: "Friday",
        slots: [
          { time: "10:00 AM - 11:30 AM", course: "CS301", room: "Room 105" },
          { time: "2:00 PM - 4:00 PM", course: "Office Hours", room: "Office 305" },
        ],
      },
    ],
    notifications: [
      {
        id: "N4001",
        date: "2023-10-08",
        title: "Department Meeting",
        message: "Reminder: Department meeting on October 10 at 2:00 PM in the Conference Room.",
      },
      {
        id: "N4002",
        date: "2023-10-07",
        title: "Grade Submission Deadline",
        message: "Please submit midterm grades by October 20.",
      },
      {
        id: "N4003",
        date: "2023-10-05",
        title: "New Teaching Resources",
        message: "New teaching resources are available in the faculty portal.",
      },
      {
        id: "N4004",
        date: "2023-10-03",
        title: "Research Symposium",
        message: "Annual Research Symposium will be held on November 15. Submit your papers by October 30.",
      },
    ],
  }

  // Filter students based on search query
  const filteredStudents = faculty.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
                        <Users className="mr-2 h-5 w-5" /> Students
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <FileText className="mr-2 h-5 w-5" /> Assignments
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Calendar className="mr-2 h-5 w-5" /> Exams
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Clock className="mr-2 h-5 w-5" /> Schedule
                      </Button>
                    </div>
                    <div className="mt-auto">
                      <Button variant="ghost" className="justify-start w-full">
                        <User className="mr-2 h-5 w-5" /> Profile
                      </Button>
                      <Button variant="ghost" className="justify-start text-red-500 w-full">
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
                <AvatarImage src={faculty.profileImage || "/placeholder.svg"} alt={faculty.name} />
                <AvatarFallback>
                  {faculty.name
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
        {/* Faculty Info */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={faculty.profileImage || "/placeholder.svg"} alt={faculty.name} />
                <AvatarFallback>
                  {faculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{faculty.name}</h1>
                <p className="text-gray-600">
                  {faculty.position} | {faculty.department}
                </p>
                <p className="text-gray-600">Faculty ID: {faculty.id}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-purple-50">
                    Courses: {faculty.courses.length}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50">
                    Students: {faculty.students.length}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Joined: {faculty.joinDate}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Courses</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Course
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {faculty.courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Schedule:</span>
                          <span className="text-sm text-right">{course.schedule}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Location:</span>
                          <span>{course.room}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Students:</span>
                          <span>{course.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Attendance:</span>
                          <span>{course.attendance}%</span>
                        </div>
                        <div className="pt-2 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Materials
                          </Button>
                          <Button size="sm" className="flex-1">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Students</CardTitle>
                      <CardDescription>Manage and view student information</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search students..."
                          className="pl-8 w-full md:w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Filter by course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          <SelectItem value="CS301">CS301</SelectItem>
                          <SelectItem value="CS302">CS302</SelectItem>
                          <SelectItem value="CS401">CS401</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.attendance}%</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Assignments</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Create Assignment
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faculty.assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.title}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                assignment.status === "Active"
                                  ? "bg-green-50"
                                  : assignment.status === "Completed"
                                    ? "bg-blue-50"
                                    : "bg-gray-50"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {assignment.submissions}/{assignment.totalStudents}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Exams & Assessments</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Schedule Exam
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faculty.exams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.course}</TableCell>
                          <TableCell>{exam.title}</TableCell>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>{exam.time}</TableCell>
                          <TableCell>{exam.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                exam.status === "Scheduled"
                                  ? "bg-yellow-50"
                                  : exam.status === "Completed"
                                    ? "bg-green-50"
                                    : "bg-gray-50"
                              }
                            >
                              {exam.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your teaching and office hours schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faculty.schedule.map((day) => (
                      <div key={day.day} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-lg mb-2">{day.day}</h3>
                        {day.slots.length > 0 ? (
                          <div className="space-y-2">
                            {day.slots.map((slot, index) => (
                              <div
                                key={index}
                                className="flex flex-col md:flex-row md:items-center p-3 bg-gray-50 rounded-md"
                              >
                                <div className="font-medium">{slot.time}</div>
                                <div className="md:ml-6">
                                  <span className="text-purple-600">{slot.course}</span>
                                  <span className="mx-2">•</span>
                                  <span className="text-gray-600">{slot.room}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No scheduled classes</p>
                        )}
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
