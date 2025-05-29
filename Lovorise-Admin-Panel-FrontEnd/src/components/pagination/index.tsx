import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPrevNext?: boolean
  showFirstLast?: boolean
  maxVisiblePages?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext = true,
  showFirstLast = false,
  maxVisiblePages = 7,
  className,
  size = 'md',
  variant = 'default',
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const halfVisible = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - halfVisible)
    const end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    const pages: (number | string)[] = []
    if (start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-10 w-10 text-base',
  }

  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'sm'

  const visiblePages = getVisiblePages()

  return (
    <div
      className={cn(
        'flex items-center w-full justify-between space-x-1',
        className,
      )}
    >
      {showFirstLast && currentPage > 1 && (
        <Button
          variant={variant === 'default' ? 'ghost' : variant}
          size={buttonSize}
          onClick={() => onPageChange(1)}
          className={cn(
            sizeClasses[size],
            'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
          )}
        >
          First
        </Button>
      )}
      {showPrevNext && (
        <Button
          variant={variant === 'default' ? 'outline' : variant}
          size={buttonSize}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(
            'flex items-center space-x-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200',
            currentPage === 1 && 'opacity-50 cursor-not-allowed',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
      )}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <div
                key={`ellipsis-${index}`}
                className={cn(
                  'flex items-center justify-center',
                  sizeClasses[size],
                )}
              >
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <Button
              key={pageNumber}
              variant={
                isActive ? 'default' : variant === 'default' ? 'ghost' : variant
              }
              size={buttonSize}
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                sizeClasses[size],
                isActive
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              )}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>
      {showPrevNext && (
        <Button
          variant={variant === 'default' ? 'outline' : variant}
          size={buttonSize}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={cn(
            'flex items-center space-x-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200',
            currentPage === totalPages && 'opacity-50 cursor-not-allowed',
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant={variant === 'default' ? 'ghost' : variant}
          size={buttonSize}
          onClick={() => onPageChange(totalPages)}
          className={cn(
            sizeClasses[size],
            'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
          )}
        >
          Last
        </Button>
      )}
    </div>
  )
}
