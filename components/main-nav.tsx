"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo />
      </Link>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Início
      </Link>
      <Link
        href="/features"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/features" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Funcionalidades
      </Link>
      <Link
        href="/pricing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Preços
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/about" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Sobre
      </Link>
      <Link
        href="/contact"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/contact" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Contato
      </Link>
    </nav>
  )
}
