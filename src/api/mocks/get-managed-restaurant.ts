import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'restaurant-id',
    name: 'Pizza Shop',
    managerId: 'manager-id',
    description: 'Restaurant description',
    createdAt: new Date(),
    updatedAt: null,
  })
})
