import API_URL, { getAuthHeaders } from "./api"

export async function getAllJobs() {
  const res = await fetch(`${API_URL}/jobs`, {
    headers: getAuthHeaders(),
  })

  console.log("STATUS:", res.status)

  if (!res.ok) {
    const text = await res.text()
    console.log("ERRO BODY:", text)
    throw new Error(`Erro ao buscar jobs: ${res.status}`)
  }

  return res.json()
}

export async function createJob(
  title: string,
  description: string,
  budget: number
) {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/jobs?employerId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      budget,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.log("ERRO BODY:", text)
    throw new Error(`Erro ao criar job: ${res.status}`)
  }

  return res.json()
}