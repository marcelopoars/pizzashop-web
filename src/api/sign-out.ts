import { api } from '@/lib'

export async function signOut() {
  await api.post('/sign-out')
}
