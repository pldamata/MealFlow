'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Dados simulados para demonstração
const data = [
  {
    name: 'Seg',
    cafe: 65,
    almoco: 120,
    jantar: 45,
  },
  {
    name: 'Ter',
    cafe: 70,
    almoco: 132,
    jantar: 50,
  },
  {
    name: 'Qua',
    cafe: 62,
    almoco: 125,
    jantar: 42,
  },
  {
    name: 'Qui',
    cafe: 75,
    almoco: 140,
    jantar: 55,
  },
  {
    name: 'Sex',
    cafe: 80,
    almoco: 150,
    jantar: 60,
  },
  {
    name: 'Sáb',
    cafe: 45,
    almoco: 85,
    jantar: 30,
  },
  {
    name: 'Dom',
    cafe: 30,
    almoco: 60,
    jantar: 25,
  },
];

export function MealPeriodsChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Refeições por Período</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cafe" name="Café da Manhã" fill="#8884d8" />
              <Bar dataKey="almoco" name="Almoço" fill="#82ca9d" />
              <Bar dataKey="jantar" name="Jantar" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
