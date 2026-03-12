"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Briefcase, Eye, EyeOff, Lock, Mail, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await login(email, password)

      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId.toString())
      localStorage.setItem("name", data.name)
      localStorage.setItem("role", data.role)

      router.push("/dashboard")
    } catch (err: any) {
      setError("E-mail ou senha incorretos. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex justify-center bg-[#f8fafc] relative overflow-hidden px-4 pt-10 sm:pt-16 md:pt-24">

      {/* Background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-50 rounded-full blur-[120px] opacity-60" />

      <div className="w-full max-w-[440px] relative animate-in fade-in zoom-in-95 duration-500">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-emerald-200 mb-4 rotate-3">
            <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-[950] text-slate-900 tracking-tighter text-center">
            ClickJob<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">
            Bem-vindo de volta!
          </p>
        </div>

        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">

          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              Login
            </h2>

            <p className="text-sm text-slate-500 mt-1 font-medium">
              Insira seus dados para para entrar na plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

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

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
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
                  Entrar na Plataforma
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline-offset-4 hover:underline"
              >
                Criar conta agora
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Ambiente Seguro ClickJob
          <Sparkles className="inline-block w-3 h-3 ml-1 text-emerald-500" />
        </p>
      </div>
    </div>
  )
}