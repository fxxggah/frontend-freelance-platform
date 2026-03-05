import API_URL, { getAuthHeaders } from "./api"

export async function createApplication(jobId: number, freelancerId: number) {
  const queryParams = new URLSearchParams({
    jobId: jobId.toString(),
    freelancerId: freelancerId.toString()
  });

  const res = await fetch(`${API_URL}/applications?${queryParams.toString()}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(errorMsg || "Erro ao processar candidatura.");
  }

  return res.json();
}

export async function getMyApplications(freelancerId: number) {
  if (!freelancerId || isNaN(freelancerId)) {
    console.warn("ID inválido fornecido para getMyApplications");
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/applications/freelancer/${freelancerId}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) return [];
    
    const data = await res.json();
    console.log("Dados vindos do Java:", data); // Debug essencial aqui
    return data;
  } catch (error) {
    console.error("Erro na requisição getMyApplications:", error);
    return [];
  }
}