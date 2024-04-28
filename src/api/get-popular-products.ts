import { api } from '@/lib'

type getPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<getPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
