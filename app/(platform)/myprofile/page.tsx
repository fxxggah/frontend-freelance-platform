"use client"

import { useEffect, useState } from "react"
import { getUserProfile, deleteAccount } from "@/lib/users"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Mail, Briefcase, Trash2, ShieldAlert, Settings2 } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadUser() }, [])

  async function loadUser() {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) return
      const data = await getUserProfile(Number(userId))
      setUser(data)
    } catch (err) {
      console.error("Erro ao carregar perfil")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) return
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) return
      await deleteAccount(Number(userId))
      localStorage.clear()
      window.location.href = "/"
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir conta")
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600 w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Banner de fundo sutil */}
      <div className="h-32 bg-emerald-600 w-full mb-[-64px]" />

      <div className="max-w-2xl mx-auto px-4">
        <div className="space-y-6">
          
          {/* Header & Avatar */}
          <div className="flex flex-col items-center sm:items-end sm:flex-row gap-4 px-2">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                <User className="text-emerald-600 w-10 h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-500 rounded-lg border-2 border-white shadow-sm">
                <Settings2 className="text-white w-3 h-3" />
              </div>
            </div>
            <div className="text-center sm:text-left pb-1">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">{user?.name || "Usuário"}</h1>
              <p className="text-slate-500 text-sm font-medium">Configurações da Conta</p>
            </div>
          </div>

          {/* Main Content */}
          <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">Informações Pessoais</CardTitle>
              <CardDescription>Dados visíveis para recrutadores e parceiros.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <ProfileItem icon={<User size={18}/>} label="Nome" value={user?.name} />
              <Separator className="my-2 bg-slate-100" />
              <ProfileItem icon={<Mail size={18}/>} label="E-mail" value={user?.email} />
              <Separator className="my-2 bg-slate-100" />
              <ProfileItem 
                icon={<Briefcase size={18}/>} 
                label="Tipo de Perfil" 
                value={user?.role} 
                badge={user?.role} 
              />
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-100 bg-white overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-red-50 rounded-full">
                  <ShieldAlert className="text-red-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Excluir Conta</h3>
                  <p className="text-xs text-slate-500 max-w-[300px]">
                    Sua conta e todos os dados serão removidos permanentemente de nossos servidores.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all text-xs font-semibold px-6"
              >
                Encerrar Conta
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}

function ProfileItem({ icon, label, value, badge }: any) {
  return (
    <div className="flex items-center justify-between py-3 group">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-semibold text-sm tracking-tight">{value}</span>
            {badge && (
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none text-[10px] uppercase font-bold px-2 py-0">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
