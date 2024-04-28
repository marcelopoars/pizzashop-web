import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api'
import { Button, Input, Label } from '@/components'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campro obrigatório' })
    .email({ message: 'Email inválido' }),
})

type SignInForm = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email })

      toast.success('Um link de autenticação foi enviado para seu email.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  console.log(errors.email)

  return (
    <>
      <Helmet title="Login" />

      <div className="w-[380px] space-y-6 p-8">
        <Button asChild variant={'ghost'} className="absolute right-10 top-10">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando link...' : 'Acessar painel'}
          </Button>
        </form>
      </div>
    </>
  )
}
