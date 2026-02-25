"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { serviceCategories } from "../../lib/mock-data"
import { ArrowLeft, Camera, X, DollarSign } from "lucide-react"

export function CreateServiceScreen() {
  const { goBack, params } = useNavigation()
  const isEditing = !!params.serviceId
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [priceType, setPriceType] = useState<"fixed" | "negotiable">("fixed")
  const [price, setPrice] = useState("")
  const [images, setImages] = useState<string[]>([])

  return (
    <div className="flex flex-1 flex-col bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pt-12 pb-3">
        <button
          type="button"
          onClick={goBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-muted"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 pt-4 pb-6">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="service-title"
            className="text-sm font-medium text-foreground"
          >
            Titulo del servicio
          </label>
          <input
            id="service-title"
            type="text"
            placeholder="Ej: Reparacion de tuberias"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category-select"
            className="text-sm font-medium text-foreground"
          >
            Categoria
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            <option value="">Selecciona una categoria</option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="service-description"
            className="text-sm font-medium text-foreground"
          >
            Descripcion
          </label>
          <textarea
            id="service-description"
            rows={4}
            placeholder="Describe tu servicio en detalle..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-xl border border-input bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Precio</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPriceType("fixed")}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                priceType === "fixed"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-input bg-card text-muted-foreground"
              }`}
            >
              Precio fijo
            </button>
            <button
              type="button"
              onClick={() => setPriceType("negotiable")}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                priceType === "negotiable"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-input bg-card text-muted-foreground"
              }`}
            >
              Negociable
            </button>
          </div>
          {priceType === "fixed" && (
            <div className="relative mt-1">
              <DollarSign className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="number"
                placeholder="85,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-16 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-muted-foreground">
                COP
              </span>
            </div>
          )}
        </div>

        {/* Images */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Fotos (max. 5)
          </span>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted"
              >
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/60 text-card"
                  aria-label="Eliminar foto"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                type="button"
                onClick={() => setImages([...images, "placeholder"])}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-input bg-muted/50 transition-colors active:bg-muted"
              >
                <Camera className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">
                  Agregar
                </span>
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={goBack}
          className="mt-2 flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors active:bg-primary/90"
        >
          {isEditing ? "Guardar Cambios" : "Publicar Servicio"}
        </button>
      </div>
    </div>
  )
}
