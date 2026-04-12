export default function medusaError(error: any): never {
  // Medusa JS SDK v2 throws FetchError (has .status, no .response/.request)
  if (typeof error.status === "number") {
    const message = error.message || error.statusText || "An error occurred"
    throw new Error(message.charAt(0).toUpperCase() + message.slice(1))
  }

  // Legacy axios-style error (kept for compatibility)
  if (error.response) {
    const message = error.response.data?.message || error.response.data
    throw new Error(message.charAt(0).toUpperCase() + message.slice(1) + ".")
  } else if (error.request) {
    throw new Error("No response received from server.")
  } else {
    throw new Error("Request failed: " + (error.message ?? "unknown error"))
  }
}
