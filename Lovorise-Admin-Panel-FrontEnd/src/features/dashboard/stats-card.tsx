import { Card, CardContent } from '@/components/ui/card'
import { PoundSterling, Users, UserCheck } from 'lucide-react'

const stats = [
  {
    title: 'Total revenue',
    value: '5468.37 £',
    icon: PoundSterling,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500',
  },
  {
    title: 'Total users',
    value: '5436',
    icon: Users,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500',
  },
  {
    title: 'Active users',
    value: '1730',
    icon: UserCheck,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500',
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 border border-gray-100 shadow-sm">
          <CardContent className="p-0">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
