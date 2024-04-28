import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
  updateProfile,
} from '@/api'

import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Textarea,
} from './ui'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileForm = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileForm>({
    mode: 'all',
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileForm) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    // Dados do restaurante antes de ser atualizado
    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    // onSuccess(data, variables, context) {}
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileForm) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizaro o perfil. Tente novamente.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="succsses" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
