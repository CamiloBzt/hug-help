"use client"

import React from "react"

import { Avatar } from "../atoms/avatar"

interface UserCardProps {
  name: string
  subtitle?: string
  rightAction?: React.ReactNode
  avatarVariant?: "primary" | "secondary" | "muted"
  avatarSize?: "md" | "lg" | "xl"
  onClick?: () => void
}

export function UserCard({
  name,
  subtitle,
  rightAction,
  avatarVariant = "secondary",
  avatarSize = "xl",
  onClick,
}: UserCardProps) {
  const content = (
    <>
      <Avatar name={name} size={avatarSize} variant={avatarVariant} />
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-base font-semibold text-foreground">{name}</span>
        {subtitle && (
          <span className="text-xs font-medium text-primary">{subtitle}</span>
        )}
      </div>
      {rightAction}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm transition-colors active:bg-muted"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
      {content}
    </div>
  )
}
