import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  {
    title: "Reservas Hoje",
    value: "245",
    description: "+12% em relação a ontem",
    trend: "up",
    icon: CalendarIcon,
    link: "/dashboard/reservations",
  },
  {
    title: "Clientes Ativos",
    value: "12",
    description: "Sem alteração",
    trend: "neutral",
    icon: UsersIcon,
    link: "/dashboard/clients",
  },
  {
    title: "Refeitórios",
    value: "8",
    description: "+1 novo este mês",
    trend: "up",
    icon: DollarSignIcon,
    link: "/dashboard/dining-halls",
  },
  {
    title: "Faturamento Mensal",
    value: "€12,450",
    description: "-2% em relação ao mês anterior",
    trend: "down",
    icon: CreditCardIcon,
    link: "/dashboard/payments",
  },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stat.trend === "up" && (
                <ArrowUpIcon className="mr-1 h-4 w-4 text-emerald-500" />
              )}
              {stat.trend === "down" && (
                <ArrowDownIcon className="mr-1 h-4 w-4 text-rose-500" />
              )}
              {stat.trend === "neutral" && (
                <ArrowRightIcon className="mr-1 h-4 w-4 text-muted-foreground" />
              )}
              {stat.description}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="p-0 h-auto" asChild>
              <a href={stat.link} className="text-xs text-muted-foreground flex items-center">
                Ver detalhes
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
