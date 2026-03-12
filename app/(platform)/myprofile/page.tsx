"use client"

import { useEffect, useState } from "react"
import { getUserProfile, deleteAccount } from "@/lib/users"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Mail, Briefcase, ShieldAlert, Settings2, LogOut } from "lucide-react"

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
        <Loader2 className="animate-spin text-emerald-500 w-10 h-10" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Container Principal: Fundo unificado e bordas arredondadas */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        
        {/* Efeito visual sutil no topo (gradiente) em vez de um banner sólido */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />

        {/* --- HEADER: Avatar e Título --- */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 relative">
          
          {/* Avatar Premium */}
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-3xl flex items-center justify-center border border-white shadow-xl shadow-emerald-900/5 group-hover:scale-105 transition-all duration-300">
              <User className="text-emerald-600 w-12 h-12" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2.5 bg-slate-900 hover:bg-emerald-600 rounded-xl border-4 border-white shadow-lg transition-colors">
              <Settings2 className="text-white w-4 h-4" />
            </div>
          </div>

          {/* Nome e Título */}
          <div className="text-center sm:text-left pt-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {user?.name || "Usuário"}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Online agora
              </span>
            </div>
          </div>
        </div>

        {/* --- CONTEÚDO: Informações do Usuário --- */}
        <div className="space-y-8">
          
          {/* Sessão de Dados */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
              Informações Pessoais
            </h2>
            <div className="bg-slate-50/50 rounded-3xl p-2 border border-slate-100/50 flex flex-col gap-1">
              <ProfileItem icon={<User size={18}/>} label="Nome Completo" value={user?.name} />
              <ProfileItem icon={<Mail size={18}/>} label="Endereço de E-mail" value={user?.email} />
              <ProfileItem icon={<Briefcase size={18}/>} label="Tipo de Conta" value={user?.role} />
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* --- DANGER ZONE --- */}
          <section>
            <div className="bg-red-50/30 border border-red-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-red-200 transition-colors">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-3 bg-white shadow-sm rounded-2xl border border-red-100 hidden sm:block">
                  <ShieldAlert className="text-red-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-900 mb-1">Zona de Perigo</h3>
                  <p className="text-sm text-red-600/80 font-medium">
                    Ao excluir sua conta, todos os seus dados serão removidos permanentemente.
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="w-full sm:w-auto bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200 shadow-sm font-bold rounded-xl h-11 px-6"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Excluir Conta
              </Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

function ProfileItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center p-3.5 group hover:bg-white rounded-[1.25rem] transition-all duration-300 hover:shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-transparent hover:border-slate-100 cursor-default">
      <div className="p-3 bg-white border border-slate-100 text-slate-400 rounded-xl transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 group-hover:shadow-md group-hover:shadow-emerald-200 group-hover:-translate-y-0.5">
        {icon}
      </div>
      
      <div className="ml-4 flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-emerald-600 transition-colors">
          {label}
        </p>
        <p className="text-slate-900 font-bold text-[15px] tracking-tight truncate">
          {value || "Não informado"}
        </p>
      </div>
    </div>
  )
}