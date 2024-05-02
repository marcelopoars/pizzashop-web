import { Link } from 'react-router-dom'

export function Error() {
  // const error = useRouteError() as Error

  // console.log(error)

  return (
    <div className="grid h-screen place-items-center text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Ops! Algo deu errado.</h1>

        <p className="text-muted-foreground">
          Voltar para o{' '}
          <Link to="/" className="text-sky-600 dark:text-sky-400">
            Dashboard
          </Link>
        </p>
      </div>
    </div>
  )
}
