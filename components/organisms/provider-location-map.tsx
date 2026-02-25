"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation } from "lucide-react"

interface ProviderLocationMapProps {
  providerName: string
  lat: number
  lng: number
  simulateMovement?: boolean
}

export function ProviderLocationMap({
  providerName,
  lat,
  lng,
  simulateMovement = false,
}: ProviderLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markerRef = useRef<unknown>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentLat, setCurrentLat] = useState(lat)
  const [currentLng, setCurrentLng] = useState(lng)

  // Simulate real-time movement
  useEffect(() => {
    if (!simulateMovement) return

    const interval = setInterval(() => {
      setCurrentLat((prev) => prev + (Math.random() - 0.5) * 0.001)
      setCurrentLng((prev) => prev + (Math.random() - 0.5) * 0.001)
    }, 3000)

    return () => clearInterval(interval)
  }, [simulateMovement])

  // Update marker position when coords change
  useEffect(() => {
    const marker = markerRef.current as { setLatLng?: (latlng: [number, number]) => void } | null
    const map = mapInstanceRef.current as { panTo?: (latlng: [number, number], opts?: { animate: boolean }) => void } | null
    if (marker?.setLatLng && map?.panTo) {
      marker.setLatLng([currentLat, currentLng])
      map.panTo([currentLat, currentLng], { animate: true })
    }
  }, [currentLat, currentLng])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let cancelled = false

    async function initMap() {
      if (cancelled || !mapRef.current) return

      // Guard against already-initialized container (React Strict Mode / HMR)
      const container = mapRef.current as HTMLDivElement & { _leaflet_id?: number }
      if (container._leaflet_id) return

      // Dynamic import to avoid SSR issues
      const L = (await import("leaflet")).default

      // Fix default marker icons
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([lat, lng], 15)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map)

      // Custom provider marker
      const providerIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 40px; height: 40px; border-radius: 50%;
          background: #4472C4; border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 700; font-size: 14px;
        ">${providerName
          .split(" ")
          .map((n) => n[0])
          .join("")}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      const marker = L.marker([lat, lng], { icon: providerIcon }).addTo(map)
      marker.bindPopup(
        `<div style="font-size:13px;font-weight:600;padding:2px 0">${providerName}</div><div style="font-size:11px;color:#8E8E93">En camino</div>`,
      )

      // Accuracy circle
      L.circle([lat, lng], {
        radius: 150,
        color: "#4472C4",
        fillColor: "#4472C4",
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: "5, 5",
      }).addTo(map)

      mapInstanceRef.current = map
      markerRef.current = marker
      setIsLoaded(true)
    }

    initMap()

    return () => {
      cancelled = true
      const map = mapInstanceRef.current as { remove?: () => void } | null
      if (map?.remove) {
        map.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  }, [lat, lng, providerName])

  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />

      {/* Map container */}
      <div ref={mapRef} className="h-48 w-full bg-muted" />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-2">
            <MapPin className="h-6 w-6 animate-pulse text-primary" />
            <span className="text-xs text-muted-foreground">
              Cargando mapa...
            </span>
          </div>
        </div>
      )}

      {/* Live indicator */}
      {simulateMovement && isLoaded && (
        <div className="absolute left-3 top-3 z-[1000] flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1.5 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[10px] font-semibold text-success">
            En tiempo real
          </span>
        </div>
      )}

      {/* Provider info overlay */}
      {isLoaded && (
        <div className="absolute bottom-3 left-3 right-3 z-[1000] flex items-center gap-3 rounded-xl bg-card/95 p-3 shadow-lg backdrop-blur-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {providerName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">
              {providerName}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {simulateMovement
                ? "En camino a tu ubicacion"
                : "Ubicacion del proveedor"}
            </p>
          </div>
          <Navigation className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  )
}
