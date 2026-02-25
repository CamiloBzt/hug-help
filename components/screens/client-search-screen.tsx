"use client"

import { useState, useMemo } from "react"
import { useNavigation } from "../../lib/navigation"
import { browseServices, serviceCategories } from "../../lib/mock-data"
import { ArrowLeft, Search, SlidersHorizontal, X, BadgeCheck, Star, MapPin } from "lucide-react"
import { Chip } from "../atoms/chip"
import { ServiceCard } from "../molecules/service-card"
import { EmptyState } from "../molecules/empty-state"

function formatPrice(price: number | "negotiable") {
  if (price === "negotiable") return "Negociable"
  return `$${price.toLocaleString("es-CO")}`
}

export function ClientSearchScreen() {
  const { navigate, goBack, params } = useNavigation()
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    params.category || null,
  )
  const [sortBy, setSortBy] = useState<"rating" | "price" | "distance">(
    "rating",
  )
  const [showFilters, setShowFilters] = useState(false)

  const filteredServices = useMemo(() => {
    let results = [...browseServices]
    if (selectedCategory) {
      results = results.filter((s) => s.category === selectedCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.providerName.toLowerCase().includes(q),
      )
    }
    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "price") {
      results.sort((a, b) => {
        const pa = a.price === "negotiable" ? 999999 : a.price
        const pb = b.price === "negotiable" ? 999999 : b.price
        return pa - pb
      })
    }
    return results
  }, [query, selectedCategory, sortBy])

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pb-3 pt-12 shadow-sm">
        <button
          type="button"
          onClick={goBack}
          className="flex h-9 w-9 items-center justify-center rounded-full active:bg-muted"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar servicios..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            showFilters ? "bg-primary" : "bg-muted"
          }`}
        >
          <SlidersHorizontal
            className={`h-4 w-4 ${showFilters ? "text-primary-foreground" : "text-foreground"}`}
          />
        </button>
      </div>

      {/* Sort bar */}
      {showFilters && (
        <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
          <span className="shrink-0 text-xs text-muted-foreground">Ordenar por:</span>
          {(
            [
              { key: "rating", label: "Mejor calificado" },
              { key: "price", label: "Menor precio" },
              { key: "distance", label: "Mas cercano" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSortBy(opt.key)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                sortBy === opt.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Category chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        <Chip
          label="Todos"
          active={!selectedCategory}
          onClick={() => setSelectedCategory(null)}
        />
        {serviceCategories.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            active={selectedCategory === cat.label}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === cat.label ? null : cat.label,
              )
            }
          />
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 py-2">
        <span className="text-xs text-muted-foreground">
          {filteredServices.length} servicio
          {filteredServices.length !== 1 ? "s" : ""} encontrado
          {filteredServices.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Results */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-24">
        {filteredServices.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Sin resultados"
            description="Intenta con otra busqueda o categoria"
          />
        ) : (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              category={service.category}
              providerName={service.providerName}
              providerVerified={service.providerVerified}
              rating={service.rating}
              totalReviews={service.totalReviews}
              price={service.price}
              distance={service.distance}
              image={service.images[0]}
              onClick={() =>
                navigate("client-service-detail", { serviceId: service.id })
              }
            />
          ))
        )}
      </div>
    </div>
  )
}
