import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components'

const data = [
  { date: '10/01', revenue: 1455 },
  { date: '11/01', revenue: 855 },
  { date: '12/01', revenue: 3455 },
  { date: '13/01', revenue: 955 },
  { date: '14/01', revenue: 1155 },
  { date: '15/01', revenue: 1355 },
  { date: '16/01', revenue: 2455 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle className="text-base">Receita no período</CardTitle>
        <CardDescription>Receita diária no período</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={'100%'} height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey={'date'} axisLine={false} tickLine={false} dy={16} />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              // width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
