"use client"

import { useNavigation } from "../../lib/navigation"
import { ArrowLeft, Wrench, User } from "lucide-react"

export function RegisterScreen() {
  const { navigate, goBack } = useNavigation()

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
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Crear cuenta
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Selecciona como quieres usar Hug Help
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* Client card */}
          <button
            type="button"
            onClick={() => navigate("register-form", { type: "client" })}
            className="flex items-start gap-4 rounded-2xl border border-input bg-card p-5 text-left transition-all active:border-primary active:bg-secondary"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-foreground">
                Soy Cliente
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                Busca y contrata proveedores de servicios para tu hogar
              </span>
            </div>
          </button>

          {/* Provider card */}
          <button
            type="button"
            onClick={() => navigate("register-form", { type: "provider" })}
            className="relative flex items-start gap-4 rounded-2xl border-2 border-primary bg-secondary p-5 text-left transition-all active:bg-primary/10"
          >
            <div className="absolute top-3 right-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              Recomendado
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-foreground">
                Soy Proveedor
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                Publica tus servicios y conecta con clientes en tu zona
              </span>
            </div>
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-muted p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Como proveedor, podras publicar tus servicios, gestionar solicitudes
            y hacer crecer tu negocio. Planes desde $9.990 COP/mes.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1 px-6 py-8">
        <span className="text-sm text-muted-foreground">
          Ya tienes cuenta?
        </span>
        <button
          type="button"
          onClick={() => navigate("login")}
          className="text-sm font-semibold text-primary"
        >
          Inicia sesion
        </button>
      </div>
    </div>
  )
}
