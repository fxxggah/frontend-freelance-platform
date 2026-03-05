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
    <div>
      <h1>Criar Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Orçamento"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button type="submit">Criar</button>
      </form>
    </div>
  )
}