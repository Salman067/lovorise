import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import Highcharts from 'highcharts'

const chartData = [
  { month: 'Jan', value: 800 },
  { month: 'Feb', value: 1200 },
  { month: 'Mar', value: 900 },
  { month: 'Apr', value: 1400 },
  { month: 'May', value: 1100 },
  { month: 'Jun', value: 1600 },
  { month: 'Jul', value: 700 },
  { month: 'Aug', value: 1300 },
  { month: 'Sep', value: 1800 },
  { month: 'Oct', value: 1500 },
  { month: 'Nov', value: 1900 },
  { month: 'Dec', value: 2100 },
]

export function OverviewChart() {
  const [activeTab, setActiveTab] = useState('Revenue')
  const [activePeriod, setActivePeriod] = useState('M')
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = Highcharts.chart(chartRef.current, {
        chart: {
          type: 'areaspline',
          backgroundColor: 'transparent',
          height: 300,
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: chartData.map((d) => d.month),
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            style: {
              color: '#9CA3AF',
              fontSize: '12px',
            },
          },
        },
        yAxis: {
          title: {
            text: '',
          },
          labels: {
            style: {
              color: '#9CA3AF',
              fontSize: '12px',
            },
            formatter: function () {
              return '£' + this.value
            },
          },
          gridLineColor: '#F3F4F6',
          min: 0,
          max: 2500,
          tickInterval: 500,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          areaspline: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, 'rgba(59, 130, 246, 0.1)'],
                [1, 'rgba(59, 130, 246, 0.01)'],
              ],
            },
            lineWidth: 2,
            lineColor: '#3B82F6',
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: true,
                  radius: 4,
                },
              },
            },
          },
        },
        series: [
          {
            name: 'Revenue',
            data: chartData.map((d) => d.value),
            type: 'areaspline',
          },
        ],
        tooltip: {
          backgroundColor: '#1F2937',
          borderColor: '#374151',
          style: {
            color: '#F9FAFB',
          },
          formatter: function () {
            return `<b>£${this.y}</b><br/>${this.x}`
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
  }, [activeTab, activePeriod])

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Overview</CardTitle>
          <div className="flex space-x-4">
            <div className="flex space-x-2">
              {['Users', 'Revenue'].map((tab) => (
                <Button
                  key={tab}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} rounded-none`}
                >
                  {tab}
                </Button>
              ))}
            </div>
            <div className="flex space-x-1">
              {['D', 'W', 'M', 'Y'].map((period) => (
                <Button
                  key={period}
                  variant={activePeriod === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActivePeriod(period)}
                  className={`w-8 h-8 p-0 ${activePeriod === period ? 'bg-pink-500 text-white hover:bg-pink-600' : 'text-gray-500'}`}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-2xl font-bold">£ 2500</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">0.8%</span>
            <span className="text-sm text-gray-500">Today</span>
          </div>
        </div>

        <div ref={chartRef} className="w-full"></div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>£ 1500</span>
          <span className="text-green-600">+4.5%</span>
        </div>
      </CardContent>
    </Card>
  )
}
