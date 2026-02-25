"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"

export function RegisterFormScreen() {
  const { navigate, goBack, params } = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const isProvider = params.type === "provider"

  return (
    <div className="flex flex-1 flex-col bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <button
          type="button"
          onClick={goBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-muted"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-foreground">
            Registro
          </span>
          <span className="text-xs text-muted-foreground">
            {isProvider ? "Cuenta de proveedor" : "Cuenta de cliente"}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 pt-4 pb-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre completo
          </label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-email"
            className="text-sm font-medium text-foreground"
          >
            Correo electronico
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="reg-email"
              type="email"
              placeholder="tu@correo.com"
              className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Telefono
          </label>
          <div className="relative">
            <Phone className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="phone"
              type="tel"
              placeholder="+57 300 000 0000"
              className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-password"
            className="text-sm font-medium text-foreground"
          >
            Contrasena
          </label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimo 8 caracteres"
              className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </div>

        {isProvider && (
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
            <p className="text-xs font-medium text-accent">
              Como proveedor, despues del registro necesitaras verificar tu
              identidad subiendo un documento valido (cedula o pasaporte).
            </p>
          </div>
        )}

        <div className="flex items-start gap-2 pt-2">
          <input
            id="terms"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
          />
          <label
            htmlFor="terms"
            className="text-xs text-muted-foreground leading-relaxed"
          >
            Acepto los{" "}
            <span className="font-medium text-primary">
              Terminos y Condiciones
            </span>{" "}
            y la{" "}
            <span className="font-medium text-primary">
              Politica de Privacidad
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={() => navigate("dashboard")}
          className="mt-4 flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors active:bg-primary/90"
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  )
}
