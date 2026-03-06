"use client"

import { useEffect, useState, use } from "react"
import { getApplicationsByJob, updateApplicationStatus } from "@/lib/applications"
import { Check, X, User, ArrowLeft, ExternalLink, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Application {
  id: number
  freelancerId: number
  freelancerName: string // Certifique-se que o backend envia este campo
  status: "PENDING" | "ACCEPTED" | "REFUSED" | "CANCELLED"
  createdAt: string
}

export default function JobApplicantsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: jobId } = use(params)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (jobId) loadApplications()
  }, [jobId])

  async function loadApplications() {
    try {
      const data = await getApplicationsByJob(Number(jobId))
      setApplications(data)
    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusUpdate(applicationId: number, newStatus: "ACCEPTED" | "REFUSED") {
    try {
      await updateApplicationStatus(applicationId, newStatus)
      setApplications((prev) => 
        prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app))
      )
      toast({
        title: "Sucesso!",
        description: `Candidato ${newStatus === 'ACCEPTED' ? 'aceito' : 'recusado'} com sucesso.`,
      })
    } catch (error) {
      toast({ title: "Erro", description: "Falha na comunicação com o servidor.", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/jobs/my" className="group flex items-center text-slate-500 hover:text-emerald-600 transition-colors mb-8 gap-2 font-medium">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Voltar para Meus Jobs
        </Link>

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Candidatos</h1>
            <p className="text-slate-500 mt-2 text-lg">Analise os freelancers interessados na vaga</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border shadow-sm text-sm font-medium text-slate-600">
            {applications.length} {applications.length === 1 ? 'Candidatura' : 'Candidaturas'}
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium animate-pulse">Buscando perfis...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[32px]">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <User className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-500 font-medium">Aguardando as primeiras candidaturas.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {applications.map((app) => (
              <div key={app.id} className="group bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Info do Freelancer */}
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="relative">
                      <div className="h-16 w-16 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
                        <User size={32} />
                      </div>
                      {app.status === 'ACCEPTED' && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                          <BadgeCheck size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {app.freelancerName || `Freelancer #${app.freelancerId}`}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 
                          app.status === 'REFUSED' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {app.status === 'PENDING' ? 'Em análise' : app.status === 'ACCEPTED' ? 'Contratado' : 'Recusado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                    {/* Botão Ver Perfil */}
                    <Link href={`/profile/${app.freelancerId}`}>
                      <Button variant="ghost" className="rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 gap-2">
                        Ver Perfil <ExternalLink size={16} />
                      </Button>
                    </Link>

                    {app.status === "PENDING" && (
                      <>
                        <div className="w-[1px] h-8 bg-slate-100 hidden md:block" />
                        <Button 
                          onClick={() => handleStatusUpdate(app.id, "ACCEPTED")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 shadow-lg shadow-emerald-100 transition-all hover:-translate-y-0.5"
                        >
                          <Check size={18} className="mr-2" /> Aceitar
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(app.id, "REFUSED")}
                          className="text-red-500 border-red-50 hover:bg-red-50 rounded-xl px-4"
                        >
                          <X size={18} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}