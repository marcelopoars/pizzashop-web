import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'

import { PercentagelDifference } from './percentagelDifference'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base ">Pedidos cancelados (mês)</CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <PercentagelDifference
                amount={monthCanceledOrdersAmount?.diffFromLastMonth}
              />{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
