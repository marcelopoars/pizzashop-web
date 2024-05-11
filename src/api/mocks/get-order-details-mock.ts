import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'Ana Maria',
      email: 'ana@email.com',
      phone: '999999999',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1400,
        product: { name: 'Pizza Calabresa' },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 1700,
        product: { name: 'Pizza Basca' },
        quantity: 2,
      },
    ],
    totalInCents: 4800,
  })
})
