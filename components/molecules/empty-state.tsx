import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <span className="mt-3 text-sm font-medium text-foreground">{title}</span>
      {description && (
        <span className="mt-1 text-xs text-muted-foreground">
          {description}
        </span>
      )}
    </div>
  )
}
