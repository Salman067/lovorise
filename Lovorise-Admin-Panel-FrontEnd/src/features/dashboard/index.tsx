import { DashboardHeader } from '@/features/dashboard/dashboar-header'
import { StatsCards } from '@/features/dashboard/stats-card'
import { OverviewChart } from '@/features/dashboard/overview-chart'
import { ActiveUsersByCountry } from '@/features/dashboard/active-user-by-country'
import { MostActiveUsers } from '@/features/dashboard/most-active-users'
import { RegisteredUsersChart } from '@/features/dashboard/registered-users-chart'
import { UserEngagements } from '@/features/dashboard/user-engagements'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <DashboardHeader />
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OverviewChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MostActiveUsers />
              <RegisteredUsersChart />
            </div>
          </div>
          <div className="space-y-6">
            <ActiveUsersByCountry />
            <UserEngagements />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
