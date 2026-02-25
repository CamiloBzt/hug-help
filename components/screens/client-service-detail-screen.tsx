"use client"

import { useNavigation } from "../../lib/navigation"
import { browseServices, reviews } from "../../lib/mock-data"
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react"
import { ProviderLocationMap } from "../organisms/provider-location-map"

function formatPrice(price: number | "negotiable") {
  if (price === "negotiable") return "Negociable"
  return `$${price.toLocaleString("es-CO")}`
}

export function ClientServiceDetailScreen() {
  const { navigate, goBack, params } = useNavigation()
  const service = browseServices.find((s) => s.id === params.serviceId)

  if (!service) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Servicio no encontrado</p>
      </div>
    )
  }

  const providerReviews = reviews.slice(0, 3)

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* Hero image */}
      <div className="relative">
        <img
          src={service.images[0] || "/placeholder.svg"}
          alt={service.title}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          type="button"
          onClick={goBack}
          className="absolute left-4 top-11 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="absolute right-4 top-11 flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
            aria-label="Compartir"
          >
            <Share2 className="h-4 w-4 text-foreground" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
            aria-label="Favorito"
          >
            <Heart className="h-4 w-4 text-foreground" />
          </button>
        </div>
        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="px-5 pt-4">
          <h1 className="text-lg font-bold text-foreground">
            {service.title}
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-semibold text-foreground">
                {service.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({service.totalReviews} resenas)
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{service.distance}</span>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-secondary p-3.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Precio
            </span>
            <p className="mt-0.5 text-xl font-bold text-primary">
              {formatPrice(service.price)}
              {service.price !== "negotiable" && (
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  COP
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 px-5">
          <h2 className="text-sm font-semibold text-foreground">
            Descripcion
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Provider card */}
        <div className="mt-4 mx-5 rounded-xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {service.providerName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-semibold text-foreground">
                  {service.providerName}
                </h3>
                {service.providerVerified && (
                  <BadgeCheck className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-xs font-medium text-foreground">
                  {service.providerRating}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  - {service.location}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate("chat", { participantName: service.providerName })
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
            >
              <MessageCircle className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Location map */}
        <div className="mt-4 px-5">
          <h2 className="text-sm font-semibold text-foreground">
            Ubicacion del proveedor
          </h2>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-foreground">{service.location}</span>
          </div>
          <div className="mt-2">
            <ProviderLocationMap
              providerName={service.providerName}
              lat={service.providerLat}
              lng={service.providerLng}
            />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-4 px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Resenas</h2>
            <span className="text-xs text-primary font-medium">Ver todas</span>
          </div>
          <div className="mt-2 flex flex-col gap-2.5">
            {providerReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl bg-card p-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-primary">
                    {review.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-foreground">
                      {review.clientName}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-2.5 w-2.5 ${
                          i < review.rating
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 border-t border-border bg-card px-5 pb-6 pt-3">
        <button
          type="button"
          onClick={() =>
            navigate("client-request-service", { serviceId: service.id })
          }
          className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors active:bg-primary/90"
        >
          Solicitar Servicio
        </button>
      </div>
    </div>
  )
}
