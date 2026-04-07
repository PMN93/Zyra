import { FileText, Plus, MessageCircle, Calendar, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const actions = [
  { icon: FileText,      label: 'Criar Formulário', color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-500/10',    ring: 'ring-blue-500/20',    hover: 'hover:bg-blue-100 dark:hover:bg-blue-500/20'    },
  { icon: Plus,          label: 'Nova Tarefa',       color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', ring: 'ring-emerald-500/20', hover: 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20' },
  { icon: MessageCircle, label: 'WhatsApp',           color: 'text-teal-600 dark:text-teal-400',   bg: 'bg-teal-50 dark:bg-teal-500/10',    ring: 'ring-teal-500/20',    hover: 'hover:bg-teal-100 dark:hover:bg-teal-500/20'    },
  { icon: Calendar,      label: 'Agendamentos',       color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', ring: 'ring-violet-500/20', hover: 'hover:bg-violet-100 dark:hover:bg-violet-500/20' },
  { icon: Users,         label: 'Contatos',           color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10', ring: 'ring-indigo-500/20', hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-500/20' },
]

export function QuickActions() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-md">
      <div className="mb-3 shrink-0">
        <h3 className="text-sm font-semibold text-foreground">Ações Rápidas</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Acesso rápido às funções</p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-2 content-center">
        {actions.map((action) => (
          <button
            key={action.label}
            className="group flex flex-col items-center gap-2 rounded-xl p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/50"
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl ring-2 transition-all duration-200 shadow-sm group-hover:shadow-md",
              action.bg, action.ring, action.hover
            )}>
              <action.icon className={cn("h-4 w-4 transition-transform duration-200 group-hover:scale-110", action.color)} />
            </div>
            <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
