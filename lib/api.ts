const API_URL = "http://localhost:8080/api"

export function getAuthHeaders() {
  const token = localStorage.getItem("token")

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export default API_URL