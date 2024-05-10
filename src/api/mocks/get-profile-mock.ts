import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'user-id',
      name: 'Ana Maria',
      email: 'ana.maria@email.com',
      phone: '99 9999 9999',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
