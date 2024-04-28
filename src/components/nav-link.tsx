import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  const isActive = props.to === pathname

  return (
    <Link
      data-current={isActive}
      className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
  )
}
