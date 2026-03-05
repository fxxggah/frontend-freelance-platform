"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign } from "lucide-react"

interface JobCardProps {
  title: string
  description: string
  budget: string
  onApply: () => void
}

export function JobCard({ title, description, budget, onApply }: JobCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="flex flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {title}
          </h3>
          <Badge variant="secondary" className="shrink-0 gap-1 font-mono text-xs">
            <DollarSign className="h-3 w-3" />
            {budget}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Button size="sm" onClick={onApply} className="mt-2 self-start">
          Aplicar
        </Button>
      </CardContent>
    </Card>
  )
}
