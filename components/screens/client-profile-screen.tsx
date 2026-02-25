"use client"

import { useNavigation } from "../../lib/navigation"
import { clientProfile } from "../../lib/mock-data"
import {
  ChevronRight,
  Bell,
  Shield,
  CircleHelp,
  LogOut,
  Edit,
  Mail,
  Phone,
  ArrowLeftRight,
  Briefcase,
} from "lucide-react"

export function ClientProfileScreen() {
  const { navigate, setUserMode } = useNavigation()

  const menuItems = [
    {
      icon: ArrowLeftRight,
      label: "Cambiar a modo proveedor",
      accent: true,
      action: () => setUserMode("provider"),
    },
    {
      icon: Bell,
      label: "Notificaciones",
      action: () => {},
    },
    {
      icon: Shield,
      label: "Privacidad y seguridad",
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
      <div className="flex flex-col items-center bg-card px-5 pb-5 pt-12">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            LM
          </div>
          <button
            type="button"
            className="absolute -right-1 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-md"
            aria-label="Editar foto"
          >
            <Edit className="h-3.5 w-3.5 text-primary" />
          </button>
        </div>
        <h2 className="mt-3 text-lg font-bold text-foreground">
          {clientProfile.name}
        </h2>
        <span className="mt-0.5 text-xs text-muted-foreground">
          Cliente desde{" "}
          {new Date(clientProfile.joinedDate).toLocaleDateString("es-CO", {
            month: "long",
            year: "numeric",
          })}
        </span>

        {/* Stats row */}
        <div className="mt-4 flex w-full items-center justify-around rounded-xl bg-muted p-3">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-foreground">
              {clientProfile.totalServicesRequested}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Servicios
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-foreground">4</span>
            <span className="text-[10px] text-muted-foreground">
              Proveedores
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-foreground">3</span>
            <span className="text-[10px] text-muted-foreground">Resenas</span>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="mx-5 mt-4 rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            {clientProfile.email}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            {clientProfile.phone}
          </span>
        </div>
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
              className={`flex w-full items-center gap-3 px-4 py-3.5 transition-colors active:bg-muted ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  item.accent ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`flex-1 text-left text-sm ${
                  item.accent
                    ? "font-semibold text-primary"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          )
        })}
      </div>

      {/* Become provider CTA */}
      <div className="mx-5 mt-4 rounded-xl bg-secondary p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Ofrece tus servicios
            </h3>
            <p className="text-xs text-muted-foreground">
              Registrate como proveedor y empieza a ganar
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Logout */}
      <div className="mx-5 mt-6 mb-4">
        <button
          type="button"
          onClick={() => navigate("login")}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive text-sm font-semibold text-destructive transition-colors active:bg-destructive/5"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </button>
      </div>
    </div>
  )
}
