'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Dados simulados para demonstração
const reservations = [
  {
    id: '1',
    client: 'Empresa ABC',
    department: 'Engenharia',
    user: 'João Silva',
    initials: 'JS',
    time: '12:30',
    date: 'Hoje',
    status: 'confirmada'
  },
  {
    id: '2',
    client: 'Empresa ABC',
    department: 'Marketing',
    user: 'Maria Oliveira',
    initials: 'MO',
    time: '13:00',
    date: 'Hoje',
    status: 'pendente'
  },
  {
    id: '3',
    client: 'Empresa XYZ',
    department: 'Financeiro',
    user: 'Carlos Santos',
    initials: 'CS',
    time: '12:00',
    date: 'Hoje',
    status: 'confirmada'
  },
  {
    id: '4',
    client: 'Empresa XYZ',
    department: 'RH',
    user: 'Ana Pereira',
    initials: 'AP',
    time: '12:30',
    date: 'Amanhã',
    status: 'confirmada'
  },
  {
    id: '5',
    client: 'Empresa ABC',
    department: 'Diretoria',
    user: 'Roberto Almeida',
    initials: 'RA',
    time: '13:00',
    date: 'Amanhã',
    status: 'pendente'
  }
];

export function RecentReservations() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Reservas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{reservation.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{reservation.user}</div>
                  <div className="text-sm text-muted-foreground">
                    {reservation.client} • {reservation.department}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">{reservation.time}</div>
                  <div className="text-sm text-muted-foreground">{reservation.date}</div>
                </div>
                <Badge variant={reservation.status === 'confirmada' ? 'default' : 'outline'}>
                  {reservation.status === 'confirmada' ? 'Confirmada' : 'Pendente'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
