import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: "sm" | "md"
  showValue?: boolean
  totalReviews?: number
}

const sizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3.5 w-3.5",
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  totalReviews,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {showValue ? (
        <>
          <Star className={`${sizeClasses[size]} fill-accent text-accent`} />
          <span className="text-xs font-medium">{rating}</span>
          {totalReviews !== undefined && (
            <span className="text-[10px] text-muted-foreground">
              ({totalReviews})
            </span>
          )}
        </>
      ) : (
        Array.from({ length: maxStars }).map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
            }`}
          />
        ))
      )}
    </div>
  )
}
