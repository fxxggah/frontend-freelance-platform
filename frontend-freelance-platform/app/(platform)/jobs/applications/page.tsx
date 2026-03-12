"use client"

import { useEffect, useState } from "react"
import { getMyApplications } from "@/lib/applications"
import { Briefcase, Clock, CheckCircle2, XCircle, ChevronRight, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

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

  // Função para estilizar o status conforme o Enum do seu Backend
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: <CheckCircle2 size={16} />, label: "Aceito" }
      case "REFUSED":
        return { color: "text-red-600 bg-red-50 border-red-100", icon: <XCircle size={16} />, label: "Recusado" }
      default:
        return { color: "text-amber-600 bg-amber-50 border-amber-100", icon: <Clock size={16} />, label: "Pendente" }
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="mx-auto max-w-4xl">

        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Minhas Candidaturas</h1>
          <p className="text-slate-500 mt-2 text-lg">Acompanhe o status das suas propostas enviadas.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#00897b] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : applications.length === 0 ? (
          <Card className="p-16 text-center border-dashed border-2 bg-white rounded-[2rem]">
            <Briefcase className="text-slate-200 mx-auto mb-4" size={64} />
            <h3 className="text-xl font-bold text-slate-400">Você ainda não se candidatou.</h3>
            <Link href="/jobs" className="text-[#00897b] font-bold hover:underline mt-4 inline-block">
              Explorar vagas abertas
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6">
            {applications.map((app: any) => {
              const status = getStatusDetails(app.status)
              return (
                <Card key={app.id} className="group p-0 overflow-hidden rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <div className="flex flex-col sm:flex-row items-stretch">

                    {/* Indicador lateral colorido */}
                    <div className={`w-2 ${app.status === 'ACCEPTED' ? 'bg-emerald-500' : app.status === 'REFUSED' ? 'bg-red-500' : 'bg-amber-500'}`} />

                    <div className="flex-grow p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-[#00897b] transition-colors">
                          <Briefcase size={28} />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#00897b] transition-colors">
                            {app.jobTitle || `Projeto #${app.jobId}`}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                              {status.icon}
                              {status.label}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                              <Wallet size={14} />
                              {app.createdAt ? new Date(app.createdAt).toLocaleDateString('pt-BR') : 'Recent'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/jobs/all/${app.jobId}`}>
                          <button className="flex items-center gap-2 font-bold text-slate-600 hover:text-[#00897b] transition-colors bg-slate-50 hover:bg-emerald-50 px-5 py-3 rounded-xl">
                            Detalhes do Job <ChevronRight size={18} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}