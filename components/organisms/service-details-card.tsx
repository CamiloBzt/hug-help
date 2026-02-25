import { Calendar, Clock, MapPin, DollarSign } from "lucide-react"
import { DetailRow } from "../molecules/detail-row"
import { SectionTitle } from "../atoms/section-title"

interface ServiceDetailsCardProps {
  date: string
  time: string
  location: string
  price?: number
  dateLabel?: string
  timeLabel?: string
  locationLabel?: string
  priceLabel?: string
}

export function ServiceDetailsCard({
  date,
  time,
  location,
  price,
  dateLabel = "Fecha preferida",
  timeLabel = "Hora",
  locationLabel = "Ubicacion",
  priceLabel = "Precio del servicio",
}: ServiceDetailsCardProps) {
  return (
    <div className="rounded-xl bg-card p-4 shadow-sm">
      <SectionTitle>Detalles del servicio</SectionTitle>
      <div className="mt-3 flex flex-col gap-3">
        <DetailRow
          icon={Calendar}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          label={date}
          sublabel={dateLabel}
        />
        <DetailRow
          icon={Clock}
          iconBg="bg-accent/10"
          iconColor="text-accent"
          label={time}
          sublabel={timeLabel}
        />
        <DetailRow
          icon={MapPin}
          iconBg="bg-success/10"
          iconColor="text-success"
          label={location}
          sublabel={locationLabel}
        />
        {price !== undefined && (
          <DetailRow
            icon={DollarSign}
            iconBg="bg-primary/10"
            iconColor="text-primary"
            label={`$${price.toLocaleString("es-CO")} COP`}
            sublabel={priceLabel}
            bold
          />
        )}
      </div>
    </div>
  )
}
