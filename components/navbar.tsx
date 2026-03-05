"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Briefcase } from "lucide-react"
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
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-[#00897b]" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            FreelanceHub
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/dashboard" current={pathname}>
            Dashboard
          </NavLink>

          <NavLink href="/jobs" current={pathname}>
            Jobs
          </NavLink>

          {role === "EMPLOYER" && (
            <NavLink href="/jobs/my" current={pathname}>
              Meus Jobs
            </NavLink>
          )}

          {role === "FREELANCER" && (
            <NavLink href="/applications" current={pathname}>
              Aplicações
            </NavLink>
          )}

          <Link
            href="/login"
            onClick={() => {
              localStorage.clear()
              setRole(null)
            }}
            className="ml-3 rounded-md bg-[#00897b] px-4 py-1.5 text-sm font-bold text-white transition-all hover:bg-[#00796b] active:scale-[0.98] shadow-sm"
          >
            Sair
          </Link>
        </nav>
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
  const isActive = href === "/jobs" 
    ? current === "/jobs" 
    : current === href || (href !== "/dashboard" && current.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-secondary text-foreground font-bold"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}