"use client"

import { useEffect, useState } from "react"
import { getMyApplications } from "@/lib/applications"
import { Briefcase, Clock, CheckCircle2, XCircle, ChevronRight, Calendar, Sparkles, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) return
      const data = await getMyApplications(Number(userId))
      setApplications(Array.isArray(data) ? data : (data?.content || []))
    } catch (error) {
      console.error("Erro ao carregar:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return { 
          color: "text-emerald-700 bg-emerald-50 border-emerald-200/50", 
          icon: <CheckCircle2 size={14} strokeWidth={3} />, 
          label: "Aprovado",
          dot: "bg-emerald-500"
        }
      case "REFUSED":
        return { 
          color: "text-rose-700 bg-rose-50 border-rose-200/50", 
          icon: <XCircle size={14} strokeWidth={3} />, 
          label: "Recusado",
          dot: "bg-rose-500"
        }
      default:
        return { 
          color: "text-amber-700 bg-amber-50 border-amber-200/50", 
          icon: <Clock size={14} strokeWidth={3} />, 
          label: "Em Análise",
          dot: "bg-amber-500"
        }
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- HEADER --- */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Candidaturas</span>
        </div>
        <h1 className="text-4xl font-[950] text-slate-900 tracking-tight leading-none">
          Minhas <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Propostas</span>
        </h1>
        <p className="text-slate-500 mt-4 text-lg font-medium">
          Acompanhe em tempo real o status das suas aplicações e próximos passos.
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sincronizando propostas...</p>
        </div>
      ) : applications.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 border-slate-200 bg-white/50 rounded-[3rem] shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhuma proposta enviada</h3>
          <p className="text-slate-500 mb-8 font-medium">As melhores oportunidades estão esperando por você.</p>
          <Link href="/jobs">
            <button className="bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all hover:shadow-xl hover:shadow-emerald-200 active:scale-95">
              Explorar Vagas Abertas
            </button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-5">
          {applications.map((app: any) => {
            const status = getStatusDetails(app.status)
            return (
              <Card key={app.id} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1">
                
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                  
                  {/* Ícone com Glow de Status */}
                  <div className={cn(
                    "w-20 h-20 rounded-[1.75rem] flex items-center justify-center border-4 border-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    app.status === 'ACCEPTED' ? "bg-emerald-50 text-emerald-600" : 
                    app.status === 'REFUSED' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                  )}>
                    <Briefcase size={32} strokeWidth={1.5} />
                  </div>

                  {/* Info do Job */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-xl font-[950] text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                        {app.jobTitle || `Projeto #${app.jobId}`}
                      </h3>
                      <Badge variant="outline" className={cn(
                        "w-fit mx-auto sm:mx-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                        status.color
                      )}>
                        {status.icon}
                        {status.label}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-300" />
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('pt-BR') : 'Recente'}
                      </div>
                    </div>
                  </div>

                  {/* Ação */}
                  <div className="w-full sm:w-auto">
                    <Link href={`/jobs/all/${app.jobId}`}>
                      <button className="w-full flex items-center justify-center gap-3 font-black text-slate-600 hover:text-emerald-600 transition-all bg-slate-50 hover:bg-emerald-50 px-7 py-4 rounded-[1.25rem] border border-transparent hover:border-emerald-100 shadow-sm group/btn">
                        Ver Detalhes
                        <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </Link>
                  </div>

                </div>

                {/* Barra de progresso visual de status na base do card */}
                <div className={cn(
                  "h-1.5 w-full absolute bottom-0 left-0 opacity-20",
                  status.dot
                )} />
              </Card>
            )
          })}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-16 mb-10 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Central de Candidaturas <span className="text-emerald-500">●</span> ClickJob
        </p>
      </div>
    </div>
  )
}