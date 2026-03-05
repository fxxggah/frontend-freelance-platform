"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Briefcase } from "lucide-react"

const authRoutes = ["/login", "/register"]

export function Navbar() {
  const pathname = usePathname()

  if (authRoutes.includes(pathname)) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
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
          <NavLink href="/jobs/create" current={pathname}>
            Criar Job
          </NavLink>
          <NavLink href="/applications" current={pathname}>
            Aplicações
          </NavLink>
          <Link
            href="/login"
            className="ml-3 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
  const isActive = current === href || (href !== "/dashboard" && current.startsWith(href))
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}
