import API_URL, { getAuthHeaders } from "./api"

export async function applyToJob(jobId: number) {
  const freelancerId = localStorage.getItem("userId")

  const res = await fetch(
    `${API_URL}/applications?jobId=${jobId}&freelancerId=${freelancerId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  )

  if (!res.ok) throw new Error("Erro ao aplicar")

  return res.json()
}

export async function getMyApplications() {
  const freelancerId = localStorage.getItem("userId")

  const res = await fetch(
    `${API_URL}/applications/freelancer/${freelancerId}`,
    {
      headers: getAuthHeaders(),
    }
  )

  if (!res.ok) throw new Error("Erro ao buscar aplicações")

  return res.json()
}