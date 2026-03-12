"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Briefcase, Eye, EyeOff, Lock, Mail, User, UserCircle, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { register } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!userType) {
      setError("Por favor, selecione se você é Empregador ou Freelancer.")
      return
    }

    setLoading(true)
    setError("")

    try {
      await register(name, email, password, userType)
      router.push("/login")
    } catch (err: any) {
      setError("Ocorreu um erro ao criar sua conta. Tente outro e-mail.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex justify-center bg-[#f8fafc] relative overflow-hidden px-4 pt-10 sm:pt-16 md:pt-24">

      {/* Background effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-50 rounded-full blur-[120px] opacity-60" />

      <div className="w-full max-w-[480px] relative animate-in fade-in zoom-in-95 duration-500">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-emerald-200 mb-4 rotate-3">
            <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-[950] text-slate-900 tracking-tighter text-center">
            Junte-se ao ClickJob<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">
            Sua nova jornada começa aqui.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nome */}
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Nome
              </Label>

              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />

                <Input
                  placeholder="Como devemos te chamar?"
                  className="pl-12 h-12 sm:h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                E-mail
              </Label>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />

                <Input
                  type="email"
                  placeholder="exemplo@gmail.com"
                  className="pl-12 h-12 sm:h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Senha
              </Label>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="exemplo123"
                  className="pl-12 pr-12 h-12 sm:h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Eu sou um...
              </Label>

              <div className="relative group">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors z-10" />

                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="pl-12 h-12 sm:h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium">
                    <SelectValue placeholder="Selecione seu perfil" />
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                    <SelectItem value="EMPLOYER">Empregador</SelectItem>
                    <SelectItem value="FREELANCER">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold p-4 rounded-xl">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 sm:h-14 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-emerald-200 group mt-4"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Criar minha conta
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Já faz parte da comunidade?{" "}
              <Link
                href="/login"
                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline-offset-4 hover:underline"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Plataforma Segura ClickJob
          <Sparkles className="inline-block w-3 h-3 ml-1 text-emerald-500" />
        </p>
      </div>
    </div>
  )
}