"use client"

import React from "react"

import { ArrowLeft } from "lucide-react"

interface ScreenHeaderProps {
  title: string
  onBack?: () => void
  rightAction?: React.ReactNode
  subtitle?: string
}

export function ScreenHeader({
  title,
  onBack,
  rightAction,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-card px-4 pb-3 pt-12">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-muted"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      )}
      <div className="flex flex-1 flex-col">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
      {rightAction}
    </div>
  )
}
