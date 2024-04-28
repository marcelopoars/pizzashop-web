import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api'
import { Button, Input, Label } from '@/components'

const signUpSchema = z.object({
  restaurantName: z.string().min(1),
  managerName: z.string().min(1),
  phone: z.string().min(1),
  email: z
    .string()
    .min(1, { message: 'Campro obrigatório' })
    .email({ message: 'Email inválido' }),
})

type SignUpForm = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="w-[380px] space-y-6 p-8">
        <Button asChild variant={'ghost'} className="absolute right-10 top-10">
          <Link to="/sign-in">Login</Link>
        </Button>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Criar conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register('restaurantName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando link...' : 'Finalizar cadastro'}
          </Button>

          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar você concorda com os nossos{' '}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Termos de Serviços
            </a>{' '}
            e{' '}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Polícia de Privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </>
  )
}
