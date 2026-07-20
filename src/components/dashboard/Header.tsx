import React from 'react'
import { Search, Bell, Sparkles } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between rounded-2xl border border-border bg-card px-5 py-3 shadow-xl">

      {/* Left: title + breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-none text-foreground">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 text-xs leading-none text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Breadcrumb separator */}
        <div className="ml-1 hidden items-center gap-2 sm:flex">
          <span className="text-border">·</span>
          <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            Visão Geral
          </span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[0.5rem] font-bold text-primary-foreground">
            3
          </span>
        </button>

        {actions && <div className="flex items-center gap-2 border-l border-border pl-2">{actions}</div>}
      </div>
    </header>
  )
}
