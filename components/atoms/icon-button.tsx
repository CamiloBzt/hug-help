'use client';

import type { LucideIcon } from "lucide-react"

interface IconButtonProps {
  icon: LucideIcon
  onClick?: () => void
  label: string
  variant?: "ghost" | "muted" | "primary"
  size?: "sm" | "md"
  className?: string
}

const variantClasses = {
  ghost: "transition-colors active:bg-muted",
  muted: "bg-muted transition-colors active:bg-muted/80",
  primary: "bg-primary/10 transition-colors active:bg-primary/20",
}

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
}

const iconSizeClasses = {
  sm: "h-4.5 w-4.5",
  md: "h-5 w-5",
}

export function IconButton({
  icon: Icon,
  onClick,
  label,
  variant = "ghost",
  size = "md",
  className = "",
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={label}
    >
      <Icon
        className={`${iconSizeClasses[size]} ${
          variant === "primary" ? "text-primary" : "text-foreground"
        }`}
      />
    </button>
  )
}
