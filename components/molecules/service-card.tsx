"use client"

import { Avatar } from "../atoms/avatar"
import { StarRating } from "../atoms/star-rating"
import { BadgeCheck, MapPin } from "lucide-react"

function formatPrice(price: number | "negotiable") {
  if (price === "negotiable") return "Negociable"
  return `$${price.toLocaleString("es-CO")}`
}

interface ServiceCardProps {
  title: string
  category: string
  providerName: string
  providerVerified?: boolean
  rating: number
  totalReviews: number
  price: number | "negotiable"
  distance?: string
  image: string
  onClick?: () => void
}

export function ServiceCard({
  title,
  category,
  providerName,
  providerVerified,
  rating,
  totalReviews,
  price,
  distance,
  image,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[140px] overflow-hidden rounded-xl bg-card text-left shadow-sm transition-transform active:scale-[0.98]"
    >
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="h-full w-32 shrink-0 object-cover"
      />
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-primary">
              {category}
            </span>
          </div>
          <h3 className="mt-1.5 text-sm font-semibold leading-tight text-foreground">
            {title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Avatar name={providerName} size="sm" variant="muted" />
            <span className="truncate text-xs text-muted-foreground">
              {providerName}
            </span>
            {providerVerified && (
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={rating} showValue totalReviews={totalReviews} />
            {distance && (
              <div className="flex items-center gap-0.5 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="text-[10px]">{distance}</span>
              </div>
            )}
          </div>
          <span className="text-sm font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </button>
  )
}
