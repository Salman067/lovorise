import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

export function Breadcrumb({
  items,
  className,
  showHome = true,
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      {showHome && (
        <>
          <div className="flex items-center">
            <Home className="h-4 w-4 text-gray-500" />
          </div>
          <ChevronRight className="h-3 w-3 text-gray-400" />
        </>
      )}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                'hover:text-gray-900 transition-colors',
                item.isActive ? 'text-pink-500 font-medium' : 'text-gray-500',
              )}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                item.isActive ? 'text-pink-500 font-medium' : 'text-gray-500',
              )}
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="h-3 w-3 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  )
}
