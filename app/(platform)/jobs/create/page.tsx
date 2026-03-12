"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createJob } from "@/lib/jobs"
import {
  Briefcase,
  FileText,
  Wallet,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Loader2,
  LayoutGrid
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function CreateJobPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "EMPLOYER") {
      router.push("/dashboard")
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await createJob(title, description, Number(budget))
      router.push("/jobs")
    } catch (error) {
      console.error(error)
      alert("Erro ao criar job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

      {/* Botão Voltar */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Voltar
      </button>

      {/* --- HEADER --- */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg">
            <LayoutGrid className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Recrutamento</span>
        </div>
        <h1 className="text-4xl font-[950] text-slate-900 tracking-tight leading-none">
          Publicar Novo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Projeto</span>
        </h1>
        <p className="text-slate-500 mt-4 text-lg font-medium">
          Preencha os detalhes abaixo para encontrar o talento ideal.
        </p>
      </header>

      {/* --- FORMULÁRIO --- */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">

        {/* Glow Decorativo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />

        <form onSubmit={handleSubmit} className="relative space-y-8">

          {/* Título */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Título da vaga
            </Label>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="title"
                placeholder="Ex: Desenvolvedor Full Stack Spring/Next"
                className="pl-12 h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-slate-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Descrição da vaga
            </Label>
            <div className="relative group">
              <FileText className="absolute left-4 top-6 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
              <Textarea
                id="description"
                placeholder="Descreva as responsabilidades, requisitos e o que você espera do profissional..."
                className="pl-12 pt-5 min-h-[200px] bg-slate-50/50 border-slate-100 rounded-[2rem] focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-600 leading-relaxed resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Orçamento */}
          <div className="space-y-3">
            <Label htmlFor="budget" className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Orçamento Estimado
            </Label>
            <div className="relative group max-w-[300px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3 mr-3">
                <Wallet className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <span className="text-xs font-black text-slate-400">R$</span>
              </div>
              <Input
                id="budget"
                type="number"
                placeholder="0,00"
                className="pl-24 h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-black text-lg text-emerald-600"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium ml-1">
              * O valor será exibido para os freelancers como base de negociação.
            </p>
          </div>

          {/* Ações */}
          <div className="pt-6 flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-slate-900 hover:bg-emerald-600 text-white rounded-[1.5rem] font-black text-lg transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-emerald-200 group"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Publicar Oportunidade
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <button
              type="button"
              onClick={() => router.back()}
              className="text-slate-400 font-bold text-sm hover:text-rose-500 transition-colors py-2"
            >
              Descartar rascunho
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Publicar novo projeto <span className="text-emerald-500">●</span> ClickJob
        </p>
      </div>
    </div>
  )
}