import { Search, Bell, Plus, Sparkles } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
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
            <p className="mt-0.5 text-[11px] leading-none text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Breadcrumb separator */}
        <div className="ml-1 hidden items-center gap-2 sm:flex">
          <span className="text-border">·</span>
          <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            Visão Geral
          </span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="h-8 w-48 rounded-xl border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            3
          </span>
        </button>

        {/* New button */}
        <button className="flex h-8 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40">
          <Plus className="h-3.5 w-3.5" />
          Novo
        </button>
      </div>
    </header>
  )
}
