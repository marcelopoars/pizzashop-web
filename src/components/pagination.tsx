import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6">
        <div>
          <span className="text-sm font-medium">
            Página {pageIndex + 1} de {pages}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="size-8 p-0"
            aria-label="Primeira página"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            aria-label="Página anterior"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            aria-label="Próxima página"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex === pages - 1}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            aria-label="Última página"
            onClick={() => onPageChange(pages - 1)}
            disabled={pageIndex === pages - 1}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
