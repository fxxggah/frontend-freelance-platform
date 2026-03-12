"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createJob } from "@/lib/jobs"

export default function CreateJobPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "EMPLOYER") {
      router.push("/dashboard")
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await createJob(title, description, Number(budget))
      router.push("/jobs")
    } catch (error) {
      console.error(error)
      alert("Erro ao criar job")
    }
  }

  return (
    // Removido o items-center e adicionado pt-20 para o card subir
    <div className="min-h-screen bg-gray-50/50 flex justify-center pt-16 pb-12 px-6">
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-2xl p-8 h-fit">
        
        <header className="text-center mb-10">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💼</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Criar Novo Job</h1>
          <p className="text-gray-500 mt-2">
            Preencha os detalhes da oportunidade para atrair os melhores freelancers.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título do Projeto
            </label>
            <input
              type="text"
              placeholder="Ex: Desenvolvedor Full Stack Spring/Next"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição Detalhada
            </label>
            <textarea
              placeholder="Descreva as responsabilidades, requisitos e o que você espera do profissional..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Orçamento Estimado (R$)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
              <input
                type="number"
                placeholder="0,00"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all font-medium outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20"
            >
              Publicar Oportunidade
            </button>
            <button 
              type="button"
              onClick={() => router.back()}
              className="w-full mt-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}