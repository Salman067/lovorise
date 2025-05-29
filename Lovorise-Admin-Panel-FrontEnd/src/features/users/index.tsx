import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, CircleArrowRight } from 'lucide-react'
import { Pagination } from '@/components/pagination'
import { useState } from 'react'

const users = [
  {
    id: '123456',
    name: 'Jhon backer',
    email: 'olivia@untitledu.com',
    gender: 'Man',
    hearts: 1000,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123456',
    name: 'Phoenix Baker',
    email: 'phoenix@untitledu.com',
    gender: 'Woman',
    hearts: 10,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123456',
    name: 'Lana Steiner',
    email: 'lana@untitledu.com',
    gender: 'Non-binary',
    hearts: 700,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123456',
    name: 'Demi Wilkinson',
    email: 'demi@untitledu.com',
    gender: 'Woman',
    hearts: 0,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123456',
    name: 'Candice Wu',
    email: 'candice@untitledu.com',
    gender: 'Man',
    hearts: 24,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'CW',
  },
  {
    id: '123456',
    name: 'Natali Craig',
    email: 'natali@untitledu.com',
    gender: 'woman',
    hearts: 600,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123456',
    name: 'Drew Cano',
    email: 'drew@untitledu.com',
    gender: 'Man',
    hearts: 10,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123456',
    name: 'Orlando Diggs',
    email: 'orlando@untitledu.com',
    gender: 'Non-binary',
    hearts: 0,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'OD',
  },
  {
    id: '123456',
    name: 'Andi Lane',
    email: 'andi@untitledu.com',
    gender: 'Woman',
    hearts: 0,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '123457',
    name: 'Lina',
    email: 'andi@untitledu.com',
    gender: 'Woman',
    hearts: 1000,
    joined: 'June 06, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
]

export function ActiveUserList() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalItems = 100 
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    console.log(`Fetching page ${page}`)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Active user list
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              You can see here most active users
            </p>
          </div>
          <Button
            variant="outline"
            className="border cursor-pointer border-gray-200 hover:bg-gray-50"
            onClick={() => (window.location.href = '/users/by-country')}
          >
            View Users by Country
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
          <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            User name
          </div>
          <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email address
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gender
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hearts
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Joined
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {users.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-3 flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.avatar || '/placeholder.svg'}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                    {user.initials ||
                      user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">ID: {user.id}</div>
                </div>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-600">{user.gender}</span>
              </div>
              <div className="col-span-2 flex items-center space-x-1">
                <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                <span className="text-sm font-medium text-gray-900">
                  {user.hearts}
                </span>
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-sm text-gray-600">{user.joined}</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                >
                  <CircleArrowRight className="h-4 w-4 text-pink-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          {/* <PaginationInfo
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          /> */}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisiblePages={7}
          />
        </div>
      </CardContent>
    </Card>
  )
}
