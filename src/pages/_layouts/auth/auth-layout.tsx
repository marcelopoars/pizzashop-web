import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 ">
      <div className="flex flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-semibold text-foreground">
          <Pizza className="size-5" />
          <span>pizza.shop</span>
        </div>
        <footer className="text-sm">
          {new Date().getFullYear()} &copy; pizza.shop | Painel do parceiro
        </footer>
      </div>

      <div className="relative grid place-items-center">
        <Outlet />
      </div>
    </div>
  )
}
