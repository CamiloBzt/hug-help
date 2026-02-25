"use client"

import { useNavigation, type Screen } from "../../lib/navigation"
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  UserCircle,
  Home,
  Search,
} from "lucide-react"

const providerTabs: {
  id: Screen
  label: string
  icon: typeof LayoutDashboard
  badge?: number
}[] = [
  { id: "dashboard", label: "Inicio", icon: LayoutDashboard },
  { id: "services", label: "Servicios", icon: Briefcase },
  { id: "requests", label: "Solicitudes", icon: ClipboardList, badge: 2 },
  { id: "profile", label: "Perfil", icon: UserCircle },
]

const clientTabs: {
  id: Screen
  label: string
  icon: typeof Home
  badge?: number
}[] = [
  { id: "client-home", label: "Inicio", icon: Home },
  { id: "client-search", label: "Buscar", icon: Search },
  { id: "client-my-services", label: "Servicios", icon: ClipboardList },
  { id: "client-profile", label: "Perfil", icon: UserCircle },
]

const providerActiveMap: Record<string, Screen> = {
  "create-service": "services",
  "request-detail": "requests",
  chat: "requests",
  subscriptions: "profile",
  notifications: "dashboard",
}

const clientActiveMap: Record<string, Screen> = {
  "client-service-detail": "client-search",
  "client-request-service": "client-search",
  "client-rate-service": "client-my-services",
  "client-contracted-detail": "client-my-services",
  chat: "client-my-services",
}

export function BottomNavigation() {
  const { screen, userMode, navigate } = useNavigation()
  const tabs = userMode === "client" ? clientTabs : providerTabs
  const activeMap = userMode === "client" ? clientActiveMap : providerActiveMap

  const isActive = (tabId: Screen) => {
    if (activeMap[screen] === tabId) return true
    return screen === tabId
  }

  return (
    <nav
      className="flex items-center justify-around border-t border-border bg-card px-2 pb-5 pt-2"
      role="tablist"
      aria-label="Navegacion principal"
    >
      {tabs.map((tab) => {
        const active = isActive(tab.id)
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => navigate(tab.id)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <div className="relative">
              <Icon
                className={`h-6 w-6 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
                strokeWidth={active ? 2.2 : 1.8}
              />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </span>
            {active && (
              <div className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-primary" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
