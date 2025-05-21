"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Seg",
    breakfast: 65,
    lunch: 240,
    dinner: 150,
  },
  {
    name: "Ter",
    breakfast: 70,
    lunch: 255,
    dinner: 145,
  },
  {
    name: "Qua",
    breakfast: 62,
    lunch: 230,
    dinner: 140,
  },
  {
    name: "Qui",
    breakfast: 75,
    lunch: 260,
    dinner: 160,
  },
  {
    name: "Sex",
    breakfast: 68,
    lunch: 245,
    dinner: 155,
  },
  {
    name: "Sáb",
    breakfast: 40,
    lunch: 120,
    dinner: 90,
  },
  {
    name: "Dom",
    breakfast: 35,
    lunch: 100,
    dinner: 80,
  },
]

const chartConfig = {
  breakfast: {
    label: "Pequeno-almoço",
    theme: {
      light: "hsl(var(--chart-1))",
      dark: "hsl(var(--chart-1))",
    },
  },
  lunch: {
    label: "Almoço",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-2))",
    },
  },
  dinner: {
    label: "Jantar",
    theme: {
      light: "hsl(var(--chart-3))",
      dark: "hsl(var(--chart-3))",
    },
  },
}

export function MealPeriodsChart() {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Reservas por Período</CardTitle>
        <CardDescription>
          Distribuição de reservas por período de refeição na última semana.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="aspect-auto h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="breakfast" fill="var(--color-breakfast)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lunch" fill="var(--color-lunch)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="dinner" fill="var(--color-dinner)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
