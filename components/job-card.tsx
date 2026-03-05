"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, DollarSign, ArrowUpRight } from "lucide-react"

interface JobCardProps {
  jobId: number
  title: string
  employerName: string // Certifique-se que o Back envia isso
  budget: number
  role: string | null
  isAlreadyApplied: boolean
}

export function JobCard({ jobId, title, employerName, budget, role, isAlreadyApplied }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          {/* Título como Link para a futura página de detalhes */}
          <Link href={`/jobs/${jobId}`}>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
              {title}
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>
          
          {/* Nome do Employer abaixo do título */}
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
            <User size={14} className="text-emerald-500" />
            <span>{employerName || "Empresa Parceira"}</span>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none font-bold">
          R$ {Number(budget).toLocaleString('pt-BR')}
        </Badge>
      </div>

      {role === "FREELANCER" && (
        <div className="mt-6">
          {isAlreadyApplied ? (
            <Button disabled className="w-full bg-gray-100 text-gray-400 rounded-xl">
              Candidatura Enviada
            </Button>
          ) : (
            <Link href={`/jobs/${jobId}`}>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm">
                Candidatar-se
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}