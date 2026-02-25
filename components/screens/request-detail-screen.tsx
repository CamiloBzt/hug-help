"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { serviceRequests, chatConversations } from "../../lib/mock-data"
import {
  MessageCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ScreenHeader } from "../molecules/screen-header"
import { UserCard } from "../molecules/user-card"
import { SectionTitle } from "../atoms/section-title"
import { UnreadBadge } from "../atoms/unread-badge"
import { StatusBadge } from "../atoms/status-badge"
import { ServiceDetailsCard } from "../organisms/service-details-card"
import { ProviderLocationMap } from "../organisms/provider-location-map"

function formatDateReadable(dateStr: string) {
  const [y, m, d] = dateStr.split("-")
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  return date.toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

export function RequestDetailScreen() {
  const { goBack, navigate, params } = useNavigation()
  const request = serviceRequests.find((r) => r.id === params.requestId)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!request) return null

  const isPending = request.status === "pending"
  const isAccepted = request.status === "accepted"
  const isInProgress = request.status === "in_progress"
  const chat = chatConversations.find(
    (c) => c.relatedRequestId === request.id,
  )

  const openChat = () => {
    if (chat) {
      navigate("chat", { chatId: chat.id })
    } else {
      navigate("chat", { chatId: "c3", clientName: request.clientName })
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-background">
      <ScreenHeader
        title="Detalle de Solicitud"
        onBack={goBack}
        rightAction={<StatusBadge status={request.status} />}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-8 pt-4">
        {/* Client info */}
        <UserCard
          name={request.clientName}
          subtitle={request.serviceTitle}
          rightAction={
            <button
              type="button"
              onClick={openChat}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors active:bg-primary/20"
              aria-label="Chat"
            >
              <MessageCircle className="h-4.5 w-4.5 text-primary" />
              {chat && chat.unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5">
                  <UnreadBadge count={chat.unreadCount} />
                </span>
              )}
            </button>
          }
        />

        {/* Description */}
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <SectionTitle>Descripcion del problema</SectionTitle>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {request.description}
          </p>
        </div>

        {/* Images from client */}
        {request.images.length > 0 && (
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <SectionTitle>Fotos del cliente</SectionTitle>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {request.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="relative shrink-0 overflow-hidden rounded-lg transition-transform active:scale-95"
                >
                  <img
                    src={img}
                    alt={`Foto ${i + 1} del problema`}
                    className="h-24 w-28 object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors active:bg-black/20">
                    <ImageIcon className="h-5 w-5 text-white opacity-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preferred dates */}
        {request.preferredDates.length > 0 && (
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <SectionTitle>Fechas preferidas del cliente</SectionTitle>
            <div className="mt-3 flex flex-wrap gap-2">
              {request.preferredDates.map((dateStr) => (
                <div
                  key={dateStr}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 ${
                    dateStr === request.date
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-muted/50 text-foreground"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">
                    {formatDateReadable(dateStr)}
                  </span>
                  {dateStr === request.date && (
                    <span className="ml-0.5 rounded bg-primary/10 px-1 py-0.5 text-[9px] font-semibold text-primary">
                      Seleccionada
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service details */}
        <ServiceDetailsCard
          date={request.date}
          time={request.time}
          location={request.location}
          dateLabel="Fecha programada"
          timeLabel="Hora preferida"
        />

        {/* Location map */}
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <SectionTitle>Ubicacion del servicio</SectionTitle>
          <div className="mt-3 overflow-hidden rounded-xl">
            <ProviderLocationMap
              lat={request.locationLat}
              lng={request.locationLng}
              providerName={request.clientName}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-border bg-card px-5 pb-8 pt-3">
        <button
          type="button"
          onClick={openChat}
          className="mb-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 text-sm font-semibold text-primary transition-colors active:bg-primary/10"
        >
          <MessageCircle className="h-4 w-4" />
          {"Chatear con "}
          {request.clientName.split(" ")[0]}
          {chat && chat.unreadCount > 0 && (
            <UnreadBadge count={chat.unreadCount} size="md" />
          )}
        </button>

        {isPending && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-destructive text-sm font-semibold text-destructive transition-colors active:bg-destructive/5"
            >
              <XCircle className="h-4.5 w-4.5" />
              Rechazar
            </button>
            <button
              type="button"
              onClick={goBack}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-success text-sm font-semibold text-success-foreground transition-colors active:bg-success/90"
            >
              <CheckCircle2 className="h-4.5 w-4.5" />
              Aceptar
            </button>
          </div>
        )}
        {isAccepted && (
          <button
            type="button"
            onClick={goBack}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors active:bg-primary/90"
          >
            Iniciar Servicio
          </button>
        )}
        {isInProgress && (
          <button
            type="button"
            onClick={goBack}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-success text-sm font-semibold text-success-foreground transition-colors active:bg-success/90"
          >
            <CheckCircle2 className="h-4.5 w-4.5" />
            Marcar como Completado
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && request.images.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-12 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-12 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {lightboxIndex + 1} / {request.images.length}
          </div>

          {/* Previous */}
          {lightboxIndex > 0 && (
            <button
              type="button"
              onClick={() => setLightboxIndex(lightboxIndex - 1)}
              className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Image */}
          <img
            src={request.images[lightboxIndex]}
            alt={`Foto ${lightboxIndex + 1}`}
            className="max-h-[70vh] max-w-[90vw] rounded-lg object-contain"
            crossOrigin="anonymous"
          />

          {/* Next */}
          {lightboxIndex < request.images.length - 1 && (
            <button
              type="button"
              onClick={() => setLightboxIndex(lightboxIndex + 1)}
              className="absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
