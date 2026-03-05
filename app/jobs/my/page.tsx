"use client"

import { useEffect, useState } from "react"
import { getMyJobs, deleteJob, updateJobStatus } from "@/lib/jobs"
import { Users, Trash2, CheckCircle, Plus } from "lucide-react" // Ícone de check
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Job {
  id: number
  title: string
  description: string
  budget: number
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED"
  applicationCount: number
}

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [])

  async function loadJobs() {
    try {
      const data = await getMyJobs()
      setJobs(data)
    } catch (error) {
      console.error("Erro ao carregar:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCompleteProcess(jobId: number) {
    if (!confirm("Deseja encerrar o processo deste job? Esta ação marcará como concluído.")) return

    try {
      // Agora enviando COMPLETED conforme seu novo Enum Java
      await updateJobStatus(jobId, "COMPLETED")
      
      setJobs((prev) => 
        prev.map((j) => (j.id === jobId ? { ...j, status: "COMPLETED" } : j))
      )
    } catch (error: any) {
      console.error("Erro ao encerrar:", error)
      alert("Falha ao encerrar processo no servidor.")
    }
  }

  async function handleDelete(jobId: number) {
    if (!confirm("Excluir permanentemente?")) return
    try {
      await deleteJob(jobId)
      setJobs((prev) => prev.filter((j) => j.id !== jobId))
    } catch (error) {
      alert("Erro ao excluir.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6">
      <div className="mx-auto max-w-5xl">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Meus Jobs</h1>
            <p className="text-gray-500">Gerencie suas vagas e finalize contratações</p>
          </div>
          <Link href="/jobs/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-sm">
              <Plus size={18} /> Novo Job
            </Button>
          </Link>
        </header>

        {loading ? (
          <div className="text-center py-10 text-gray-400">Carregando...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed rounded-2xl">
            <p className="text-gray-400">Você ainda não criou nenhum job.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white border p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 transition-all hover:border-emerald-100">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      job.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {job.status === 'OPEN' ? 'Aberto' : 'Encerrado'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-1 mb-2">{job.description}</p>
                  <p className="text-emerald-600 font-bold">R$ {Number(job.budget).toLocaleString('pt-BR')}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/jobs/${job.id}/applications`}>
                    <Button variant="outline" className="rounded-xl border-emerald-100 text-emerald-700 hover:bg-emerald-50">
                      <Users size={16} className="mr-2" /> Candidatos
                    </Button>
                  </Link>

                  {job.status === 'OPEN' && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleCompleteProcess(job.id)}
                      className="rounded-xl border-blue-100 text-blue-600 hover:bg-blue-50"
                    >
                      <CheckCircle size={16} className="mr-2" /> Encerrar processo
                    </Button>
                  )}

                  <Button 
                    variant="ghost" 
                    onClick={() => handleDelete(job.id)}
                    className="rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}