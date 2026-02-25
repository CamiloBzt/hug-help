"use client"

import { useNavigation } from "../../lib/navigation"
import { currentProvider, reviews } from "../../lib/mock-data"
import {
  Star,
  BadgeCheck,
  Crown,
  ChevronRight,
  CreditCard,
  Bell,
  Shield,
  CircleHelp,
  LogOut,
  Edit,
  Mail,
  Phone,
  ArrowLeftRight,
} from "lucide-react"

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[0]
}) {
  return (
    <div className="rounded-xl bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">
          {review.clientName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-xs font-medium text-foreground">
            {review.clientName}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {review.serviceTitle}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < review.rating
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted"
                }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {review.comment}
      </p>
    </div>
  )
}

export function ProfileScreen() {
  const { navigate, setUserMode } = useNavigation()

  const menuItems = [
    {
      icon: ArrowLeftRight,
      label: "Cambiar a modo cliente",
      accent: true,
      action: () => setUserMode("client"),
    },
    {
      icon: CreditCard,
      label: "Suscripcion",
      value: "Premium",
      action: () => navigate("subscriptions"),
    },
    {
      icon: Bell,
      label: "Notificaciones",
      action: () => {},
    },
    {
      icon: Shield,
      label: "Verificacion de identidad",
      value: "Aprobado",
      action: () => {},
    },
    {
      icon: CircleHelp,
      label: "Ayuda y soporte",
      action: () => {},
    },
  ]

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background">
      {/* Profile header */}
      <div className="flex flex-col items-center bg-card px-5 pt-12 pb-5">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            CM
          </div>
          <button
            type="button"
            className="absolute -right-1 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-md"
            aria-label="Editar foto"
          >
            <Edit className="h-3.5 w-3.5 text-primary" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <h2 className="text-lg font-bold text-foreground">
            {currentProvider.name}
          </h2>
          {currentProvider.verified && (
            <BadgeCheck className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-1">
          <Crown className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-accent">
            Plan Premium
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex w-full items-center justify-around rounded-xl bg-muted p-3">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-foreground">
              {currentProvider.completedServices}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Completados
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-lg font-bold text-foreground">
                {currentProvider.rating}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Calificacion
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-foreground">
              {currentProvider.totalReviews}
            </span>
            <span className="text-[10px] text-muted-foreground">Resenas</span>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="mx-5 mt-4 rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            {currentProvider.email}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            {currentProvider.phone}
          </span>
        </div>
      </div>

      {/* Bio */}
      <div className="mx-5 mt-3 rounded-xl bg-card p-4 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Acerca de mi
        </span>
        <p className="mt-2 text-sm text-foreground leading-relaxed">
          {currentProvider.bio}
        </p>
      </div>

      {/* Menu */}
      <div className="mx-5 mt-4 rounded-xl bg-card shadow-sm">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={`flex w-full items-center gap-3 px-4 py-3.5 transition-colors active:bg-muted ${i < menuItems.length - 1 ? "border-b border-border" : ""
                }`}
            >
              <Icon className={`h-5 w-5 ${"accent" in item && item.accent ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`flex-1 text-left text-sm ${"accent" in item && item.accent ? "font-semibold text-primary" : "text-foreground"}`}>
                {item.label}
              </span>
              {item.value && (
                <span className="text-xs text-muted-foreground">
                  {item.value}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          )
        })}
      </div>

      {/* Reviews */}
      <div className="mx-5 mt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Resenas recientes
          </span>
          <span className="text-xs text-primary font-medium">Ver todas</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mx-5 mt-6 mb-4">
        <button
          type="button"
          onClick={() => navigate("login")}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive text-sm font-semibold text-destructive transition-colors active:bg-destructive/5"
        >
          <LogOut className="h-4.5 w-4.5" />
          Cerrar Sesion
        </button>
      </div>
    </div>
  )
}
