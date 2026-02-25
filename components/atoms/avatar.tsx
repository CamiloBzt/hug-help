interface AvatarProps {
  name: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "secondary" | "muted"
}

const sizeClasses = {
  sm: "h-5 w-5 text-[8px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-xs",
  xl: "h-12 w-12 text-sm",
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-primary",
  muted: "bg-muted text-primary",
}

export function Avatar({ name, size = "lg", variant = "secondary" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {initials}
    </div>
  )
}
