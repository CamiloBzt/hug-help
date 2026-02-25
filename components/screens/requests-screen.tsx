"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { serviceRequests, chatConversations } from "../../lib/mock-data"
import type { RequestStatus } from "../../lib/types"
import { Clock, ChevronRight, MessageCircle } from "lucide-react"
import { StatusBadge } from "../atoms/status-badge"
import { Avatar } from "../atoms/avatar"
import { FilterChip } from "../atoms/chip"
import { UnreadBadge } from "../atoms/unread-badge"
import { EmptyState } from "../molecules/empty-state"

const tabs: { id: RequestStatus | "all"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "Pendientes" },
  { id: "accepted", label: "Aceptadas" },
  { id: "in_progress", label: "En curso" },
  { id: "completed", label: "Completadas" },
]

export function RequestsScreen() {
  const { navigate } = useNavigation()
  const [activeTab, setActiveTab] = useState<RequestStatus | "all">("all")

  const filtered =
    activeTab === "all"
      ? serviceRequests
      : serviceRequests.filter((r) => r.status === activeTab)

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background">
      {/* Header */}
      <div className="bg-card px-5 pt-12 pb-3">
        <h1 className="text-xl font-bold text-foreground">Solicitudes</h1>
        <p className="text-xs text-muted-foreground">
          {serviceRequests.length} solicitudes en total
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-card px-5 pb-3">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <FilterChip
              key={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* Requests list */}
      <div className="flex flex-col gap-2.5 px-5 pt-4 pb-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="Sin solicitudes"
            description="No hay solicitudes en esta categoria"
          />
        ) : (
          filtered.map((req) => {
            const chat = chatConversations.find(
              (c) => c.relatedRequestId === req.id,
            )
            return (
              <div
                key={req.id}
                className="overflow-hidden rounded-xl bg-card shadow-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate("request-detail", { requestId: req.id })
                  }
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors active:bg-muted"
                >
                  <Avatar name={req.clientName} size="lg" />
                  <div className="flex flex-1 flex-col items-start gap-1">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {req.clientName}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <span className="text-xs font-medium text-primary">
                      {req.serviceTitle}
                    </span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {req.description}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {req.date} - {req.time}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>

                {/* Quick actions bar */}
                <div className="flex items-center border-t border-border">
                  <button
                    type="button"
                    onClick={() =>
                      chat
                        ? navigate("chat", { chatId: chat.id })
                        : navigate("chat", {
                            chatId: "c3",
                            clientName: req.clientName,
                          })
                    }
                    className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-primary transition-colors active:bg-secondary"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat
                    {chat && <UnreadBadge count={chat.unreadCount} />}
                  </button>
                  <div className="h-5 w-px bg-border" />
                  <button
                    type="button"
                    onClick={() =>
                      navigate("request-detail", { requestId: req.id })
                    }
                    className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground transition-colors active:bg-secondary"
                  >
                    Ver detalle
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
