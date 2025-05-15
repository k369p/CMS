"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  UserCog,
  GraduationCap,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Settings,
  BarChart2,
  FileText,
  Building,
  ShieldCheck,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchAdminData } from "@/lib/admin"

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAdminData()
        setAdminData(data)
      } catch (err) {
        setError("Failed to load admin data")
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
          <p className="text-lg">Loading admin dashboard...</p>
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
  const admin = {
    id: "ADM12345",
    name: "John Anderson",
    email: "john.anderson@example.com",
    role: "System Administrator",
    joinDate: "2015-06-10",
    profileImage: "/placeholder.svg?height=100&width=100",
    stats: {
      totalStudents: 1250,
      totalFaculty: 85,
      totalCourses: 120,
      activeUsers: 950,
      pendingApprovals: 15,
      systemAlerts: 3,
    },
    users: [
      {
        id: "USR1001",
        name: "Alex Johnson",
        email: "alex.j@example.com",
        role: "Student",
        status: "Active",
        lastLogin: "2023-10-08",
      },
      {
        id: "USR1002",
        name: "Emma Davis",
        email: "emma.d@example.com",
        role: "Student",
        status: "Active",
        lastLogin: "2023-10-07",
      },
      {
        id: "USR1003",
        name: "Dr. Sarah Williams",
        email: "sarah.w@example.com",
        role: "Faculty",
        status: "Active",
        lastLogin: "2023-10-08",
      },
      {
        id: "USR1004",
        name: "Michael Brown",
        email: "michael.b@example.com",
        role: "Student",
        status: "Inactive",
        lastLogin: "2023-09-25",
      },
      {
        id: "USR1005",
        name: "Robert Wilson",
        email: "robert.w@example.com",
        role: "Registrar",
        status: "Active",
        lastLogin: "2023-10-08",
      },
      {
        id: "USR1006",
        name: "Jennifer Taylor",
        email: "jennifer.t@example.com",
        role: "Finance",
        status: "Active",
        lastLogin: "2023-10-07",
      },
      {
        id: "USR1007",
        name: "David Martinez",
        email: "david.m@example.com",
        role: "Parent",
        status: "Pending",
        lastLogin: "Never",
      },
    ],
    departments: [
      { id: "DEP1001", name: "Computer Science", head: "Dr. Sarah Williams", faculty: 12, students: 320, courses: 25 },
      {
        id: "DEP1002",
        name: "Business Administration",
        head: "Dr. Robert Johnson",
        faculty: 15,
        students: 280,
        courses: 22,
      },
      {
        id: "DEP1003",
        name: "Electrical Engineering",
        head: "Dr. Michael Clark",
        faculty: 10,
        students: 210,
        courses: 18,
      },
      { id: "DEP1004", name: "Mathematics", head: "Dr. Emily White", faculty: 8, students: 150, courses: 15 },
      { id: "DEP1005", name: "Physics", head: "Dr. James Brown", faculty: 7, students: 120, courses: 12 },
    ],
    pendingApprovals: [
      {
        id: "PA1001",
        name: "David Martinez",
        email: "david.m@example.com",
        type: "Account",
        role: "Parent",
        requestDate: "2023-10-07",
      },
      {
        id: "PA1002",
        name: "Lisa Thompson",
        email: "lisa.t@example.com",
        type: "Account",
        role: "Faculty",
        requestDate: "2023-10-06",
      },
      {
        id: "PA1003",
        name: "CS Department",
        requestedBy: "Dr. Sarah Williams",
        type: "Course",
        details: "Advanced AI",
        requestDate: "2023-10-05",
      },
      {
        id: "PA1004",
        name: "Finance Office",
        requestedBy: "Jennifer Taylor",
        type: "Budget",
        details: "Lab Equipment",
        requestDate: "2023-10-04",
      },
      {
        id: "PA1005",
        name: "Student Council",
        requestedBy: "Alex Johnson",
        type: "Event",
        details: "Tech Symposium",
        requestDate: "2023-10-03",
      },
    ],
    systemLogs: [
      {
        id: "SL1001",
        timestamp: "2023-10-08 14:30:25",
        user: "John Anderson",
        action: "User account updated",
        details: "Modified permissions for Robert Wilson",
      },
      {
        id: "SL1002",
        timestamp: "2023-10-08 12:15:10",
        user: "System",
        action: "Backup completed",
        details: "Daily database backup",
      },
      {
        id: "SL1003",
        timestamp: "2023-10-08 10:05:45",
        user: "Dr. Sarah Williams",
        action: "Grade update",
        details: "Updated grades for CS301",
      },
      {
        id: "SL1004",
        timestamp: "2023-10-07 16:45:30",
        user: "Jennifer Taylor",
        action: "Payment processed",
        details: "Processed tuition payment for ID: ST1005",
      },
      {
        id: "SL1005",
        timestamp: "2023-10-07 09:20:15",
        user: "Robert Wilson",
        action: "Course registration",
        details: "Registered 25 students for MATH301",
      },
    ],
    alerts: [
      {
        id: "AL1001",
        severity: "High",
        message: "Server load exceeding 85% capacity",
        timestamp: "2023-10-08 13:45:20",
      },
      {
        id: "AL1002",
        severity: "Medium",
        message: "15 user accounts pending approval",
        timestamp: "2023-10-08 09:30:15",
      },
      { id: "AL1003", severity: "Low", message: "System update available", timestamp: "2023-10-07 22:10:05" },
    ],
  }

  // Filter users based on search query
  const filteredUsers = admin.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
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
                        <BarChart2 className="mr-2 h-5 w-5" /> Dashboard
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Users className="mr-2 h-5 w-5" /> Users
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Building className="mr-2 h-5 w-5" /> Departments
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <ShieldCheck className="mr-2 h-5 w-5" /> Approvals
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <FileText className="mr-2 h-5 w-5" /> System Logs
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Settings className="mr-2 h-5 w-5" /> Settings
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
                <AvatarImage src={admin.profileImage || "/placeholder.svg"} alt={admin.name} />
                <AvatarFallback>
                  {admin.name
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
        {/* Admin Info */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={admin.profileImage || "/placeholder.svg"} alt={admin.name} />
                <AvatarFallback>
                  {admin.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{admin.name}</h1>
                <p className="text-gray-600">{admin.role}</p>
                <p className="text-gray-600">Admin ID: {admin.id}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-purple-50">
                    Access Level: Full
                  </Badge>
                  <Badge variant="outline" className="bg-green-50">
                    Status: Active
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Joined: {admin.joinDate}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-500">Students</p>
                <h3 className="text-2xl font-bold">{admin.stats.totalStudents}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <UserCog className="h-8 w-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-500">Faculty</p>
                <h3 className="text-2xl font-bold">{admin.stats.totalFaculty}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-500">Courses</p>
                <h3 className="text-2xl font-bold">{admin.stats.totalCourses}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <User className="h-8 w-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold">{admin.stats.activeUsers}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <FileText className="h-8 w-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-500">Approvals</p>
                <h3 className="text-2xl font-bold">{admin.stats.pendingApprovals}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Bell className="h-8 w-8 text-purple-600 mb-2" />
                <p className="text-sm text-gray-500">Alerts</p>
                <h3 className="text-2xl font-bold">{admin.stats.systemAlerts}</h3>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
              <TabsTrigger value="logs">System Logs</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>View and manage system users</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search users..."
                          className="pl-8 w-full md:w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="faculty">Faculty</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="registrar">Registrar</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Add User
                      </Button>
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
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.status === "Active"
                                  ? "bg-green-50"
                                  : user.status === "Inactive"
                                    ? "bg-gray-50"
                                    : "bg-yellow-50"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Departments</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Department
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {admin.departments.map((department) => (
                  <Card key={department.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{department.name}</CardTitle>
                      <CardDescription>Department Head: {department.head}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Faculty:</span>
                          <span>{department.faculty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Students:</span>
                          <span>{department.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Courses:</span>
                          <span>{department.courses}</span>
                        </div>
                        <div className="pt-2 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View
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

            {/* Approvals Tab */}
            <TabsContent value="approvals">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Review and manage pending approval requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admin.pendingApprovals.map((approval) => (
                        <TableRow key={approval.id}>
                          <TableCell>{approval.id}</TableCell>
                          <TableCell>{approval.name}</TableCell>
                          <TableCell>{approval.type}</TableCell>
                          <TableCell>
                            {approval.role || approval.details || "-"}
                            {approval.requestedBy && (
                              <div className="text-xs text-gray-500">By: {approval.requestedBy}</div>
                            )}
                          </TableCell>
                          <TableCell>{approval.requestDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Reject
                              </Button>
                              <Button size="sm">Approve</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Logs Tab */}
            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>System Logs</CardTitle>
                      <CardDescription>View system activity and audit logs</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Filter by action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Actions</SelectItem>
                          <SelectItem value="user">User Actions</SelectItem>
                          <SelectItem value="system">System Actions</SelectItem>
                          <SelectItem value="security">Security Events</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">Export Logs</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {admin.systemLogs.map((log) => (
                      <div key={log.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{log.action}</h3>
                            <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">{log.timestamp}</span>
                            <p className="text-sm text-gray-600">By: {log.user}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Critical system notifications requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {admin.alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start p-4 rounded-md border">
                          <div
                            className={`h-2 w-2 rounded-full mt-1.5 mr-3 ${
                              alert.severity === "High"
                                ? "bg-red-500"
                                : alert.severity === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{alert.message}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  alert.severity === "High"
                                    ? "bg-red-50"
                                    : alert.severity === "Medium"
                                      ? "bg-yellow-50"
                                      : "bg-blue-50"
                                }
                              >
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{alert.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
