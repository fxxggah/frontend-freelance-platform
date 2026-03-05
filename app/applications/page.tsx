"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getMyApplications } from "@/lib/applications"
import { useEffect, useState } from "react"

const statusMap: Record<string, string> = {
  PENDING: "Pendente",
  ACCEPTED: "Aprovada",
  REFUSED: "Recusada",
  CANCELLED: "Cancelada",
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    async function fetchApps() {
      try {
        const data = await getMyApplications()
        setApplications(data)
      } catch (error) {
        console.error("Erro ao buscar aplicações:", error)
      }
    }

    fetchApps()
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Minhas Aplicações
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe o status das suas candidaturas.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {applications.map((app: any) => (
          <Card key={app.id}>
            <CardContent className="flex items-center justify-between p-4">
              <span>{app.jobTitle}</span>
              <Badge>{statusMap[app.status] || app.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}