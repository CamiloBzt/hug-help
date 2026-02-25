import type { LucideIcon } from "lucide-react"

interface DetailRowProps {
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  label: string
  sublabel: string
  bold?: boolean
}

export function DetailRow({
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  label,
  sublabel,
  bold = false,
}: DetailRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div className="flex flex-col">
        <span
          className={`text-sm ${bold ? "font-bold text-primary" : "font-medium text-foreground"}`}
        >
          {label}
        </span>
        <span className="text-xs text-muted-foreground">{sublabel}</span>
      </div>
    </div>
  )
}
