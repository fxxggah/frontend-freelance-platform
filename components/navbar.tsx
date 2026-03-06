"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Briefcase, User, LogOut } from "lucide-react" // Importado LogOut
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <div className="flex w-1/4 justify-start">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 group transition-all"
          >
            <div className="flex items-center justify-center bg-emerald-50 p-2 rounded-xl transition-all group-hover:bg-emerald-100">
              <Briefcase className="h-5 w-5 text-[#00897b]" />
            </div>

            <span className="text-lg font-black tracking-tight text-slate-900">
              ClickJob
            </span>
          </Link>
        </div>

        {/* NAV CENTER */}
        <nav className="hidden md:flex items-center gap-3 bg-slate-50/80 px-3 py-1.80 rounded-2xl border border-slate-200 shadow-sm">
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

        {/* PROFILE & ACTIONS */}
        <div className="flex w-1/4 justify-end items-center gap-2">
          <Link
            href="/myprofile"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200",
              pathname === "/myprofile"
                ? "bg-[#00897b] text-white shadow-lg shadow-emerald-200"
                : "bg-emerald-50 text-[#00897b] hover:bg-emerald-100"
            )}
          >
            <User size={14} />
            Perfil
          </Link>

          {/* Novo Botão de Sair Estilizado */}
          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
            title="Sair da conta"
          >
            <LogOut size={18} className="transition-transform group-active:scale-90" />
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
        "rounded-2xl px-3 py-2 text-[15px] transition-all duration-200",
        isActive
          ? "bg-white text-[#00897b] font-black shadow-sm ring-1 ring-slate-200"
          : "text-slate-500 font-semibold hover:text-slate-900 hover:bg-white/60"
      )}
    >
      {children}
    </Link>
  )
}
