"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { clientContractedServices, clientChatConversations } from "../../lib/mock-data"
import type { RequestStatus } from "../../lib/types"
import {
  Clock,
  CheckCircle2,
  CircleDot,
  Circle,
  Star,
  MessageCircle,
  MapPin,
} from "lucide-react"
import { ProviderLocationMap } from "../organisms/provider-location-map"

const statusConfig: Record<
  RequestStatus,
  { label: string; color: string; bgColor: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pendiente",
    color: "text-accent",
    bgColor: "bg-accent/10",
    icon: Clock,
  },
  accepted: {
    label: "Aceptado",
    color: "text-primary",
    bgColor: "bg-primary/10",
    icon: CheckCircle2,
  },
  in_progress: {
    label: "En curso",
    color: "text-success",
    bgColor: "bg-success/10",
    icon: CircleDot,
  },
  completed: {
    label: "Completado",
    color: "text-success",
    bgColor: "bg-success/10",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelado",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    icon: Circle,
  },
}

type TabKey = "active" | "completed"

export function ClientMyServicesScreen() {
  const { navigate } = useNavigation()
  const [activeTab, setActiveTab] = useState<TabKey>("active")

  const activeServices = clientContractedServices.filter(
    (s) => s.status === "pending" || s.status === "accepted" || s.status === "in_progress",
  )
  const completedServices = clientContractedServices.filter(
    (s) => s.status === "completed" || s.status === "cancelled",
  )
  const displayed = activeTab === "active" ? activeServices : completedServices

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="bg-card px-5 pb-0 pt-12 shadow-sm">
        <h1 className="text-lg font-bold text-foreground">
          Mis servicios
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Servicios que has contratado
        </p>

        {/* Tabs */}
        <div className="mt-4 flex gap-1 rounded-xl bg-muted p-1">
          {(
            [
              { key: "active", label: "Activos", count: activeServices.length },
              { key: "completed", label: "Finalizados", count: completedServices.length },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
              <span
                className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pb-24 pt-4">
        {displayed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-16">
            <Circle className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-foreground">
              Sin servicios {activeTab === "active" ? "activos" : "finalizados"}
            </p>
          </div>
        ) : (
          displayed.map((service) => {
            const status = statusConfig[service.status]
            const StatusIcon = status.icon
            return (
              <div
                key={service.id}
                className="shrink-0 overflow-hidden rounded-xl bg-card shadow-sm"
              >
                {/* Clickable main area */}
                <button
                  type="button"
                  onClick={() =>
                    navigate("client-contracted-detail", {
                      serviceId: service.id,
                    })
                  }
                  className="w-full p-4 text-left transition-colors active:bg-muted/50"
                >
                  {/* Status & title */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {service.serviceTitle}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[8px] font-bold text-primary">
                          {service.providerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {service.providerName}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.bgColor} ${status.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>

                  {/* Details row */}
                  <div className="mt-3 flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px]">
                        {service.date} - {service.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-[10px] truncate max-w-[120px]">
                        {service.location}
                      </span>
                    </div>
                  </div>

                  {/* Real-time location for active services */}
                  {(service.status === "in_progress" || service.status === "accepted") && (
                    <div className="mt-3">
                      <ProviderLocationMap
                        providerName={service.providerName}
                        lat={service.providerLat}
                        lng={service.providerLng}
                        simulateMovement={service.status === "in_progress"}
                      />
                    </div>
                  )}

                </button>

                {/* Price & actions */}
                <div className="flex items-center justify-between border-t border-border px-4 py-3">
                  <span className="text-sm font-bold text-primary">
                    ${service.price.toLocaleString("es-CO")} COP
                  </span>
                  <div className="flex items-center gap-2">
                    {service.status !== "completed" && service.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          const chat2 = clientChatConversations.find(
                            (c) => c.relatedRequestId === service.id,
                          )
                          if (chat2) navigate("chat", { chatId: chat2.id })
                        }}
                        className="flex h-8 items-center gap-1.5 rounded-lg bg-secondary px-3 text-xs font-medium text-primary"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Chat
                      </button>
                    )}
                    {service.status === "completed" && !service.rated && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate("client-rate-service", {
                            serviceId: service.id,
                          })
                        }}
                        className="flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-medium text-accent-foreground"
                      >
                        <Star className="h-3.5 w-3.5" />
                        Calificar
                      </button>
                    )}
                    {service.status === "completed" && service.rated && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        Calificado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
