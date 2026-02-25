import { Avatar } from "../atoms/avatar"
import { StarRating } from "../atoms/star-rating"

interface ReviewCardProps {
  clientName: string
  rating: number
  comment: string
  serviceTitle?: string
}

export function ReviewCard({
  clientName,
  rating,
  comment,
  serviceTitle,
}: ReviewCardProps) {
  return (
    <div className="rounded-xl bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-2">
        <Avatar name={clientName} size="sm" variant="secondary" />
        <div className="flex flex-1 flex-col">
          <span className="text-xs font-medium text-foreground">
            {clientName}
          </span>
          {serviceTitle && (
            <span className="text-[10px] text-muted-foreground">
              {serviceTitle}
            </span>
          )}
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {comment}
      </p>
    </div>
  )
}
