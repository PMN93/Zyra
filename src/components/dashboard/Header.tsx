import { Search, Bell, Plus } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    // Ajustamos a altura fixa para h-[69px] e o padding lateral para px-5 para casar com a Sidebar
    <header className="flex h-20 items-center justify-between border-b border-border bg-card px-5">
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold leading-none text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground leading-none">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="h-9 w-56 rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            3
          </span>
        </button>

        <button className="flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span>Novo</span>
        </button>
      </div>
    </header>
  )
}