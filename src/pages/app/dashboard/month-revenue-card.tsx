import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { formatCurrency } from '@/utils'

import { MetricsCardSkeleton } from './metrics.card-skeleton'
import { PercentagelDifference } from './percentagelDifference'

export function MontRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base ">Receita total (mês)</CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(monthRevenue?.receipt / 100)}
            </span>
            <p className="text-xs text-muted-foreground">
              <PercentagelDifference amount={monthRevenue?.diffFromLastMonth} />{' '}
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
