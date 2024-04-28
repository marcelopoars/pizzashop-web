import { formatDistanceToNow as formatDistanceToNowDateFns } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}

export const formatDistanceToNow = (startDate: string) => {
  if (!startDate) return

  return formatDistanceToNowDateFns(startDate, {
    locale: ptBR,
    addSuffix: true,
  })
}
