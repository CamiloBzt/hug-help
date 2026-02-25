"use client"

import { useNavigation } from "../../lib/navigation"
import { clientContractedServices, clientChatConversations } from "../../lib/mock-data"
import { MessageCircle, Star, XCircle } from "lucide-react"
import { ScreenHeader } from "../molecules/screen-header"
import { UserCard } from "../molecules/user-card"
import { StatusBadge } from "../atoms/status-badge"
import { SectionTitle } from "../atoms/section-title"
import { UnreadBadge } from "../atoms/unread-badge"
import { ServiceDetailsCard } from "../organisms/service-details-card"
import { StatusTimeline } from "../organisms/status-timeline"
import { ProviderLocationMap } from "../organisms/provider-location-map"

export function ClientContractedDetailScreen() {
  const { goBack, navigate, params } = useNavigation()
  const service = clientContractedServices.find(
    (s) => s.id === params.serviceId,
  )

  if (!service) return null

  const chat = clientChatConversations.find(
    (c) => c.relatedRequestId === service.id,
  )

  const openChat = () => {
    if (chat) {
      navigate("chat", { chatId: chat.id })
    }
  }

  const isActive =
    service.status === "in_progress" ||
    service.status === "accepted" ||
    service.status === "pending"

  return (
    <div className="flex h-full flex-1 flex-col bg-background">
      <ScreenHeader
        title="Detalle del Servicio"
        onBack={goBack}
        rightAction={<StatusBadge status={service.status} />}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-8 pt-4">
        {/* Provider info */}
        <UserCard
          name={service.providerName}
          subtitle={service.serviceTitle}
          rightAction={
            chat ? (
              <button
                type="button"
                onClick={openChat}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors active:bg-primary/20"
                aria-label="Chat"
              >
                <MessageCircle className="h-4.5 w-4.5 text-primary" />
                {chat.unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5">
                    <UnreadBadge count={chat.unreadCount} />
                  </span>
                )}
              </button>
            ) : undefined
          }
        />

        {/* Service details */}
        <ServiceDetailsCard
          date={service.date}
          time={service.time}
          location={service.location}
          price={service.price}
          dateLabel="Fecha programada"
        />

        {/* Provider location map */}
        {isActive && (
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <SectionTitle>Ubicacion del proveedor</SectionTitle>
            <div className="mt-3">
              <ProviderLocationMap
                providerName={service.providerName}
                lat={service.providerLat}
                lng={service.providerLng}
                simulateMovement={service.status === "in_progress"}
              />
            </div>
          </div>
        )}

        {/* Status timeline */}
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <SectionTitle>Estado del servicio</SectionTitle>
          <div className="mt-3">
            <StatusTimeline currentStatus={service.status} />
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom actions */}
      <div className="border-t border-border bg-card px-5 pb-8 pt-3">
        {chat && (
          <button
            type="button"
            onClick={openChat}
            className="mb-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 text-sm font-semibold text-primary transition-colors active:bg-primary/10"
          >
            <MessageCircle className="h-4 w-4" />
            Chatear con {service.providerName.split(" ")[0]}
            {chat.unreadCount > 0 && (
              <UnreadBadge count={chat.unreadCount} size="md" />
            )}
          </button>
        )}

        {service.status === "completed" && !service.rated && (
          <button
            type="button"
            onClick={() =>
              navigate("client-rate-service", { serviceId: service.id })
            }
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-accent-foreground transition-colors active:bg-accent/90"
          >
            <Star className="h-4 w-4" />
            Calificar servicio
          </button>
        )}

        {service.status === "completed" && service.rated && (
          <div className="flex items-center justify-center gap-1.5 py-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" />
            Ya calificaste este servicio
          </div>
        )}

        {service.status === "pending" && (
          <button
            type="button"
            onClick={goBack}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-destructive text-sm font-semibold text-destructive transition-colors active:bg-destructive/5"
          >
            <XCircle className="h-4 w-4" />
            Cancelar solicitud
          </button>
        )}
      </div>
    </div>
  )
}
