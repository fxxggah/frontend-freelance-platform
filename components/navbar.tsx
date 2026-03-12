"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Briefcase, User, LogOut } from "lucide-react"
import { useEffect, useState } from "react"

const authRoutes = ["/login", "/register"]

export function Navbar() {
  const pathname = usePathname()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const storedRole = localStorage.getItem("role")
    setRole(storedRole)
  }, [pathname])

  if (authRoutes.includes(pathname)) {
    return null
  }

  return (
    // Navbar Flutuante
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-6">
      <div className="w-full max-w-7xl h-16 bg-white/75 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(16,185,129,0.08)]">
        
        {/* LOGO - Alinhada à esquerda */}
        <div className="flex flex-1 justify-start">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group transition-all"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:rotate-6 transition-transform duration-300">
              <Briefcase className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-[950] tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">
              ClickJob<span className="text-emerald-500">.</span>
            </span>
          </Link>
        </div>

        {/* NAV CENTER - Estilo Pill (Pílula) */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-2xl border border-gray-200/20 backdrop-blur-sm">
          <NavLink href="/dashboard" current={pathname}>
            Home
          </NavLink>

          <NavLink href="/jobs" current={pathname}>
            Vagas
          </NavLink>

          {role === "EMPLOYER" && (
            <NavLink href="/jobs/my" current={pathname}>
              Meus Jobs
            </NavLink>
          )}

          {role === "FREELANCER" && (
            <NavLink href="/jobs/applications" current={pathname}>
              Aplicações
            </NavLink>
          )}
        </nav>

        {/* PROFILE & ACTIONS - Alinhado à direita */}
        <div className="flex flex-1 justify-end items-center gap-3">
          <Link
            href="/myprofile"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border",
              pathname === "/myprofile"
                ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-sm"
            )}
          >
            <User size={14} strokeWidth={3} />
            <span className="hidden sm:inline">Perfil</span>
          </Link>

          {/* Divisor Sutil */}
          <div className="h-6 w-[1px] bg-gray-200/60 mx-1 hidden sm:block" />

          {/* Botão Sair */}
          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group relative"
            title="Sair da conta"
          >
            <LogOut size={18} className="transition-transform group-hover:-translate-x-0.5 group-active:scale-90" />
          </button>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string
  current: string
  children: React.ReactNode
}) {
  const isActive =
    href === "/jobs"
      ? current === "/jobs"
      : current === href || (href !== "/dashboard" && current.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl",
        isActive
          ? "bg-white text-emerald-600 shadow-sm ring-1 ring-black/5"
          : "text-slate-500 hover:text-emerald-600 hover:bg-white/50"
      )}
    >
      {children}
    </Link>
  )
}