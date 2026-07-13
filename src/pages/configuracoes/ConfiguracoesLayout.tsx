import { NavLink, Outlet } from 'react-router-dom'
import { Header } from '../../components/dashboard/Header'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Criar Quadros',        to: '/configuracoes/criarquadros'    },
  { label: 'Criar Formulário',     to: '/configuracoes/criarfomulario'  },
  { label: 'Status de Respostas',  to: '/configuracoes/statusrespostas' },
  { label: 'Gerenciar Usuários',   to: '/configuracoes/gernciarusuarios'},
  { label: 'Permissões de Menu',   to: '/configuracoes/permissoesmenu'  },
]

export function ConfiguracoesLayout() {
  return (
    <>
      <Header title="Configurações" subtitle="Personalize o sistema" />

      {/* Tab strip */}
      <div className="flex items-center gap-1 shrink-0 rounded-2xl border border-border bg-card px-2 py-2 shadow-md overflow-x-auto">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => cn(
              'whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200',
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
