// Mock authentication functions for demonstration purposes
// In a real application, these would make API calls to your backend

interface LoginData {
  email: string
  password: string
  role: string
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: string
}

interface AuthResult {
  success: boolean
  message?: string
  user?: any
}

// Mock user database
const users = [
  {
    id: "ST12345",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    password: "password123",
    role: "student",
    parentId: "PAR12345",
  },
  {
    id: "FAC12345",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    password: "password123",
    role: "faculty",
  },
  {
    id: "ADM12345",
    firstName: "John",
    lastName: "Anderson",
    email: "john.anderson@example.com",
    password: "password123",
    role: "admin",
  },
  {
    id: "FIN12345",
    firstName: "Jennifer",
    lastName: "Taylor",
    email: "jennifer.taylor@example.com",
    password: "password123",
    role: "finance",
  },
  {
    id: "PAR12345",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    password: "password123",
    role: "parent",
    childId: "ST12345",
  },
]

// Client-side storage for current user
let currentUser: any = null

export async function loginUser(data: LoginData): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find user by email
  const user = users.find((u) => u.email === data.email)

  // Check if user exists and password matches
  if (user && user.password === data.password && user.role === data.role) {
    // In a real app, you would set cookies, store tokens, etc.
    currentUser = user

    // Store in localStorage if available (client-side only)
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }

    return {
      success: true,
      user,
    }
  }

  return {
    success: false,
    message: "Invalid email, password, or role. Please try again.",
  }
}

export async function registerUser(data: RegisterData): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user already exists
  const existingUser = users.find((u) => u.email === data.email)
  if (existingUser) {
    return {
      success: false,
      message: "Email already in use. Please use a different email.",
    }
  }

  // Create a new user (in a real app, you would hash the password)
  const newUser = {
    id: `USR${Math.floor(Math.random() * 100000)}`, // Mock ID generation
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    role: data.role,
  }

  users.push(newUser)

  return {
    success: true,
    message: "Registration successful. Please login.",
  }
}

export async function logoutUser(): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Clear current user
  currentUser = null

  // Clear from localStorage if available (client-side only)
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

export async function getCurrentUser(): Promise<any | null> {
  // If we already have the current user in memory, return it
  if (currentUser) {
    return currentUser
  }

  // Otherwise try to get from localStorage if available (client-side only)
  if (typeof window !== "undefined") {
    const userJson = localStorage.getItem("currentUser")
    if (userJson) {
      currentUser = JSON.parse(userJson)
      return currentUser
    }
  }

  return null
}

export async function getStudentByParentId(parentId: string): Promise<any | null> {
  // Find the parent
  const parent = users.find((u) => u.id === parentId)
  if (!parent || !parent.childId) return null

  // Find the student
  return users.find((u) => u.id === parent.childId) || null
}

// Mock action handlers for buttons
export async function handleAction(action: string, data: any): Promise<{ success: boolean; message: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log(`Action: ${action}`, data)

  // Return success for all actions in this mock implementation
  return {
    success: true,
    message: `${action} action completed successfully`,
  }
}
