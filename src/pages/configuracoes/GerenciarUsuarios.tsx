import { Plus, MoreHorizontal, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const users = [
  { id: 1, name: 'Maria Costa',      email: 'maria@email.com',     role: 'Admin',     status: true,  initials: 'MC', color: 'bg-blue-500'    },
  { id: 2, name: 'João Cerqueira',   email: 'joao@email.com',      role: 'Gerente',   status: true,  initials: 'JC', color: 'bg-violet-500'  },
  { id: 3, name: 'Ana Paula',        email: 'ana@email.com',        role: 'Operador',  status: true,  initials: 'AP', color: 'bg-emerald-500' },
  { id: 4, name: 'Carlos Lima',      email: 'carlos@email.com',    role: 'Operador',  status: false, initials: 'CL', color: 'bg-amber-500'   },
  { id: 5, name: 'Fernanda Rocha',   email: 'fernanda@email.com',  role: 'Analista',  status: true,  initials: 'FR', color: 'bg-rose-500'    },
]

const roleColors: Record<string, string> = {
  Admin:    'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  Gerente:  'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  Operador: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  Analista: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
}

export default function GerenciarUsuarios() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 shrink-0">
        <p className="text-xs text-muted-foreground">{users.length} usuários cadastrados</p>
        <button className="ml-auto flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
          <Plus className="h-3.5 w-3.5" />Convidar Usuário
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 rounded-2xl border border-border bg-card shadow-md overflow-hidden min-h-0">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-4 border-b border-border px-5 py-2.5">
          {['Usuário', 'Email', 'Perfil', 'Status', ''].map(h => (
            <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
          ))}
        </div>
        <div className="overflow-y-auto h-[calc(100%-40px)]">
          {users.map((u, i) => (
            <div key={u.id} className={cn(
              'group grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors',
              i < users.length - 1 && 'border-b border-border/50'
            )}>
              <div className="flex items-center gap-3">
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', u.color)}>
                  {u.initials}
                </div>
                <p className="text-xs font-semibold text-foreground">{u.name}</p>
              </div>
              <p className="text-xs text-muted-foreground truncate">{u.email}</p>
              <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold w-fit', roleColors[u.role])}>
                {u.role === 'Admin' && <Shield className="h-2.5 w-2.5" />}
                {u.role}
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={cn('relative h-4 w-8 rounded-full transition-colors', u.status ? 'bg-emerald-500' : 'bg-muted')}>
                  <span className={cn('absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform', u.status ? 'translate-x-4' : 'translate-x-0.5')} />
                </div>
                <span className={cn('text-[10px] font-medium', u.status ? 'text-emerald-600' : 'text-muted-foreground')}>
                  {u.status ? 'Ativo' : 'Inativo'}
                </span>
              </label>
              <button className="rounded-lg p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition-all">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
