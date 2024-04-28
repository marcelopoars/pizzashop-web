import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import {
  approveOrder,
  cancelOrder,
  deliverOrder,
  dispatchOrder,
  GetOrdersResponse,
} from '@/api'
import {
  Button,
  Dialog,
  DialogTrigger,
  OrderStatus,
  TableCell,
  TableRow,
} from '@/components'
import { OrderStatusType } from '@/types'
import { formatCurrency, formatDistanceToNow } from '@/utils'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  orderId: string
  createdAt: string
  status: OrderStatusType
  customerName: string
  total: number
}

export function OrderTableRow({
  orderId,
  createdAt,
  customerName,
  total,
  status,
}: OrderTableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  async function handleCancelOrder() {
    await cancelOrderFn({ orderId })
  }

  const isDisabledButton = ['canceled', 'delivering', 'delivered'].includes(
    status,
  )

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size={'xs'}
              aria-label="Detalhes do pedido"
            >
              <Search className="size-3" />
            </Button>
          </DialogTrigger>
          <OrderDetails open={isModalOpen} orderId={orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs">{orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCurrency(total / 100)}
      </TableCell>
      <TableCell>
        {status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Aprovar
          </Button>
        )}

        {status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({ orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Em entrega
          </Button>
        )}

        {status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({ orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          onClick={handleCancelOrder}
          disabled={isDisabledButton || isCancelingOrder}
        >
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
