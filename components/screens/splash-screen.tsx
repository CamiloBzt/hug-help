"use client"

import { useEffect } from "react"
import { useNavigation } from "../../lib/navigation"
import { Heart } from "lucide-react"

export function SplashScreen() {
  const { navigate } = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => navigate("login"), 2000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-primary">
      <div className="animate-in fade-in zoom-in duration-700 flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground">
          <Heart className="h-10 w-10 text-primary" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
            Hug Help
          </h1>
          <p className="text-sm text-primary-foreground/70">
            Servicios a tu alcance
          </p>
        </div>
      </div>
      <div className="absolute bottom-12">
        <div className="h-1 w-16 animate-pulse rounded-full bg-primary-foreground/30" />
      </div>
    </div>
  )
}
