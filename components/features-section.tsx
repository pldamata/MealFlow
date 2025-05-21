import {
  BarChart3,
  Calendar,
  ClipboardCheck,
  Clock,
  CreditCard,
  ShieldCheck,
  Utensils,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Funcionalidades
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              O MealFlow oferece um conjunto completo de módulos para otimizar todas as operações do seu refeitório.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Calendar className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Reservas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gestão completa do ciclo de reservas, incluindo reservas em grupo e recorrentes.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Utensils className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Ementas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Planejamento e publicação de ementas com rotação e sazonalidade.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>HACCP</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Controle de segurança alimentar com registros de temperatura e rastreabilidade.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Análise de dados operacionais com previsão de demanda e otimização de compras.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CreditCard className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Pagamentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integração com sistemas de pagamento, faturação e gestão de subsídios.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Multi-Tenant</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Arquitetura multi-tenant com isolamento completo de dados entre clientes.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ClipboardCheck className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Conformidade</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Garantia de compliance com requisitos legais, incluindo GDPR/RGPD.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Clock className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Tempo Real</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitoramento em tempo real de operações, reservas e ocupação.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
