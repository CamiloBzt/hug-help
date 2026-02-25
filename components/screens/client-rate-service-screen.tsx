"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { clientContractedServices } from "../../lib/mock-data"
import { ArrowLeft, Star, Camera, CheckCircle2 } from "lucide-react"

export function ClientRateServiceScreen() {
  const { goBack, navigate, params } = useNavigation()
  const service = clientContractedServices.find(
    (s) => s.id === params.serviceId,
  )
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
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
          Gracias por tu calificacion
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground leading-relaxed">
          Tu opinion ayuda a otros usuarios a encontrar los mejores servicios.
        </p>
        <button
          type="button"
          onClick={() => navigate("client-my-services")}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          Volver a mis servicios
        </button>
      </div>
    )
  }

  const displayRating = hoverRating || rating

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
          Calificar servicio
        </h1>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
        {/* Service info */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            {service.providerName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h3 className="mt-3 text-base font-semibold text-foreground">
            {service.serviceTitle}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            por {service.providerName}
          </p>
        </div>

        {/* Star rating */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm font-medium text-foreground">
            Como fue tu experiencia?
          </p>
          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    i < displayRating
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted"
                  }`}
                />
              </button>
            ))}
          </div>
          {displayRating > 0 && (
            <span className="mt-2 text-sm font-medium text-accent">
              {
                ["", "Malo", "Regular", "Bueno", "Muy bueno", "Excelente"][
                  displayRating
                ]
              }
            </span>
          )}
        </div>

        {/* Comment */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-foreground">
            Comentario (opcional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuenta tu experiencia con este servicio..."
            className="mt-2 h-28 w-full resize-none rounded-xl border border-border bg-card px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Photos */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-foreground">
            Fotos del resultado (opcional)
          </label>
          <button
            type="button"
            className="mt-2 flex h-20 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card text-muted-foreground transition-colors active:border-primary active:text-primary"
          >
            <Camera className="h-5 w-5" />
            <span className="text-sm">Agregar fotos</span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-border bg-card px-5 pb-6 pt-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={rating === 0}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors disabled:opacity-50 disabled:shadow-none"
        >
          Enviar calificacion
        </button>
      </div>
    </div>
  )
}
