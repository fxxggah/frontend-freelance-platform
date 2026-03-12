"use client"

import { useEffect, useState } from "react"
import { JobCard } from "@/components/job-card"
import { getAllJobs } from "@/lib/jobs"
import { getMyApplications } from "@/lib/applications"
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  Filter, 
  Trophy, 
  Loader2, 
  TrendingUp 
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function JobListPage() {
  const [jobs, setJobs] = useState([])
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([])
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function init() {
      try {
        const jobsData = await getAllJobs()
        setJobs(jobsData)

        const savedRole = localStorage.getItem("role")
        const userId = localStorage.getItem("userId")
        setRole(savedRole)

        if (savedRole === "FREELANCER" && userId) {
          const apps = await getMyApplications(Number(userId))
          const ids = apps.map((app: any) => app.jobId)
          setAppliedJobIds(ids)
        }
      } catch (error) {
        console.error("Erro ao carregar Mural:", error)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  // Filtro simples em tempo real
  const filteredJobs = jobs.filter((job: any) => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* --- HEADER SECTON --- */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Trophy className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Oportunidades Ativas</span>
            </div>
            <h1 className="text-5xl font-[950] text-slate-900 tracking-tight leading-none">
              Mural de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Projetos</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
              Explore as melhores oportunidades selecionadas para você. Conecte-se com clientes e impulsione sua carreira.
            </p>
          </div>

          {/* Stats Rápidos (Visual Only) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <TrendingUp size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jobs hoje</p>
                  <p className="text-xl font-black text-slate-900">+{jobs.length}</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="mt-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
            <Input 
              placeholder="Pesquisar nome da oportunidade..." 
              className="h-16 pl-14 pr-6 bg-white border-slate-100 rounded-2xl shadow-sm focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="h-16 px-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 font-bold text-slate-600">
            <Filter size={18} className="text-slate-400" />
            Filtros
          </button>
        </div>
      </header>

      {/* --- CONTEÚDO --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em]">Sincronizando Mural...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-32 bg-white border-2 border-dashed border-slate-100 rounded-[3rem] shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
            <Search size={48} />
          </div>
          <h3 className="text-2xl font-[950] text-slate-900">Nenhum job encontrado</h3>
          <p className="text-slate-500 mt-2 font-medium max-w-xs mx-auto">
            Tente ajustar seus filtros ou pesquisar por outros termos.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job: any) => (
            <div key={job.id} className="transition-all duration-500 hover:-translate-y-2">
              <JobCard
                jobId={job.id}
                title={job.title}
                employerName={job.employerName}
                budget={job.budget}
                role={role}
                isAlreadyApplied={appliedJobIds.includes(job.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* FOOTER DO MURAL */}
      <div className="mt-20 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Novas oportunidades todos os dias <span className="text-emerald-500">●</span> ClickJob
        </p>
      </div>
    </div>
  )
}