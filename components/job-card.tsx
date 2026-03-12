"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, ArrowRight } from "lucide-react"

interface JobCardProps {
  jobId: number
  title: string
  employerName: string
  budget: number
  role: string | null
  isAlreadyApplied: boolean
}

export function JobCard({ jobId, title, employerName, budget, role, isAlreadyApplied }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
      
      <div className="flex justify-between items-start mb-4">
        <div>
          {/* TÍTULO AGORA NÃO É MAIS LINK */}
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
            <User size={14} className="text-emerald-500" />
            <span>{employerName || "Empresa Parceira"}</span>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none font-bold">
          R$ {Number(budget).toLocaleString('pt-BR')}
        </Badge>
      </div>

      {/* BOTÃO SABER MAIS */}
      <div className="mt-6">
        <Link href={`/jobs/all/${jobId}`}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm flex items-center justify-center gap-2">
            Saber mais
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

    </div>
  )
}