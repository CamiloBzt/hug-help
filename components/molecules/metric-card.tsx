import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  color: string
}

export function MetricCard({ icon: Icon, label, value, color }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-card p-4 shadow-sm">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="h-4.5 w-4.5" style={{ color }} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xl font-bold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}
