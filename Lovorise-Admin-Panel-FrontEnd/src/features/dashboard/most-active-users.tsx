import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const users = [
  {
    name: 'Benny Chagur',
    time: '18 hrs',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Chynita Heree',
    time: '16 hrs',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    name: 'David Yers',
    time: '15 hrs',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Hayder Jahid',
    time: '14 hrs',
    avatar: '/placeholder.svg?height=40&width=40',
  },
]

interface User {
  name: string;
  avatar: string;
  activity_score: number;
  activity_icon: string;
  time: string; 
}

export function MostActiveUsers() {

const [mostActiveUser, setMostActiveUser] = useState<User[]>([]);

const formatTimeAgo = (isoTime: string): string => {
  if (!isoTime || isoTime === "0001-01-01T00:00:00Z") {
    return "N/A";
  }

  const parsedDate = new Date(isoTime);
  const past = parsedDate.getTime();

  if (isNaN(past)) return "N/A";

  const now = Date.now();
  const diffMs = now - past;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} hrs`;
};



const mostActiveUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://localhost:4000/api/dashboard/users/most-active", {
      method: "GET",
      headers: {
        "Authorization": "Bearer admin_token_123",
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: { users: User[] } = await response.json();

    const usersWithFormattedTime = data.users.map((user: User) => ({
      ...user,
      time: formatTimeAgo(user.time)
    }));

    setMostActiveUser(usersWithFormattedTime);
    return usersWithFormattedTime;
  } catch (error) {
    console.error("Failed to fetch most active users:", error);
    return [];
  }
};


  useEffect(()=>{
mostActiveUsers();
  },[])
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Most Active</CardTitle>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mostActiveUser.map((user, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user.avatar || '/placeholder.svg'}
                  alt={user.name}
                />
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">{user.name}({user.activity_icon})</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">{user.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
