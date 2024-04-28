import { useQuery } from '@tanstack/react-query'

import { getOrderDetails } from '@/api'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  OrderStatus,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { formatCurrency, formatDistanceToNow } from '@/utils'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: orderDetails } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open, // só faz a chamada na API se modal isOpen
  })

  if (!orderDetails) {
    return null
  }

  const {
    status,
    customer: { name, phone, email },
    orderItems,
    createdAt,
    totalInCents,
  } = orderDetails

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedid: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <OrderStatus status={status} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">{name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {phone ?? 'Não informado'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">{email}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">
                {formatDistanceToNow(createdAt)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.map(
              ({ id, product: { name }, quantity, priceInCents }) => (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell className="text-right">{quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(priceInCents / 100)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency((priceInCents / 100) * quantity)}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-bold">
                {formatCurrency(totalInCents / 100)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
