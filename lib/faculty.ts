// Mock faculty data functions for demonstration purposes
// In a real application, these would make API calls to your backend

export async function fetchFacultyData() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock faculty data
  return {
    // This would normally come from your API
    // The actual data is hardcoded in the faculty dashboard component for now
  }
}
