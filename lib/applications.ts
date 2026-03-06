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
  if (!freelancerId || isNaN(freelancerId)) return [];
  try {
    const res = await fetch(`${API_URL}/applications/freelancer/${freelancerId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data?.content || []);
  } catch (error) {
    return [];
  }
}

export async function getApplicationsByJob(jobId: number) {
  try {
    const res = await fetch(`${API_URL}/applications/job/${jobId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) return [];
    const data = await res.json();
    //  Garante que pegamos a lista correta do DTO ou Page
    return Array.isArray(data) ? data : (data?.content || []);
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    return [];
  }
}

export async function updateApplicationStatus(applicationId: number, status: 'ACCEPTED' | 'REFUSED') {
  // [cite: 28, 31] Endpoint PATCH /api/applications/{id}/status?status=...
  const res = await fetch(`${API_URL}/applications/${applicationId}/status?status=${status}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Erro ao atualizar status");
  return res.json();
}