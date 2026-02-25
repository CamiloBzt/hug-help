"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { browseServices, serviceCategories } from "../../lib/mock-data"
import {
  Search,
  MapPin,
  Star,
  BadgeCheck,
  Wrench,
  Zap,
  Sparkles,
  Paintbrush,
  Hammer,
  KeyRound,
  Refrigerator,
  TreePine,
  ChevronRight,
} from "lucide-react"

const categoryIcons: Record<string, typeof Wrench> = {
  Wrench,
  Zap,
  Sparkles,
  Paintbrush,
  Hammer,
  KeyRound,
  Refrigerator,
  TreePine,
}

function formatPrice(price: number | "negotiable") {
  if (price === "negotiable") return "Negociable"
  return `$${price.toLocaleString("es-CO")}`
}

export function ClientHomeScreen() {
  const { navigate } = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")

  const featured = browseServices.slice(0, 4)

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background">
      {/* Header */}
      <div className="bg-primary px-5 pb-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-foreground/70">Buenos dias</p>
            <h1 className="text-xl font-bold text-primary-foreground">
              Laura Moreno
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate("client-profile")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 text-sm font-bold text-primary-foreground"
          >
            LM
          </button>
        </div>

        {/* Search bar */}
        <button
          type="button"
          onClick={() => navigate("client-search")}
          className="mt-4 flex w-full items-center gap-3 rounded-xl bg-primary-foreground/15 px-4 py-3"
        >
          <Search className="h-5 w-5 text-primary-foreground/60" />
          <span className="text-sm text-primary-foreground/60">
            Buscar servicios...
          </span>
        </button>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary-foreground/70" />
          <span className="text-xs text-primary-foreground/70">
            Chapinero, Bogota
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Categorias</h2>
          <button
            type="button"
            onClick={() => navigate("client-search")}
            className="text-xs font-medium text-primary"
          >
            Ver todas
          </button>
        </div>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {serviceCategories.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Wrench
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  navigate("client-search", { category: cat.label })
                }
                className="flex flex-none flex-col items-center gap-1.5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured services */}
      <div className="mt-5 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Servicios destacados
          </h2>
          <button
            type="button"
            onClick={() => navigate("client-search")}
            className="flex items-center gap-0.5 text-xs font-medium text-primary"
          >
            Ver todos
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {featured.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() =>
                navigate("client-service-detail", { serviceId: service.id })
              }
              className="flex overflow-hidden rounded-xl bg-card text-left shadow-sm transition-transform active:scale-[0.98]"
            >
              <img
                src={service.images[0] || "/placeholder.svg"}
                alt={service.title}
                className="h-28 w-28 flex-none object-cover"
              />
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {service.category}
                    </span>
                    {service.providerVerified && (
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-foreground leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {service.providerName}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-xs font-medium text-foreground">
                      {service.rating}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ({service.totalReviews})
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {formatPrice(service.price)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Nearby section */}
      <div className="mt-5 px-5 pb-6">
        <h2 className="text-sm font-semibold text-foreground">
          Cerca de ti
        </h2>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {browseServices.slice(4).map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() =>
                navigate("client-service-detail", { serviceId: service.id })
              }
              className="flex w-44 flex-none flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm"
            >
              <img
                src={service.images[0] || "/placeholder.svg"}
                alt={service.title}
                className="h-24 w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-1 p-2.5">
                <h3 className="text-xs font-semibold text-foreground leading-tight">
                  {service.title}
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  {service.providerName}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5 fill-accent text-accent" />
                    <span className="text-[10px] font-medium">
                      {service.rating}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {service.distance}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
