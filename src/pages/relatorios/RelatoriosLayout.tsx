import { NavLink, Outlet } from 'react-router-dom'
import { Header } from '../../components/dashboard/Header'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Kanban',        to: '/relatorios/kanban'        },
  { label: 'Agendamentos',  to: '/relatorios/agendamentos'  },
  { label: 'Atendimentos',  to: '/relatorios/atendimentos'  },
  { label: 'Formulários',   to: '/relatorios/formularios'   },
]

export function RelatoriosLayout() {
  return (
    <>
      <Header title="Relatórios" subtitle="Análise e relatórios do sistema" />

      {/* Tab strip */}
      <div className="flex items-center gap-1 shrink-0 rounded-2xl border border-border bg-card px-2 py-2 shadow-md">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => cn(
              'rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Page content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </div>
    </>
  )
}
