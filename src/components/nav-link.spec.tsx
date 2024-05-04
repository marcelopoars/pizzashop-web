import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe(':: components :: NavLink', () => {
  it('should highlight the nav link when is the current page', () => {
    const wrapper = render(
      <>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/dashboard']}>
              {children}
            </MemoryRouter>
          )
        },
      },
    )

    // wrapper.debug()

    expect(wrapper.getByText('Dashboard').dataset.current).toBe('true')
    expect(wrapper.getByText('Orders').dataset.current).toBe('false')
  })
})
