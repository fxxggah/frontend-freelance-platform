"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getById } from "@/lib/jobs"
import { createApplication, getMyApplications } from "@/lib/applications"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, CheckCircle2, Send, Clock } from "lucide-react"

export default function JobDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const [job, setJob] = useState<any>(null)
    const [isApplied, setIsApplied] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        async function loadData() {
            // Iniciamos o loading sempre que o ID mudar
            setLoading(true)
            try {
                // 1. Carregamos os detalhes da vaga
                const jobData = await getById(Number(id))
                setJob(jobData)

                // 2. Verificamos as credenciais no localStorage
                const userId = localStorage.getItem("userId")
                const role = localStorage.getItem("role")

                // 3. Reforço na verificação de candidatura
                if (role === "FREELANCER" && userId) {
                    const apps = await getMyApplications(Number(userId))

                    // Comparamos garantindo que ambos são números (evita erro de string vs number)
                    const currentId = Number(id)
                    const alreadyApplied = apps.some((app: any) => {
                        // Verificamos jobId direto ou dentro do objeto job (para cobrir ambos os casos do DTO)
                        const appliedJobId = app.jobId || (app.job && app.job.id)
                        return Number(appliedJobId) === currentId
                    })

                    setIsApplied(alreadyApplied)
                }
            } catch (error) {
                console.error("Erro ao sincronizar dados:", error)
            } finally {
                // Só removemos o loading após TODAS as verificações terminarem
                setLoading(false)
            }
        }

        if (id) loadData()
    }, [id])

    async function handleApply() {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            alert("Você precisa estar logado como freelancer.")
            return
        }

        setIsSubmitting(true)
        try {
            await createApplication(Number(id), Number(userId))
            setIsApplied(true)
            alert("Candidatura enviada com sucesso!")
        } catch (error: any) {
            // Se o seu 'javinha' retornar erro de negócio (já inscrito), tratamos aqui também
            if (error.message.includes("já se candidatou")) {
                setIsApplied(true)
            } else {
                alert(error.message || "Erro ao se candidatar.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-emerald-700 font-black italic animate-pulse">Sincronizando com o servidor...</p>
            </div>
        </div>
    )

    if (!job) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <p className="text-gray-500 mb-4 font-bold">Oportunidade não encontrada.</p>
                <Button onClick={() => router.back()} variant="outline">Voltar ao Mural</Button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="mx-auto max-w-3xl">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-8 text-gray-500 hover:text-emerald-600 gap-2 p-0 hover:bg-transparent transition-colors"
                >
                    <ArrowLeft size={18} /> Voltar para o mural
                </Button>

                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/40">
                    <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10 pb-10 border-b border-gray-100">
                        <div className="space-y-4">
                            <Badge className="bg-emerald-50 text-emerald-700 border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                                {job.status === 'OPEN' ? 'Oportunidade Aberta' : 'Finalizado'}
                            </Badge>

                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                                {job.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <User size={18} className="text-emerald-600" />
                                    </div>
                                    <span className="font-bold text-gray-900">{job.employerName || "Contratante"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold">
                                    <Calendar size={18} className="text-gray-400" />
                                    <span>{new Date(job.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-600 text-white p-8 rounded-[2rem] w-full md:w-auto text-center shadow-2xl shadow-emerald-100 transition-transform hover:scale-105">
                            <p className="text-[10px] uppercase font-bold opacity-70 mb-1 tracking-[0.2em]">Investimento</p>
                            <p className="text-3xl font-black">R$ {Number(job.budget).toLocaleString('pt-BR')}</p>
                        </div>
                    </header>

                    <section className="mb-12">
                        <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-2">
                            <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                            Descrição do Projeto
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg font-medium italic">
                            "{job.description}"
                        </p>
                    </section>

                    {localStorage.getItem("role") === "FREELANCER" && (
                        <div className="pt-10 border-t border-gray-100">
                            {isApplied ? (
                                <div className="relative overflow-hidden bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 group animate-in fade-in zoom-in duration-500">
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200 animate-bounce-subtle">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-emerald-900 tracking-tight">Você já é candidato!</p>
                                            <p className="text-emerald-700/80 font-bold text-sm">Candidatura enviada com sucesso.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-100">
                                        <Clock size={16} className="text-emerald-500 animate-spin-slow" />
                                        <Badge className="bg-transparent text-emerald-600 border-none p-0 font-black text-[10px] uppercase tracking-tighter">
                                            Em Análise
                                        </Badge>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleApply}
                                    disabled={isSubmitting}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-10 rounded-[2rem] text-2xl font-black shadow-2xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.95] flex items-center gap-4 group"
                                >
                                    {isSubmitting ? "Processando..." : (
                                        <>
                                            Candidatar-se agora
                                            <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite ease-in-out;
                }
                .animate-spin-slow {
                    animation: spin 4s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}