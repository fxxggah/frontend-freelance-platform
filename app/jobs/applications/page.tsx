"use client"

import { useEffect, useState } from "react"
import { getMyApplications } from "@/lib/applications"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Loader2, Inbox, Briefcase, DollarSign } from "lucide-react"

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) return

        const data = await getMyApplications(Number(userId))
        // Garante que aplicações seja sempre um array
        setApplications(Array.isArray(data) ? data : (data?.content || []))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-600" /></div>
  )

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black mb-8">Minhas Candidaturas</h1>

        {applications.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <Inbox className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Você ainda não se candidatou a nenhuma Vaga.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {applications.map((app: any) => (
              <Card key={app.id} className="p-6 rounded-[1.5rem] border-gray-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      {/* Tenta pegar o título do Job de diferentes formas para não dar erro */}
                      <h3 className="font-bold text-lg">
                        {app.jobTitle || app.job?.title || "Projeto #" + app.id}
                      </h3>
                      <div className="flex gap-3 mt-1">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-emerald-600">
                     <span className="text-xs text-gray-400 block font-sans">Orçamento</span>
                     R$ {app.jobBudget || app.job?.budget || "---"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}