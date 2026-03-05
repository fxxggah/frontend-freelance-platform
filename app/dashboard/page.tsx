"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Briefcase, FilePlus, FolderOpen, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Action = {
  label: string
  href: string
  icon: any
  description: string
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

  function handleLogout() {
    localStorage.clear()
    router.push("/login")
  }

  const allActions: Action[] = [
    {
      label: "Ver Jobs",
      href: "/jobs",
      icon: FolderOpen,
      description: "Navegue pelas oportunidades disponíveis",
    },
    {
      label: "Criar Job",
      href: "/jobs/create",
      icon: FilePlus,
      description: "Publique uma nova oportunidade de trabalho",
    },
    {
      label: "Minhas Aplicações",
      href: "/applications",
      icon: Briefcase,
      description: "Acompanhe suas candidaturas enviadas",
    },
  ]

  const filteredActions = allActions.filter((action) => {
    if (role === "EMPLOYER") {
      return action.label !== "Minhas Aplicações"
    }

    if (role === "FREELANCER") {
      return action.label !== "Criar Job"
    }

    return false
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">
          Bem-vindo, {name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Você está logado como <strong>{role}</strong>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="group h-full cursor-pointer transition-colors hover:border-primary/30 hover:bg-secondary/50">
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">
                    {action.label}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Sair da conta
        </Button>
      </div>
    </div>
  )
}