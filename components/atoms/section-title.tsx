import React from "react"
interface SectionTitleProps {
  children: React.ReactNode
  uppercase?: boolean
}

export function SectionTitle({ children, uppercase = true }: SectionTitleProps) {
  return (
    <span
      className={`text-xs font-semibold text-muted-foreground ${
        uppercase ? "uppercase tracking-wide" : ""
      }`}
    >
      {children}
    </span>
  )
}
