import ActiveUsersByCountryTable from '@/features/users/by-country'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/by-country')({
  component: ActiveUsersByCountryPage,
})

function ActiveUsersByCountryPage() {
  return <ActiveUsersByCountryTable />
}
