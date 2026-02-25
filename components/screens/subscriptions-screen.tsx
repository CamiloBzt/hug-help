"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import { subscriptionTiers, currentProvider } from "../../lib/mock-data"
import { ArrowLeft, Check, Crown } from "lucide-react"

export function SubscriptionsScreen() {
  const { goBack } = useNavigation()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  )

  return (
    <div className="flex flex-1 flex-col bg-background">
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
          Suscripciones
        </h1>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pt-4 pb-6">
        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-1 rounded-xl bg-card p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              billingCycle === "monthly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              billingCycle === "annual"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Anual (-20%)
          </button>
        </div>

        {/* Plans */}
        {subscriptionTiers.map((tier) => {
          const isCurrent = currentProvider.plan === tier.id
          const displayPrice =
            billingCycle === "annual"
              ? Math.round(tier.price * 0.8)
              : tier.price

          return (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-5 shadow-sm ${
                tier.popular
                  ? "border-2 border-primary bg-card"
                  : "border border-border bg-card"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Mas Popular
                </div>
              )}

              <div className="flex items-center gap-2">
                {tier.popular && (
                  <Crown className="h-5 w-5 text-accent" />
                )}
                <h3 className="text-lg font-bold text-foreground">
                  {tier.name}
                </h3>
                {isCurrent && (
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                    Plan actual
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">
                  ${displayPrice.toLocaleString("es-CO")}
                </span>
                <span className="text-sm text-muted-foreground">
                  COP/mes
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2.5">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        tier.popular ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          tier.popular
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={`mt-5 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "border border-border bg-muted text-muted-foreground"
                    : tier.popular
                      ? "bg-primary text-primary-foreground active:bg-primary/90"
                      : "border border-primary bg-card text-primary active:bg-primary/5"
                }`}
                disabled={isCurrent}
              >
                {isCurrent ? "Plan Actual" : "Cambiar Plan"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
