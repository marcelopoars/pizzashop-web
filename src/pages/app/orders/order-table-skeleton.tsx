import { Search } from 'lucide-react'

import { Button, Skeleton, TableCell, TableRow } from '@/components'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Button
          variant="outline"
          size={'xs'}
          aria-label="Detalhes do pedido"
          disabled
        >
          <Search className="size-3" />
        </Button>
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[172px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[148px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[110px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[64px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[92px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[92px]" />
      </TableCell>
    </TableRow>
  ))
}
