import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'

import { MetricsCardSkeleton } from './metrics.card-skeleton'
import { PercentagelDifference } from './percentagelDifference'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base ">Pedidos (mês)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount?.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <PercentagelDifference
                amount={monthOrdersAmount?.diffFromLastMonth}
              />{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
