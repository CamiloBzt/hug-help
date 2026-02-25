"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { providerNotifications } from "../../lib/mock-data"
import {
  Bell,
  FileText,
  MessageCircle,
  Star,
  CheckCircle2,
  Info,
  Trash2,
} from "lucide-react"
import { ScreenHeader } from "../molecules/screen-header"
import type { NotificationType } from "../../lib/types"

const typeConfig: Record<
  NotificationType,
  { icon: typeof Bell; color: string; bg: string }
> = {
  new_request: { icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  request_accepted: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
  },
  request_completed: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/15",
  },
  new_message: {
    icon: MessageCircle,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  new_review: { icon: Star, color: "text-accent", bg: "bg-accent/10" },
  system: { icon: Info, color: "text-muted-foreground", bg: "bg-muted" },
}

export function NotificationsScreen() {
  const { navigate, goBack } = useNavigation()
  const [notifications, setNotifications] = useState(providerNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  function handleTap(notification: (typeof notifications)[0]) {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    )

    // Navigate based on type
    if (notification.type === "new_request" && notification.relatedId) {
      navigate("request-detail", { requestId: notification.relatedId })
    } else if (notification.type === "request_accepted" && notification.relatedId) {
      navigate("request-detail", { requestId: notification.relatedId })
    } else if (notification.type === "request_completed" && notification.relatedId) {
      navigate("request-detail", { requestId: notification.relatedId })
    } else if (notification.type === "new_message" && notification.relatedId) {
      navigate("chat", { chatId: notification.relatedId })
    } else if (notification.type === "new_review") {
      navigate("profile")
    }
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function clearAll() {
    setNotifications((prev) => prev.filter((n) => !n.read))
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-background">
      <ScreenHeader
        title="Notificaciones"
        onBack={goBack}
        rightAction={
          unreadCount > 0 ? (
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-medium text-primary"
            >
              Marcar leidas
            </button>
          ) : undefined
        }
      />

      {/* Unread count + clear */}
      <div className="flex items-center justify-between px-5 py-2">
        <span className="text-xs text-muted-foreground">
          {unreadCount > 0
            ? `${unreadCount} sin leer`
            : "Todas leidas"}
        </span>
        {notifications.some((n) => n.read) && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <Trash2 className="h-3 w-3" />
            Limpiar leidas
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-8">
        {notifications.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Bell className="h-7 w-7 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Sin notificaciones
            </span>
            <span className="text-xs text-muted-foreground">
              Aqui veras tus notificaciones
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type]
              const Icon = config.icon
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => handleTap(notification)}
                  className={`flex items-start gap-3 rounded-xl p-3.5 text-left transition-colors active:bg-muted/80 ${
                    notification.read ? "bg-card" : "bg-primary/5 shadow-sm"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          notification.read
                            ? "font-medium text-foreground"
                            : "font-semibold text-foreground"
                        }`}
                      >
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {notification.message}
                    </span>
                    <span className="mt-0.5 text-[10px] text-muted-foreground/70">
                      {notification.time}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
