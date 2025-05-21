"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Calendar, 
  ChevronDown, 
  ClipboardCheck, 
  CreditCard, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  ShieldCheck, 
  Users, 
  Utensils 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Logo />
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Visão Geral
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/dashboard/clients" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/clients">
                <Users className="mr-2 h-4 w-4" />
                Clientes
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/dashboard/dining-halls" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/dining-halls">
                <Home className="mr-2 h-4 w-4" />
                Refeitórios
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Módulos
          </h2>
          <div className="space-y-1">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Reservas
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 pt-1">
                <div className="space-y-1">
                  <Button
                    asChild
                    variant={pathname === "/dashboard/reservations" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/reservations">
                      Todas as Reservas
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={pathname === "/dashboard/reservations/group" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/reservations/group">
                      Reservas em Grupo
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={pathname === "/dashboard/reservations/recurring" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/reservations/recurring">
                      Reservas Recorrentes
                    </Link>
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                >
                  <div className="flex items-center">
                    <Utensils className="mr-2 h-4 w-4" />
                    Ementas
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 pt-1">
                <div className="space-y-1">
                  <Button
                    asChild
                    variant={pathname === "/dashboard/menus" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/menus">
                      Todas as Ementas
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={pathname === "/dashboard/menus/meals" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/menus/meals">
                      Catálogo de Refeições
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={pathname === "/dashboard/menus/planning" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/menus/planning">
                      Planejamento
                    </Link>
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Button
              asChild
              variant={pathname.startsWith("/dashboard/haccp") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/haccp">
                <ShieldCheck className="mr-2 h-4 w-4" />
                HACCP
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname.startsWith("/dashboard/analytics") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname.startsWith("/dashboard/payments") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Pagamentos
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Configurações
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              <Link href="/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
