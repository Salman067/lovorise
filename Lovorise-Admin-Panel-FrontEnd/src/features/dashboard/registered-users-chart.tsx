import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'

interface RegisteredUsersData {
  total_users: number
  premium_users: number
  free_users: number
  premium_percentage: number
}

export function RegisteredUsersChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<RegisteredUsersData | null>(null)
  const chartInstance = useRef<Highcharts.Chart | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/dashboard/users/registered`, {
          headers: {
            Authorization: 'Bearer admin_token_123',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const jsonData: RegisteredUsersData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Failed to fetch registered users:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!chartRef.current) return

    chartInstance.current = Highcharts.chart(chartRef.current, {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        height: 200,
      },
      title: { text: '' },
      plotOptions: {
        pie: {
          innerSize: '60%',
          dataLabels: { enabled: false },
          showInLegend: false,
          borderWidth: 0,
          states: { hover: { halo: { size: 0 } } },
        },
      },
      series: [
        {
          name: 'Users',
          data: [
            { name: 'Premium Plan', y: 0, color: '#EC4899' },
            { name: 'Free Plan', y: 0, color: '#1F2937' },
          ],
          type: 'pie',
        },
      ],
      tooltip: {
        backgroundColor: '#1F2937',
        borderColor: '#374151',
        style: { color: '#F9FAFB' },
        formatter: function () {
          const point = (this as any).point
          return `<b>${point.name}</b><br/>${point.y} users`
        },
      },
      credits: { enabled: false },
    })

    return () => {
      chartInstance.current?.destroy()
      chartInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (!data || !chartInstance.current) return

    chartInstance.current.series[0].setData([
      { name: 'Premium Plan', y: data.premium_users, color: '#EC4899' },
      { name: 'Free Plan', y: data.free_users, color: '#1F2937' },
    ])
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Registered Users</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full h-48 mb-4">
          <div ref={chartRef} className="w-full h-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{data?.total_users ?? '-'}</div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span className="text-sm text-gray-600">Premium Plan</span>
            </div>
            <span className="font-semibold">{data?.premium_users ?? '-'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-800 rounded"></div>
              <span className="text-sm text-gray-600">Free Plan</span>
            </div>
            <span className="font-semibold">{data?.free_users ?? '-'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
