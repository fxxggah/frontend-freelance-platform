"use client"

import { useEffect, useState } from "react"
import { getMyJobs, deleteJob, updateJobStatus } from "@/lib/jobs"
import { Users, Trash2, CheckCircle2, Plus, Briefcase, Wallet, Search, Sparkles, Loader2, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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

  useEffect(() => { loadJobs() }, [])

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
    if (!confirm("Deseja encerrar o processo deste job?")) return
    try {
      await updateJobStatus(jobId, "COMPLETED")
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "COMPLETED" } : j)))
    } catch (error) {
      console.error("Erro ao encerrar:", error)
    }
  }

  async function handleDelete(jobId: number) {
    if (!confirm("Excluir permanentemente este projeto?")) return
    try {
      await deleteJob(jobId)
      setJobs((prev) => prev.filter((j) => j.id !== jobId))
    } catch (error) {
      alert("Erro ao excluir.")
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Recrutador</span>
          </div>
          <h1 className="text-4xl font-[950] text-slate-900 tracking-tight leading-none">
            Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Projetos</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg font-medium">Gerencie suas vagas abertas e acompanhe os candidatos.</p>
        </div>

        <Link href="/jobs/create">
          <Button className="bg-slate-900 hover:bg-emerald-600 text-white font-black px-8 py-6 rounded-2xl transition-all shadow-xl hover:shadow-emerald-200 group active:scale-95">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Publicar Novo Job
          </Button>
        </Link>
      </header>

      {/* --- LISTAGEM --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Carregando seu painel...</p>
        </div>
      ) : jobs.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 border-slate-200 bg-white/50 rounded-[3rem] shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum projeto ainda</h3>
          <p className="text-slate-500 mb-8 font-medium">Comece publicando sua primeira oportunidade para freelancers.</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              
              <div className="flex flex-col lg:flex-row items-stretch min-h-[140px]">
                
                {/* Indicador de Status Lateral */}
                <div className={cn(
                  "w-2 transition-colors",
                  job.status === 'OPEN' ? "bg-emerald-500" : "bg-slate-300"
                )} />

                <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  
                  {/* Info Principal */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-[950] text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                        {job.title}
                      </h3>
                      <Badge className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border-none",
                        job.status === 'OPEN' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                      )}>
                        {job.status === 'OPEN' ? 'Ativo' : 'Finalizado'}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                        <Wallet size={18} className="text-emerald-400" />
                        R$ {Number(job.budget).toLocaleString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        <Users size={16} className="text-slate-300" />
                        {job.applicationCount || 0} Candidatos
                      </div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                    <Link href={`/jobs/my/applicants/${job.id}`}>
                      <Button className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-black px-6 py-6 rounded-2xl transition-all border-none gap-2">
                        <Users size={18} />
                        Ver Candidatos
                      </Button>
                    </Link>

                    {job.status === 'OPEN' && (
                      <Button 
                        variant="outline"
                        onClick={() => handleCompleteProcess(job.id)}
                        className="border-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white font-black px-6 py-6 rounded-2xl transition-all gap-2"
                      >
                        <CheckCircle2 size={18} />
                        Encerrar
                      </Button>
                    )}

                    <Button 
                      variant="ghost" 
                      onClick={() => handleDelete(job.id)}
                      className="w-14 h-14 rounded-2xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-20 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Painel de Controle do Empregador <span className="text-emerald-500">●</span> ClickJob
        </p>
      </div>
    </div>
  )
}