import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'

import { PercentagelDifference } from './percentagelDifference'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base ">Pedidos (dia)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <PercentagelDifference
                amount={dayOrdersAmount.diffFromYesterday}
              />{' '}
              em relação a ontem
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
