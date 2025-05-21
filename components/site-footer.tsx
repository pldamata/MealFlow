import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MealFlow. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Termos de Serviço
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Política de Privacidade
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Suporte
          </a>
        </div>
      </div>
    </footer>
  )
}
