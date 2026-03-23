"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Briefcase, FilePlus, FolderOpen, ArrowRight, Sparkles, LayoutList, ClipboardList, FolderKanban } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Action = {
  label: string
  href: string
  icon: any
  description: string
  color: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedName = localStorage.getItem("name")
    const storedRole = localStorage.getItem("role")

    if (!token) {
      router.push("/login")
      return
    }

    setName(storedName || "")
    setRole(storedRole)
  }, [router])

  const allActions: Action[] = [
    {
      label: "Ver Jobs",
      href: "/jobs",
      icon: FolderOpen,
      description: "Explore oportunidades e conecte-se com novos clientes hoje.",
      color: "emerald"
    },
    {
      label: "Ver meus jobs",
      href: "/jobs/my",
      icon: LayoutList,
      description: "Gerencie suas vagas e acompanhe os candidatos.",
      color: "blue"
    },
    {
      label: "Minhas Aplicações",
      href: "/jobs/applications",
      icon: Briefcase,
      description: "Gerencie suas candidaturas e acompanhe seus processos.",
      color: "purple"
    },
  ]

  const filteredActions = allActions.filter((action) => {
    if (role === "EMPLOYER") return action.label !== "Minhas Aplicações"
    if (role === "FREELANCER") return action.label !== "Ver meus jobs"
    return false
  })

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* --- HEADER DE BOAS-VINDAS --- */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Home</span>
          </div>
          <h1 className="text-4xl font-[950] text-slate-900 tracking-tight leading-none">
            Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{name}</span>
          </h1>
          <p className="mt-3 text-slate-500 font-medium text-lg">
            O que você deseja fazer hoje?
          </p>
        </div>

        <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2 w-fit h-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Perfil: <span className="font-bold text-slate-900">{role}</span>
        </Badge>
      </div>

      {/* --- GRID DE AÇÕES --- */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {filteredActions.map((action) => (
          <Link key={action.href} href={action.href} className="group">
            <div className="relative h-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] hover:-translate-y-2 overflow-hidden">

              {/* Círculo de Luz de Fundo (Hover) */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full">
                {/* Ícone Container */}
                <div className="mb-6 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 transition-all duration-500 group-hover:bg-emerald-600 group-hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-200 group-hover:rotate-6">
                  <action.icon className="h-7 w-7 text-slate-400 transition-colors duration-500 group-hover:text-white" />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-emerald-600 transition-colors">
                    {action.label}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-[280px]">
                    {action.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-widest opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  Acessar agora
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-16 mb-10 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Central <span className="text-emerald-500">●</span> ClickJob
        </p>
      </div>
    </div>
  )
}