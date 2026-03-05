"use client"

import { useEffect, useState } from "react"
import { JobCard } from "@/components/job-card"
import { getAllJobs } from "@/lib/jobs"

// Defina a interface se estiver usando TypeScript para evitar erros no .map
interface Job {
  id: number;
  title: string;
  description: string;
  budget: string;
}

export default function JobListPage() {
  // 1. Mova todos os states para dentro do componente
  const [jobs, setJobs] = useState<Job[]>([])
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])
  const [role, setRole] = useState<string | null>(null)

  // 2. Use o useEffect para buscar dados e acessar o localStorage com segurança
  useEffect(() => {
    async function init() {
      // Busca os jobs da API/Lib
      const data = await getAllJobs()
      setJobs(data)

      // Acessa o localStorage apenas quando o componente "montar" no navegador
      const savedRole = localStorage.getItem("role")
      setRole(savedRole)
    }

    init()
  }, [])

  function handleApply(jobId: number) {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs((prev) => [...prev, jobId])
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Jobs Disponíveis
        </h1>
        {role && <p className="text-sm text-blue-500">Logado como: {role}</p>}
        <p className="mt-1 text-sm text-muted-foreground">
          Encontre oportunidades de trabalho e candidate-se.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            description={job.description}
            budget={job.budget}
            onApply={() => handleApply(job.id)}
          />
        ))}
      </div>

      {appliedJobs.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Você aplicou para {appliedJobs.length} job(s).
        </p>
      )}
    </div>
  )
}