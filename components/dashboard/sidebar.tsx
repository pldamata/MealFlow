'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/lib/multi-tenant/tenant-context';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  UtensilsCrossed, 
  BarChart, 
  Settings,
  Loader2
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Reservas', href: '/dashboard/reservations', icon: CalendarClock },
  { name: 'Clientes', href: '/dashboard/clients', icon: Users },
  { name: 'Ementas', href: '/dashboard/menus', icon: UtensilsCrossed },
  { name: 'Relatórios', href: '/dashboard/reports', icon: BarChart },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { tenant, isLoading, error } = useTenant();

  return (
    <div className="w-64 bg-card border-r h-full flex flex-col">
      <div className="p-4 border-b">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Carregando...</span>
          </div>
        ) : error ? (
          <div className="text-destructive">Erro ao carregar tenant</div>
        ) : (
          <div className="font-semibold text-xl">{tenant?.name || 'MealFlow'}</div>
        )}
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="text-sm text-muted-foreground">
          MealFlow v0.1.0
        </div>
      </div>
    </div>
  );
}
