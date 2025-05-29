'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/pagination'
import { Breadcrumb } from '@/components/breadcrumb'
import {
  Search,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  SlidersHorizontal,
} from 'lucide-react'
import { useState } from 'react'

const countryData = [
  {
    country: 'United States',
    activeUsers: 4000,
    percentage: 25,
    trend: { value: 5, direction: 'up' as const },
  },
  {
    country: 'Canada',
    activeUsers: 3000,
    percentage: 18.75,
    trend: { value: 1.5, direction: 'down' as const },
  },
  {
    country: 'India',
    activeUsers: 2000,
    percentage: 12.5,
    trend: { value: 8, direction: 'up' as const },
  },
  {
    country: 'China',
    activeUsers: 1000,
    percentage: 6.25,
    trend: { value: 2, direction: 'down' as const },
  },
  {
    country: 'Japan',
    activeUsers: 840,
    percentage: 5.25,
    trend: { value: 5, direction: 'up' as const },
  },
  {
    country: 'Germany',
    activeUsers: 750,
    percentage: 4.69,
    trend: { value: 5, direction: 'up' as const },
  },
  {
    country: 'UK',
    activeUsers: 680,
    percentage: 4.25,
    trend: { value: 5, direction: 'down' as const },
  },
  {
    country: 'Australia',
    activeUsers: 600,
    percentage: 3.75,
    trend: { value: 1, direction: 'up' as const },
  },
  {
    country: 'Brazil',
    activeUsers: 550,
    percentage: 3.44,
    trend: { value: 1.8, direction: 'down' as const },
  },
  {
    country: 'South Korea',
    activeUsers: 500,
    percentage: 3.13,
    trend: { value: 2.3, direction: 'up' as const },
  },
]

export default function ActiveUsersByCountryTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<
    'country' | 'users' | 'percentage' | 'trend'
  >('users')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const breadcrumbItems = [
    { label: 'User Attributes', href: '/users' },
    { label: 'Active Users by Country', isActive: true },
  ]

  const filteredAndSortedData = countryData
    .filter((country) =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'country':
          aValue = a.country
          bValue = b.country
          break
        case 'users':
          aValue = a.activeUsers
          bValue = b.activeUsers
          break
        case 'percentage':
          aValue = a.percentage
          bValue = b.percentage
          break
        case 'trend':
          aValue = a.trend.value
          bValue = b.trend.value
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatPercentage = (num: number) => {
    return `${num}%`
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Active Users by Country
          </h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <SlidersHorizontal className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        <Breadcrumb items={breadcrumbItems} className="mb-4" />
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
          <button
            onClick={() => handleSort('country')}
            className="col-span-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
          >
            Country
          </button>
          <button
            onClick={() => handleSort('users')}
            className="col-span-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
          >
            Active Users
          </button>
          <button
            onClick={() => handleSort('percentage')}
            className="col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
          >
            Percentage
          </button>
          <button
            onClick={() => handleSort('trend')}
            className="col-span-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
          >
            Trend
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredAndSortedData.map((country, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-4 flex items-center">
                <span className="text-sm text-gray-900 font-medium">
                  {country.country}
                </span>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="text-sm text-gray-600">
                  {formatNumber(country.activeUsers)}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-600">
                  {formatPercentage(country.percentage)}
                </span>
              </div>
              <div className="col-span-3 flex justify-end items-center space-x-1">
                {country.trend.direction === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    country.trend.direction === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {country.trend.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center px-6 py-4 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            maxVisiblePages={7}
          />
        </div>
      </CardContent>
    </Card>
  )
}
