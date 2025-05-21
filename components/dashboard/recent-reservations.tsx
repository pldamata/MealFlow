import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const reservations = [
  {
    id: "RES-001",
    consumer: {
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "/avatars/01.png",
      initials: "JS",
    },
    diningHall: "Refeitório Central",
    mealPeriod: "Almoço",
    date: "2023-06-15",
    status: "confirmed",
  },
  {
    id: "RES-002",
    consumer: {
      name: "Maria Santos",
      email: "maria.santos@example.com",
      avatar: "/avatars/02.png",
      initials: "MS",
    },
    diningHall: "Refeitório Norte",
    mealPeriod: "Jantar",
    date: "2023-06-15",
    status: "pending",
  },
  {
    id: "RES-003",
    consumer: {
      name: "Pedro Costa",
      email: "pedro.costa@example.com",
      avatar: "/avatars/03.png",
      initials: "PC",
    },
    diningHall: "Refeitório Sul",
    mealPeriod: "Almoço",
    date: "2023-06-16",
    status: "confirmed",
  },
  {
    id: "RES-004",
    consumer: {
      name: "Ana Oliveira",
      email: "ana.oliveira@example.com",
      avatar: "/avatars/04.png",
      initials: "AO",
    },
    diningHall: "Refeitório Central",
    mealPeriod: "Almoço",
    date: "2023-06-16",
    status: "cancelled",
  },
  {
    id: "RES-005",
    consumer: {
      name: "Carlos Ferreira",
      email: "carlos.ferreira@example.com",
      avatar: "/avatars/05.png",
      initials: "CF",
    },
    diningHall: "Refeitório Norte",
    mealPeriod: "Jantar",
    date: "2023-06-16",
    status: "confirmed",
  },
]

export function RecentReservations() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Reservas Recentes</CardTitle>
        <CardDescription>
          Últimas 5 reservas realizadas no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Consumidor</TableHead>
              <TableHead>Refeitório</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reservation.consumer.avatar} alt={reservation.consumer.name} />
                    <AvatarFallback>{reservation.consumer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{reservation.consumer.name}</span>
                    <span className="text-xs text-muted-foreground">{reservation.consumer.email}</span>
                  </div>
                </TableCell>
                <TableCell>{reservation.diningHall}</TableCell>
                <TableCell>{reservation.mealPeriod}</TableCell>
                <TableCell>{new Date(reservation.date).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      reservation.status === "confirmed"
                        ? "default"
                        : reservation.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {reservation.status === "confirmed"
                      ? "Confirmada"
                      : reservation.status === "pending"
                      ? "Pendente"
                      : "Cancelada"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
