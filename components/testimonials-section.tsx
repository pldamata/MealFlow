import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Depoimentos
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              O que nossos clientes dizem
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descubra como o MealFlow está transformando a gestão de refeitórios em diversas organizações.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Ana Silva</CardTitle>
                  <CardDescription>Gestora de Refeitório, Empresa X</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "O MealFlow revolucionou a forma como gerenciamos nosso refeitório. Reduzimos o desperdício em 30% e melhoramos a satisfação dos nossos colaboradores."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>João Martins</CardTitle>
                  <CardDescription>Diretor de Operações, Empresa Y</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "A implementação do MealFlow foi rápida e sem complicações. A equipe de suporte é excepcional e o sistema é extremamente intuitivo."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Maria Costa</CardTitle>
                  <CardDescription>Nutricionista, Empresa Z</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "Como nutricionista, o MealFlow me permite planejar ementas equilibradas e monitorar facilmente as informações nutricionais. É uma ferramenta indispensável."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
