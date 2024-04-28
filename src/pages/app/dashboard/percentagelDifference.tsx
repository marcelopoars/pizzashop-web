interface PercentagelDifference {
  amount: number
}

export function PercentagelDifference({ amount }: PercentagelDifference) {
  if (amount >= 0) {
    return (
      <span className="text-emerald-500 dark:text-emerald-400">{amount}%</span>
    )
  }

  return <span className="text-rose-500 dark:text-rose-400">{amount}%</span>
}
