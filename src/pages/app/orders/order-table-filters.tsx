import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'

const orderTableFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderTableFiltersForm = z.infer<typeof orderTableFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<OrderTableFiltersForm>({
      resolver: zodResolver(orderTableFiltersSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter({
    orderId,
    customerName,
    status,
  }: OrderTableFiltersForm) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')

      state.set('page', '1')

      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        className="h-8 w-auto"
        placeholder="ID do pedido"
        {...register('orderId')}
      />

      <Input
        className="h-8 w-[320px]"
        placeholder="Nome do cliente"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 size-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="mr-2 size-4" />
        Limpar filtros
      </Button>
    </form>
  )
}
