import { api } from '@/lib'

interface CancelOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
