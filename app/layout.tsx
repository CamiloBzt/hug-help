import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Hug Help - Servicios a tu alcance",
  description:
    "Plataforma que conecta proveedores de servicios con clientes. Encuentra plomeros, electricistas, limpieza y mas.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4472C4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full font-sans antialiased">
        <div className="mx-auto flex h-full max-w-[375px] flex-col overflow-hidden bg-background shadow-xl">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
