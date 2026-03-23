const API_URL = "http://localhost:8080/api"

export function getAuthHeaders() {
  let token = localStorage.getItem("token");

  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.substring(1, token.length - 1);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token && token !== "null" && token !== "undefined") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export default API_URL;