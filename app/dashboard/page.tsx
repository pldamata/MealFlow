import { Header } from "@/components/dashboard/header"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentReservations } from "@/components/dashboard/recent-reservations"
import { MealPeriodsChart } from "@/components/dashboard/meal-periods-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:gap-8 mb-8">
          <OverviewCards />
        </div>
        <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3">
          <RecentReservations />
          <MealPeriodsChart />
        </div>
      </main>
    </div>
  )
}
