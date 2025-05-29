import { ActiveUserList } from '@/features/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ActiveUserList />
}
