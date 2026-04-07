import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from "../../../components/theme-provider"
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, LayoutGrid, MessageSquare, FileText,
  Tags, BarChart3, Settings, Moon, Sun, LogOut,
  ChevronDown, ChevronRight, Zap, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react'

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  badge?: string
  subItems?: { label: string; href: string }[]
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard',   icon: LayoutDashboard, href: '/'           },
  { label: 'Contatos',    icon: Users,            href: '/contatos',  badge: '643' },
  { label: 'Quadro',      icon: LayoutGrid,       href: '/quadro'     },
  { label: 'Respostas',   icon: MessageSquare,    href: '/respostas'  },
  { label: 'Formulários', icon: FileText,         href: '/formularios'},
  { label: 'Tags',        icon: Tags,             href: '/tags'       },
]

const systemNavItems: NavItem[] = [
  {
    label: 'Relatórios', icon: BarChart3, href: '/relatorios',
    subItems: [
      { label: 'Relatório de Kanban',        href: '/relatorios/kanban'       },
      { label: 'Relatório de Agendamentos',  href: '/relatorios/agendamentos' },
      { label: 'Relatório de Atendimentos',  href: '/relatorios/atendimentos' },
      { label: 'Relatório de Formulários',   href: '/relatorios/formularios'  },
    ],
  },
  {
    label: 'Configurações', icon: Settings, href: '/configuracoes',
    subItems: [
      { label: 'Criar Quadros',         href: '/configuracoes/criarquadros'    },
      { label: 'Criar Formulário',      href: '/configuracoes/criarfomulario'  },
      { label: 'Status de Respostas',   href: '/configuracoes/statusrespostas' },
      { label: 'Gerenciar Usuários',    href: '/configuracoes/gernciarusuarios'},
      { label: 'Permissões de Menu',    href: '/configuracoes/permissoesmenu'  },
    ],
  },
]

function isItemActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

function NavButton({
  item, isCollapsed, isExpanded, onToggle, pathname,
}: {
  item: NavItem; isCollapsed: boolean; isExpanded: boolean; onToggle: () => void; pathname: string
}) {
  const active = isItemActive(item.href, pathname)

  const baseClass = cn(
    'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
    active
      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    isCollapsed ? 'justify-center px-2' : 'justify-between',
  )

  const iconEl = <item.icon className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-primary-foreground' : '')} />
  const labelEl = !isCollapsed && <span className="truncate">{item.label}</span>
  const badgeEl = !isCollapsed && item.badge && (
    <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none', active ? 'bg-white/20 text-primary-foreground' : 'bg-primary/10 text-primary')}>
      {item.badge}
    </span>
  )

  return (
    <li>
      {item.subItems ? (
        <button onClick={onToggle} title={isCollapsed ? item.label : undefined} className={baseClass}>
          <div className="flex items-center gap-3 min-w-0">
            {iconEl}{labelEl}
          </div>
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 shrink-0">
              {badgeEl}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200 opacity-60', isExpanded && 'rotate-180')} />
            </div>
          )}
        </button>
      ) : (
        <Link to={item.href} title={isCollapsed ? item.label : undefined} className={baseClass}>
          <div className="flex items-center gap-3 min-w-0">
            {iconEl}{labelEl}
          </div>
          {!isCollapsed && badgeEl && <div className="shrink-0">{badgeEl}</div>}
        </Link>
      )}

      {/* Sub-items */}
      {!isCollapsed && item.subItems && isExpanded && (
        <ul className="mt-1 ml-4 space-y-0.5 border-l-2 border-border/60 pl-3">
          {item.subItems.map(sub => {
            const subActive = pathname === sub.href
            return (
              <li key={sub.label}>
                <Link
                  to={sub.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors',
                    subActive ? 'text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <ChevronRight className="h-3 w-3 opacity-40 shrink-0" />
                  {sub.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    )
  }

  const handleItemClick = (item: NavItem) => {
    if (!item.subItems) return
    if (isCollapsed) {
      setIsCollapsed(false)
      setTimeout(() => toggleExpand(item.label), 220)
    } else {
      toggleExpand(item.label)
    }
  }

  return (
    <div className={cn('shrink-0 py-3 pl-3 transition-all duration-300 ease-in-out', isCollapsed ? 'w-[80px]' : 'w-[252px]')}>
      <aside className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-xl overflow-hidden">

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 pt-5 pb-4 shrink-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-400 shadow-lg shadow-primary/30">
            <Zap className="h-[18px] w-[18px] text-white" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <>
              <div className="overflow-hidden">
                <p className="text-sm font-bold leading-none text-foreground tracking-tight">Zyra</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">CRM</p>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="ml-auto rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div className="mx-4 h-px bg-border/50 shrink-0" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-4">
          <div>
            {!isCollapsed && <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Menu</p>}
            <ul className="space-y-0.5">
              {mainNavItems.map(item => (
                <NavButton key={item.label} item={item} isCollapsed={isCollapsed} isExpanded={expandedItems.includes(item.label)} onToggle={() => handleItemClick(item)} pathname={pathname} />
              ))}
            </ul>
          </div>
          <div>
            {!isCollapsed && <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Sistema</p>}
            <ul className="space-y-0.5">
              {systemNavItems.map(item => (
                <NavButton key={item.label} item={item} isCollapsed={isCollapsed} isExpanded={expandedItems.includes(item.label)} onToggle={() => handleItemClick(item)} pathname={pathname} />
              ))}
            </ul>
          </div>
        </nav>

        <div className="mx-4 h-px bg-border/50 shrink-0" />

        {/* Footer */}
        <div className="p-3 space-y-2 shrink-0">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground', isCollapsed && 'justify-center px-2')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
            {!isCollapsed && <span className="text-xs font-medium">{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>}
          </button>

          <div className={cn('flex items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-muted/60 cursor-pointer', isCollapsed && 'justify-center')}>
            <div className="relative shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-[11px] font-bold text-white shadow-md shadow-primary/20">MC</div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground leading-none">Maria Costa</p>
                  <p className="truncate text-[10px] text-muted-foreground mt-0.5">maria@email.com</p>
                </div>
                <button className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        )}
      </aside>
    </div>
  )
}
