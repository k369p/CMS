export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Loading parent dashboard...</p>
      </div>
    </div>
  )
}
