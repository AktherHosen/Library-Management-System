import * as React from "react"
import { cn } from "@/lib/utils"

type SectionTitleProps = {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("text-start my-4 mb-8", className)}>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
