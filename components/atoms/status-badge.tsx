import type { RequestStatus } from "../../lib/types"
import { Clock, Check, Wrench, CheckCircle2, XCircle } from "lucide-react"

const config: Record<
  RequestStatus,
  { label: string; icon: typeof Clock; bg: string; text: string }
> = {
  pending: { label: "Pendiente", icon: Clock, bg: "bg-accent/10", text: "text-accent" },
  accepted: { label: "Aceptada", icon: Check, bg: "bg-primary/10", text: "text-primary" },
  in_progress: { label: "En curso", icon: Wrench, bg: "bg-success/10", text: "text-success" },
  completed: { label: "Completada", icon: CheckCircle2, bg: "bg-success/15", text: "text-success" },
  cancelled: { label: "Cancelada", icon: XCircle, bg: "bg-muted", text: "text-muted-foreground" },
}

interface StatusBadgeProps {
  status: RequestStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, icon: Icon, bg, text } = config[status]

  return (
    <span
      className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${bg} ${text}`}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {label}
    </span>
  )
}
