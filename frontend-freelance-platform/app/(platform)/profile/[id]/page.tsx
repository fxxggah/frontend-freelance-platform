"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import API_URL, { getAuthHeaders } from "@/lib/api"
import { User, Mail, Calendar, ArrowLeft } from "lucide-react"

interface UserData {
  id: number
  name: string
  email: string
  createdAt: string // Certifique-se que o backend retorna essa data
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id

  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/users/${userId}`, {
          headers: getAuthHeaders(),
        })
        if (!res.ok) throw new Error("Usuário não encontrado")
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading) return <div className="flex justify-center pt-20">Carregando...</div>

  if (!user) return <div className="flex justify-center pt-20">Usuário não encontrado.</div>

  // Formatação simples da data: "Usuário desde Janeiro de 2024"
  const dateFormatted = new Date(user.createdAt).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center pt-16 pb-12 px-6">
      <div className="w-full max-w-2xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-700 font-medium hover:underline mb-6 transition-all"
        >
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
          {/* Header do Card (Banner sutil) */}
          <div className="h-24 bg-emerald-600 w-full" />
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              {/* Avatar Gigante */}
              <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                <div className="w-full h-full bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-emerald-600 font-medium">Freelancer Profissional</p>
              </div>

              <div className="grid gap-4 py-6 border-y border-gray-100">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="text-emerald-600" size={20} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="text-emerald-600" size={20} />
                  <span className="capitalize">Usuário desde {dateFormatted}</span>
                </div>
              </div>

              {/* Espaço reservado para o futuro */}
              <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
                <p className="text-sm text-gray-400 italic">
                  Bio em breve... O freelancer ainda não preencheu suas informações detalhadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}