"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calculator,
  CreditCard,
  DollarSign,
  FileText,
  GraduationCap,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  BarChart2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchFinanceData } from "@/lib/finance"

export default function FinanceDashboard() {
  const [financeData, setFinanceData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFinanceData()
        setFinanceData(data)
      } catch (err) {
        setError("Failed to load finance data")
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
          <p className="text-lg">Loading finance dashboard...</p>
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
  const finance = {
    id: "FIN12345",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    role: "Finance Officer",
    joinDate: "2019-03-20",
    profileImage: "/placeholder.svg?height=100&width=100",
    stats: {
      totalRevenue: 1250000,
      pendingPayments: 85000,
      scholarships: 120000,
      expenses: 950000,
      pendingInvoices: 15,
      recentTransactions: 45,
    },
    feeStructure: [
      {
        id: "FS1001",
        program: "Bachelor of Computer Science",
        semester: "Fall 2023",
        tuitionFee: 12000,
        labFee: 1500,
        libraryFee: 500,
        totalFee: 14000,
      },
      {
        id: "FS1002",
        program: "Bachelor of Business Administration",
        semester: "Fall 2023",
        tuitionFee: 10000,
        labFee: 800,
        libraryFee: 500,
        totalFee: 11300,
      },
      {
        id: "FS1003",
        program: "Bachelor of Electrical Engineering",
        semester: "Fall 2023",
        tuitionFee: 13000,
        labFee: 2000,
        libraryFee: 500,
        totalFee: 15500,
      },
      {
        id: "FS1004",
        program: "Master of Computer Science",
        semester: "Fall 2023",
        tuitionFee: 15000,
        labFee: 1800,
        libraryFee: 700,
        totalFee: 17500,
      },
      {
        id: "FS1005",
        program: "Master of Business Administration",
        semester: "Fall 2023",
        tuitionFee: 16000,
        labFee: 1000,
        libraryFee: 700,
        totalFee: 17700,
      },
    ],
    payments: [
      {
        id: "PMT1001",
        studentId: "ST1001",
        studentName: "Alex Johnson",
        amount: 7000,
        date: "2023-09-15",
        method: "Credit Card",
        status: "Completed",
      },
      {
        id: "PMT1002",
        studentId: "ST1002",
        studentName: "Emma Davis",
        amount: 5000,
        date: "2023-09-18",
        method: "Bank Transfer",
        status: "Completed",
      },
      {
        id: "PMT1003",
        studentId: "ST1003",
        studentName: "Michael Brown",
        amount: 7500,
        date: "2023-09-20",
        method: "Online Payment",
        status: "Completed",
      },
      {
        id: "PMT1004",
        studentId: "ST1004",
        studentName: "Sophia Wilson",
        amount: 6000,
        date: "2023-09-25",
        method: "Credit Card",
        status: "Pending",
      },
      {
        id: "PMT1005",
        studentId: "ST1005",
        studentName: "James Taylor",
        amount: 8000,
        date: "2023-09-28",
        method: "Bank Transfer",
        status: "Pending",
      },
    ],
    scholarships: [
      {
        id: "SCH1001",
        name: "Merit Scholarship",
        recipients: 15,
        totalAmount: 75000,
        criteria: "GPA above 3.8",
        status: "Active",
      },
      {
        id: "SCH1002",
        name: "Sports Excellence",
        recipients: 8,
        totalAmount: 32000,
        criteria: "Outstanding sports achievement",
        status: "Active",
      },
      {
        id: "SCH1003",
        name: "Financial Need",
        recipients: 25,
        totalAmount: 100000,
        criteria: "Demonstrated financial need",
        status: "Active",
      },
      {
        id: "SCH1004",
        name: "Research Grant",
        recipients: 5,
        totalAmount: 25000,
        criteria: "Research proposal approval",
        status: "Active",
      },
      {
        id: "SCH1005",
        name: "International Student",
        recipients: 10,
        totalAmount: 50000,
        criteria: "International students with high academic standing",
        status: "Active",
      },
    ],
    expenses: [
      {
        id: "EXP1001",
        category: "Faculty Salaries",
        amount: 450000,
        date: "2023-09-30",
        approvedBy: "John Anderson",
        status: "Processed",
      },
      {
        id: "EXP1002",
        category: "Lab Equipment",
        amount: 85000,
        date: "2023-09-15",
        approvedBy: "John Anderson",
        status: "Processed",
      },
      {
        id: "EXP1003",
        category: "Library Resources",
        amount: 35000,
        date: "2023-09-20",
        approvedBy: "John Anderson",
        status: "Processed",
      },
      {
        id: "EXP1004",
        category: "Campus Maintenance",
        amount: 65000,
        date: "2023-09-25",
        approvedBy: "John Anderson",
        status: "Pending",
      },
      {
        id: "EXP1005",
        category: "IT Infrastructure",
        amount: 120000,
        date: "2023-09-28",
        approvedBy: "John Anderson",
        status: "Pending",
      },
    ],
    pendingInvoices: [
      {
        id: "INV1001",
        studentId: "ST1006",
        studentName: "Olivia Martinez",
        amount: 7000,
        dueDate: "2023-10-15",
        status: "Pending",
      },
      {
        id: "INV1002",
        studentId: "ST1007",
        studentName: "William Anderson",
        amount: 8500,
        dueDate: "2023-10-15",
        status: "Pending",
      },
      {
        id: "INV1003",
        studentId: "ST1008",
        studentName: "Ava Thomas",
        amount: 6500,
        dueDate: "2023-10-20",
        status: "Pending",
      },
      {
        id: "INV1004",
        studentId: "ST1009",
        studentName: "Noah Garcia",
        amount: 7500,
        dueDate: "2023-10-20",
        status: "Pending",
      },
      {
        id: "INV1005",
        studentId: "ST1010",
        studentName: "Isabella Rodriguez",
        amount: 9000,
        dueDate: "2023-10-25",
        status: "Pending",
      },
    ],
    recentTransactions: [
      { id: "TRX1001", type: "Income", description: "Tuition Payment - ST1001", amount: 7000, date: "2023-09-15" },
      { id: "TRX1002", type: "Expense", description: "Faculty Salary Payment", amount: 45000, date: "2023-09-15" },
      { id: "TRX1003", type: "Income", description: "Tuition Payment - ST1002", amount: 5000, date: "2023-09-18" },
      { id: "TRX1004", type: "Expense", description: "Lab Equipment Purchase", amount: 12000, date: "2023-09-18" },
      { id: "TRX1005", type: "Income", description: "Tuition Payment - ST1003", amount: 7500, date: "2023-09-20" },
    ],
  }

  // Filter payments based on search query
  const filteredPayments = finance.payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase()),
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
                        <Calculator className="mr-2 h-5 w-5" /> Fee Structure
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <CreditCard className="mr-2 h-5 w-5" /> Payments
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <DollarSign className="mr-2 h-5 w-5" /> Scholarships
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <FileText className="mr-2 h-5 w-5" /> Expenses
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Calendar className="mr-2 h-5 w-5" /> Reports
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
                <AvatarImage src={finance.profileImage || "/placeholder.svg"} alt={finance.name} />
                <AvatarFallback>
                  {finance.name
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
        {/* Finance Officer Info */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={finance.profileImage || "/placeholder.svg"} alt={finance.name} />
                <AvatarFallback>
                  {finance.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{finance.name}</h1>
                <p className="text-gray-600">{finance.role}</p>
                <p className="text-gray-600">Finance ID: {finance.id}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-purple-50">
                    Department: Finance
                  </Badge>
                  <Badge variant="outline" className="bg-green-50">
                    Status: Active
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Joined: {finance.joinDate}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold">${finance.stats.totalRevenue.toLocaleString()}</h3>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 12% from last semester
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Pending Payments</p>
                    <h3 className="text-2xl font-bold">${finance.stats.pendingPayments.toLocaleString()}</h3>
                    <p className="text-sm text-yellow-600 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> 5% from last month
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <h3 className="text-2xl font-bold">${finance.stats.expenses.toLocaleString()}</h3>
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <ArrowDownRight className="h-4 w-4 mr-1" /> 8% from last semester
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Calculator className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="payments" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="feeStructure">Fee Structure</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Payment Management</CardTitle>
                      <CardDescription>View and manage student payments</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search payments..."
                          className="pl-8 w-full md:w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Record Payment
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-sm text-gray-500">{payment.studentId}</div>
                            </div>
                          </TableCell>
                          <TableCell>${payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                payment.status === "Completed"
                                  ? "bg-green-50"
                                  : payment.status === "Pending"
                                    ? "bg-yellow-50"
                                    : "bg-red-50"
                              }
                            >
                              {payment.status}
                            </Badge>
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

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Overview of recent financial transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {finance.recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center p-4 rounded-md border">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                              transaction.type === "Income" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "Income" ? (
                              <ArrowUpRight
                                className={`h-5 w-5 ${
                                  transaction.type === "Income" ? "text-green-600" : "text-red-600"
                                }`}
                              />
                            ) : (
                              <ArrowDownRight
                                className={`h-5 w-5 ${
                                  transaction.type === "Income" ? "text-green-600" : "text-red-600"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{transaction.description}</h3>
                              <span
                                className={
                                  transaction.type === "Income"
                                    ? "text-green-600 font-medium"
                                    : "text-red-600 font-medium"
                                }
                              >
                                {transaction.type === "Income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{transaction.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fee Structure Tab */}
            <TabsContent value="feeStructure">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Fee Structure</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Fee Structure
                  </Button>
                </div>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Tuition Fee</TableHead>
                        <TableHead>Lab Fee</TableHead>
                        <TableHead>Library Fee</TableHead>
                        <TableHead>Total Fee</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {finance.feeStructure.map((fee) => (
                        <TableRow key={fee.id}>
                          <TableCell>{fee.id}</TableCell>
                          <TableCell>{fee.program}</TableCell>
                          <TableCell>{fee.semester}</TableCell>
                          <TableCell>${fee.tuitionFee.toLocaleString()}</TableCell>
                          <TableCell>${fee.labFee.toLocaleString()}</TableCell>
                          <TableCell>${fee.libraryFee.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">${fee.totalFee.toLocaleString()}</TableCell>
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

            {/* Scholarships Tab */}
            <TabsContent value="scholarships">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Scholarships & Financial Aid</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Scholarship
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {finance.scholarships.map((scholarship) => (
                  <Card key={scholarship.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                      <CardDescription>ID: {scholarship.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Recipients:</span>
                          <span>{scholarship.recipients}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Total Amount:</span>
                          <span>${scholarship.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Criteria:</span>
                          <span className="text-right">{scholarship.criteria}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          <Badge
                            variant="outline"
                            className={scholarship.status === "Active" ? "bg-green-50" : "bg-gray-50"}
                          >
                            {scholarship.status}
                          </Badge>
                        </div>
                        <div className="pt-2 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Recipients
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

            {/* Expenses Tab */}
            <TabsContent value="expenses">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Expense Management</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Record Expense
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Approved By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {finance.expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.id}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>${expense.amount.toLocaleString()}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>{expense.approvedBy}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                expense.status === "Processed"
                                  ? "bg-green-50"
                                  : expense.status === "Pending"
                                    ? "bg-yellow-50"
                                    : "bg-red-50"
                              }
                            >
                              {expense.status}
                            </Badge>
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

            {/* Invoices Tab */}
            <TabsContent value="invoices">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pending Invoices</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Create Invoice
                  </Button>
                </div>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {finance.pendingInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{invoice.studentName}</div>
                              <div className="text-sm text-gray-500">{invoice.studentId}</div>
                            </div>
                          </TableCell>
                          <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                invoice.status === "Paid"
                                  ? "bg-green-50"
                                  : invoice.status === "Pending"
                                    ? "bg-yellow-50"
                                    : "bg-red-50"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Send
                              </Button>
                              <Button size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
