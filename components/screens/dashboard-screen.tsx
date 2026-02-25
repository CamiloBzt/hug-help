"use client"

import { useNavigation } from "../../lib/navigation"
import { dashboardMetrics, currentProvider, serviceRequests } from "../../lib/mock-data"
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  Bell,
  ChevronRight,
  BadgeCheck,
  Crown,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Avatar } from "../atoms/avatar"
import { MetricCard } from "../molecules/metric-card"

export function DashboardScreen() {
  const { navigate } = useNavigation()
  const pendingRequests = serviceRequests.filter(
    (r) => r.status === "pending",
  )

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card px-5 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <Avatar name={currentProvider.name} size="lg" variant="primary" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-semibold text-foreground">
                {currentProvider.name}
              </span>
              {currentProvider.verified && (
                <BadgeCheck className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Crown className="h-3 w-3 text-accent" />
              <span className="text-xs font-medium text-accent">Premium</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("notifications")}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors active:bg-muted/80"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-destructive" />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 px-5 pt-5">
        <MetricCard
          icon={Briefcase}
          label="Servicios activos"
          value={dashboardMetrics.activeServices}
          color="#4472C4"
        />
        <MetricCard
          icon={Clock}
          label="Pendientes"
          value={dashboardMetrics.pendingRequests}
          color="#FF9500"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Completados"
          value={dashboardMetrics.completedServices}
          color="#34C759"
        />
        <MetricCard
          icon={Star}
          label="Calificacion"
          value={dashboardMetrics.averageRating}
          color="#FF9500"
        />
      </div>

      {/* Earnings */}
      <div className="mx-5 mt-4 flex items-center justify-between rounded-xl bg-primary p-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-primary-foreground/70">
            Ganancias del mes
          </span>
          <span className="text-xl font-bold text-primary-foreground">
            ${dashboardMetrics.monthlyEarnings.toLocaleString("es-CO")}
          </span>
        </div>
        <TrendingUp className="h-8 w-8 text-primary-foreground/40" />
      </div>

      {/* Activity Chart */}
      <div className="mx-5 mt-4 rounded-xl bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Actividad semanal
          </span>
          <span className="text-xs text-muted-foreground">Esta semana</span>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={dashboardMetrics.weeklyActivity}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8E8E93" }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E5EA",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="requests"
              fill="#4472C4"
              radius={[4, 4, 0, 0]}
              name="Solicitudes"
            />
            <Bar
              dataKey="completed"
              fill="#34C759"
              radius={[4, 4, 0, 0]}
              name="Completados"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">
              Solicitudes
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-success" />
            <span className="text-[10px] text-muted-foreground">
              Completados
            </span>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="mx-5 mt-4 mb-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Solicitudes pendientes
          </span>
          <button
            type="button"
            onClick={() => navigate("requests")}
            className="text-xs font-medium text-primary"
          >
            Ver todas
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {pendingRequests.map((req) => (
            <button
              key={req.id}
              type="button"
              onClick={() =>
                navigate("request-detail", { requestId: req.id })
              }
              className="flex items-center gap-3 rounded-xl bg-card p-3.5 shadow-sm transition-colors active:bg-muted"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                {req.clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {req.clientName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {req.serviceTitle}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                  Pendiente
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
