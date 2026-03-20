import { useState } from 'react'
import { useTheme } from "../../../components/theme-provider"
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  LayoutGrid,
  MessageSquare,
  FileText,
  Tags,
  BarChart3,
  Settings,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react'

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  badge?: string
  isActive?: boolean
  subItems?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/', isActive: true },
  { label: 'Contatos', icon: Users, href: '/contatos', badge: '643' },
  { label: 'Quadro', icon: LayoutGrid, href: '/quadro' },
  { label: 'Respostas', icon: MessageSquare, href: '/respostas' },
  { label: 'Formulários', icon: FileText, href: '/formularios' },
  { label: 'Tags', icon: Tags, href: '/tags' },
  { 
    label: 'Relatórios', 
    icon: BarChart3, 
    href: '/relatorios',
    subItems: [
      { label: 'Relatório de Kanban', href: '/relatorios/kanban' },
      { label: 'Relatório de Agendamentos', href: '/relatorios/agendamentos' },
      { label: 'Relatório de Atendimentos', href: '/relatorios/atendimentos' },
      { label: 'Relatório de Formulários', href: '/relatorios/formularios' },
    ]
  },
  { 
    label: 'Configurações', 
    icon: Settings, 
    href: '/configuracoes',
    subItems: [
      { label: 'Criar Quadros', href: '/configuracoes/criarquadros' },
      { label: 'Criar Formulário', href: '/configuracoes/criarfomulario' },
      { label: 'Status de Respostas', href: '/configuracoes/statusrespostas' },
      { label: 'Gerenciar Usuários', href: '/configuracoes/gernciarusuarios' },
      { label: 'Permissões de Menu', href: '/configuracoes/permissoesmenu' },
    ]
  },
]

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  // Se clicar em ícone com subitem enquanto fechado, abre a sidebar e depois o menu
  const handleItemClick = (item: NavItem) => {
    if (item.subItems) {
      if (isCollapsed) {
        setIsCollapsed(false)
        setTimeout(() => toggleExpand(item.label), 200)
      } else {
        toggleExpand(item.label)
      }
    }
  }

  return (
    <aside 
      className={cn(
        "relative flex h-screen flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Botão de Toggle Manual */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`${isCollapsed ? "absolute right-7 bottom-40 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground transition-colors" : "absolute right-4 bottom-40 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground transition-colors"}`}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Header (Alinhado com o Header.tsx em 80px) */}
      <div className="flex h-20 items-center gap-3 border-b border-border px-5 shrink-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-base font-bold text-foreground">Zyra</h1>
            <p className="text-xs text-muted-foreground">CRM</p>
          </div>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  item.isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed ? "justify-center" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                
                {!isCollapsed && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedItems.includes(item.label) && "rotate-180"
                        )} 
                      />
                    )}
                  </div>
                )}
              </button>

              {/* Sub-itens (Apenas quando expandido) */}
              {!isCollapsed && item.subItems && expandedItems.includes(item.label) && (
                <ul className="ml-9 mt-1 space-y-1 border-l border-border pl-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <a
                        href={subItem.href}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer (Tema e Perfil) */}
      <div className="mt-auto border-t border-border p-3 space-y-1">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            isCollapsed && "justify-center"
          )}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!isCollapsed && <p>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</p>}
        </button>

        <div className="mt-auto border-t border-border p-3 space-y-1">
        <div className={cn(
          "flex items-center justify-between rounded-lg px-3 py-2 ",
          isCollapsed ? "justify-center" : "hover:bg-muted/50"
        )}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              MC
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden whitespace-nowrap text-left">
                <p className="truncate text-sm font-semibold text-foreground">Maria Costa</p>
                <p className="truncate text-xs text-muted-foreground text-left">maria@email.com</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button className="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          )}
          </div>
          </div>
      </div>
    </aside>
  )
}