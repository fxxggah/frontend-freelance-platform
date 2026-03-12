const API_URL = "http://localhost:8080/api"

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const text = await response.text()
    console.log(text)
    throw new Error("Erro no login")
  }

  return response.json()
}

export async function register(
  name: string,
  email: string,
  password: string,
  role: string
) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      userType: role,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    console.log(text)
    throw new Error("Erro no registro")
  }

  return response.json()
}