"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { services } from "../../lib/mock-data"
import {
  Plus,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

export function ServicesScreen() {
  const { navigate } = useNavigation()
  const [localServices, setLocalServices] = useState(services)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const toggleActive = (id: string) => {
    setLocalServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card px-5 pt-12 pb-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-foreground">Mis Servicios</h1>
          <p className="text-xs text-muted-foreground">
            {localServices.filter((s) => s.active).length} activos de{" "}
            {localServices.length}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("create-service")}
          className="flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors active:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Nuevo
        </button>
      </div>

      {/* Services list */}
      <div className="flex flex-col gap-3 px-5 pt-4 pb-4">
        {localServices.map((service) => (
          <div
            key={service.id}
            className={`relative overflow-hidden rounded-xl bg-card shadow-sm transition-opacity ${
              !service.active ? "opacity-60" : ""
            }`}
          >
            {/* Service Image */}
            {service.images.length > 0 && (
              <div className="relative h-36 w-full">
                <img
                  src={service.images[0] || "/placeholder.svg"}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
                {!service.active && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                    <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Inactivo
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {service.title}
                    </h3>
                    {!service.active && service.images.length === 0 && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-primary">
                    {service.category}
                  </span>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === service.id ? null : service.id)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors active:bg-muted"
                    aria-label="Opciones"
                  >
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
                  {openMenu === service.id && (
                    <div className="absolute top-8 right-0 z-10 w-40 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null)
                          navigate("create-service", { serviceId: service.id })
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors active:bg-muted"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          toggleActive(service.id)
                          setOpenMenu(null)
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors active:bg-muted"
                      >
                        {service.active ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5" />
                            Desactivar
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5" />
                            Activar
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenMenu(null)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-destructive transition-colors active:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="text-xs font-medium text-foreground">
                      {service.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({service.totalReviews})
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {service.price === "negotiable" ? "Negociable" : `$${service.price.toLocaleString("es-CO")}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
