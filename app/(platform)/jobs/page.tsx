"use client"

import { useEffect, useState } from "react"
import { JobCard } from "@/components/job-card"
import { getAllJobs } from "@/lib/jobs"
import { getMyApplications } from "@/lib/applications"
import { Briefcase, Search } from "lucide-react"

export default function JobListPage() {
  const [jobs, setJobs] = useState([])
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([])
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      try {
        const jobsData = await getAllJobs()
        setJobs(jobsData)

        const savedRole = localStorage.getItem("role")
        const userId = localStorage.getItem("userId")
        setRole(savedRole)

        if (savedRole === "FREELANCER" && userId) {
          const apps = await getMyApplications(Number(userId))
          const ids = apps.map((app: any) => app.jobId)
          setAppliedJobIds(ids)
        }
      } catch (error) {
        console.error("Erro ao carregar Mural:", error)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <Briefcase size={24} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Mural de Oportunidades
            </h1>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl">
            Explore projetos selecionados e conecte-se com clientes de todo o mundo.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
               {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl"></div>)}
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-24 bg-white border border-dashed border-gray-200 rounded-3xl">
            <Search className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-gray-900 font-bold text-xl">Nada por aqui ainda</h3>
            <p className="text-gray-400">Volte mais tarde para novas vagas.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job: any) => (
              <JobCard
                key={job.id}
                jobId={job.id}
                title={job.title}
                employerName={job.employerName} // O nome vem do objeto job
                budget={job.budget}
                role={role}
                isAlreadyApplied={appliedJobIds.includes(job.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}