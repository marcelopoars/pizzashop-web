import { api } from '@/lib'
import { OrderStatusType } from '@/types'

interface GetOrderDetailsResponse {
  status: OrderStatusType
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

interface getOrderDetailsParams {
  orderId: string
}

export async function getOrderDetails({ orderId }: getOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
