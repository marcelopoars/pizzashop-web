import { cn } from '@/lib'
import { OrderStatusType } from '@/types'

interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMap: Record<
  OrderStatusType,
  { status: string; color: string }
> = {
  pending: { status: 'Pendente', color: 'bg-slate-400' },
  canceled: { status: 'Cancelado', color: 'bg-rose-500' },
  processing: { status: 'Em preparo', color: 'bg-amber-500' },
  delivering: { status: 'Em entrega', color: 'bg-amber-500' },
  delivered: { status: 'Entregue', color: 'bg-emerald-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('size-2 rounded-full', orderStatusMap[status].color)}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].status}
      </span>
    </div>
  )
}
