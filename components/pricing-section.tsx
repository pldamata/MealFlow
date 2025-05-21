import { Check } from "lucide-react"

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

const plans = [
  {
    name: "Básico",
    description: "Ideal para pequenos refeitórios",
    price: "€99",
    duration: "/mês",
    features: [
      "Módulo de Reservas",
      "Módulo de Ementas",
      "1 Refeitório",
      "Até 100 refeições/dia",
      "Suporte por email",
    ],
    cta: "Começar agora",
    popular: false,
  },
  {
    name: "Profissional",
    description: "Para refeitórios de médio porte",
    price: "€249",
    duration: "/mês",
    features: [
      "Tudo do plano Básico",
      "Módulo HACCP",
      "Módulo Analytics",
      "Até 3 Refeitórios",
      "Até 500 refeições/dia",
      "Suporte prioritário",
    ],
    cta: "Começar agora",
    popular: true,
  },
  {
    name: "Empresarial",
    description: "Para grandes organizações",
    price: "Personalizado",
    duration: "",
    features: [
      "Tudo do plano Profissional",
      "Módulo de Pagamentos",
      "Refeitórios ilimitados",
      "Refeições ilimitadas",
      "Integrações personalizadas",
      "Suporte 24/7",
      "Gerente de conta dedicado",
    ],
    cta: "Contate-nos",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Preços
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Planos para todos os tamanhos de refeitório
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha o plano que melhor se adapta às necessidades da sua organização.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.popular && "border-primary shadow-md"
              )}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}
                  <span className="ml-1 text-2xl font-medium text-muted-foreground">
                    {plan.duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grid flex-1 gap-4">
                <ul className="grid gap-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
