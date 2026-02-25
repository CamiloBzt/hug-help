import type { RequestStatus } from "../../lib/types"
import { Clock, CheckCircle2, CircleDot } from "lucide-react"

const steps = [
  { key: "pending" as const, label: "Solicitud enviada", icon: Clock },
  { key: "accepted" as const, label: "Proveedor acepto", icon: CheckCircle2 },
  { key: "in_progress" as const, label: "Servicio en curso", icon: CircleDot },
  { key: "completed" as const, label: "Servicio completado", icon: CheckCircle2 },
]

const statusOrder = ["pending", "accepted", "in_progress", "completed"]

interface StatusTimelineProps {
  currentStatus: RequestStatus
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIdx = statusOrder.indexOf(currentStatus)

  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, idx) => {
        const stepIdx = statusOrder.indexOf(step.key)
        const isReached = stepIdx <= currentIdx
        const StepIcon = step.icon

        return (
          <div key={step.key} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  isReached
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <StepIcon className="h-3.5 w-3.5" />
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`my-0.5 h-5 w-0.5 ${
                    isReached && stepIdx < currentIdx ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
            <span
              className={`pt-1 text-xs font-medium ${
                isReached ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
