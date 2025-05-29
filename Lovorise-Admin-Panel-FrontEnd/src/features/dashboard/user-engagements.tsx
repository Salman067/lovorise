import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'

const engagements = [
  { name: 'Swipe', percentage: 75, color: '#EC4899' },
  { name: 'Event', percentage: 55, color: '#F97316' },
  { name: 'Reels', percentage: 50, color: '#10B981' },
  { name: 'Chat', percentage: 45, color: '#1F2937' },
  { name: 'Others', percentage: 20, color: '#F3E8FF' },
]

const filterOptions = {
  category: [
    'All Categories',
    'Social',
    'Entertainment',
    'Communication',
    'Utility',
  ],
  timePeriod: [
    'Last 7 days',
    'Last 30 days',
    'Last 3 months',
    'Last 6 months',
    'Last year',
  ],
  platforms: ['All Platforms', 'iOS', 'Android', 'Web', 'Desktop'],
  activityType: [
    'All Activities',
    'Active',
    'Passive',
    'Interactive',
    'Background',
  ],
  subscriptionStatus: ['All Users', 'Premium', 'Free', 'Trial', 'Expired'],
}

export function UserEngagements() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: 'All Categories',
    timePeriod: 'Last 30 days',
    platforms: 'All Platforms',
    activityType: 'All Activities',
    subscriptionStatus: 'All Users',
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const applyFilters = () => {
    setIsFilterOpen(false)
    console.log('Applied filters:', filters)
  }

  useEffect(() => {
    if (chartRef.current) {
      const chart = Highcharts.chart(chartRef.current, {
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          height: 200,
        },
        title: {
          text: '',
        },
        plotOptions: {
          pie: {
            innerSize: '60%',
            dataLabels: {
              enabled: false,
            },
            showInLegend: false,
            borderWidth: 0,
            states: {
              hover: {
                halo: {
                  size: 0,
                },
              },
            },
          },
        },
        series: [
          {
            name: 'Engagement',
            data: engagements.map((engagement) => ({
              name: engagement.name,
              y: engagement.percentage,
              color: engagement.color,
            })),
            type: 'pie',
          },
        ],
        tooltip: {
          backgroundColor: '#1F2937',
          borderColor: '#374151',
          style: {
            color: '#F9FAFB',
          },
          formatter: function () {
            const point = (this as any).point
            return `<b>${point.name}</b><br/>${point.y} users`
          },
        },
        credits: {
          enabled: false,
        },
      })

      return () => {
        chart.destroy()
      }
    }
  }, [filters])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            User Engagements
          </CardTitle>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SlidersHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-4">User Engagements</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Filter by
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-pink-500 rounded"></div>
                    <div className="flex-1">
                      <Select
                        value={filters.category}
                        onValueChange={(value) =>
                          handleFilterChange('category', value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.category.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <div className="flex-1">
                      <Select
                        value={filters.timePeriod}
                        onValueChange={(value) =>
                          handleFilterChange('timePeriod', value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.timePeriod.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <div className="flex-1">
                      <Select
                        value={filters.platforms}
                        onValueChange={(value) =>
                          handleFilterChange('platforms', value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Platforms" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.platforms.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-800 rounded"></div>
                    <div className="flex-1">
                      <Select
                        value={filters.activityType}
                        onValueChange={(value) =>
                          handleFilterChange('activityType', value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Activity Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.activityType.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-pink-200 rounded"></div>
                    <div className="flex-1">
                      <Select
                        value={filters.subscriptionStatus}
                        onValueChange={(value) =>
                          handleFilterChange('subscriptionStatus', value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Subscription Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.subscriptionStatus.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={applyFilters}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-6">
          <div ref={chartRef} className="w-full h-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">78%</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {engagements.map((engagement, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: engagement.color }}
                ></div>
                <span className="text-sm text-gray-600">{engagement.name}</span>
              </div>
              <span className="font-semibold">{engagement.percentage}%</span>
            </div>
          ))}
        </div>

        {Object.values(filters).some((filter) => !filter.startsWith('All')) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(filters).map(([key, value]) => {
                if (!value.startsWith('All') && !value.startsWith('Last')) {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {value}
                      <button
                        onClick={() =>
                          handleFilterChange(
                            key,
                            filterOptions[key as keyof typeof filterOptions][0],
                          )
                        }
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )
                }
                return null
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
