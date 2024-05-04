import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib'

import { SignIn } from './sign-in'

describe(':: components :: SignIn', () => {
  it('should highlight the nav link when is the current page', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter initialEntries={['/sign-in?email=user@email.com']}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        )
      },
    })

    // wrapper.debug()

    const emailInput = wrapper.getByLabelText('Seu email') as HTMLInputElement

    expect(emailInput.value).toEqual('user@email.com')
  })
})
