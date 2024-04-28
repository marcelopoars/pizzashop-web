import { useQuery } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { getPopularProducts } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'

const COLORS = [
  colors.amber[500],
  colors.emerald[500],
  colors.rose[500],
  colors.sky[500],
  colors.violet[500],
]

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })

  return (
    <Card className="col-span-3">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Produtos populares</CardTitle>
        <BarChart className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {popularProducts && (
          <ResponsiveContainer width={'100%'} height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                dataKey={'amount'}
                nameKey={'product'}
                cx={'50%'}
                cy={'50%'}
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index]?.product
                            .substring(0, 12)
                            .concat('...')
                        : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="cursor-pointer stroke-background transition hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
