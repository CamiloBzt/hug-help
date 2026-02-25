interface UnreadBadgeProps {
  count: number
  size?: "sm" | "md"
}

export function UnreadBadge({ count, size = "sm" }: UnreadBadgeProps) {
  if (count <= 0) return null

  const sizeClasses = {
    sm: "h-4 min-w-4 text-[10px]",
    md: "h-5 min-w-5 text-[10px]",
  }

  return (
    <span
      className={`flex items-center justify-center rounded-full bg-destructive px-1 font-bold text-destructive-foreground ${sizeClasses[size]}`}
    >
      {count}
    </span>
  )
}
