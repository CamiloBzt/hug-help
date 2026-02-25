"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { browseServices } from "../../lib/mock-data"
import {
  ArrowLeft,
  Camera,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react"

export function ClientRequestServiceScreen() {
  const { goBack, navigate, params } = useNavigation()
  const service = browseServices.find((s) => s.id === params.serviceId)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!service) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Servicio no encontrado</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h2 className="mt-5 text-center text-lg font-bold text-foreground">
          Solicitud enviada
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground leading-relaxed">
          Tu solicitud ha sido enviada a {service.providerName}. Te
          notificaremos cuando responda.
        </p>
        <button
          type="button"
          onClick={() => navigate("client-my-services")}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          Ver mis servicios
        </button>
        <button
          type="button"
          onClick={() => navigate("client-home")}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold text-foreground"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
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
        <h1 className="text-base font-semibold text-foreground">
          Solicitar servicio
        </h1>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
        {/* Service summary */}
        <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
          <img
            src={service.images[0] || "/placeholder.svg"}
            alt={service.title}
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {service.providerName}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-foreground">
            Describe tu problema
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explica con detalle que necesitas..."
            className="mt-2 h-28 w-full resize-none rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Photos */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-foreground">
            Fotos (opcional)
          </label>
          <button
            type="button"
            className="mt-2 flex h-20 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card text-muted-foreground transition-colors active:border-primary active:text-primary"
          >
            <Camera className="h-5 w-5" />
            <span className="text-sm">Agregar fotos</span>
          </button>
        </div>

        {/* Date & Time */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-semibold text-foreground">
              Fecha preferida
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-semibold text-foreground">
              Hora preferida
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-foreground">
            Ubicacion
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="flex-1 text-sm text-foreground">
              Chapinero, Bogota
            </span>
            <button
              type="button"
              className="text-xs font-medium text-primary"
            >
              Cambiar
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-24" />
      </div>

      {/* Submit button */}
      <div className="border-t border-border bg-card px-5 pb-6 pt-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!description.trim()}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors disabled:opacity-50 disabled:shadow-none"
        >
          Enviar solicitud
        </button>
      </div>
    </div>
  )
}
