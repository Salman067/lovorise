import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const countries = [
  { name: 'US', users: '4k', progress: 80, color: '#1F2937' },
  { name: 'Canada', users: '3k', progress: 60, color: '#1F2937' },
  { name: 'India', users: '2k', progress: 40, color: '#1F2937' },
]

export function ActiveUsersByCountry() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Active users by country
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>Country</span>
            <span>Active users</span>
          </div>
          {countries.map((country, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  {country.name}
                </span>
                <span className="text-gray-600 font-medium">
                  {country.users}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${country.progress}%`,
                    backgroundColor: country.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
          <Button
            variant="link"
            className="text-blue-500 p-0 h-auto font-medium"
          >
            View more countries
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
