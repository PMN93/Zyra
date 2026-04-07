import { FileText, Users, MessageSquare, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Activity {
  id: number
  type: 'form' | 'contact' | 'message' | 'task'
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'contact',
    title: 'Novo contato adicionado',
    description: 'Ana Silva foi adicionada a lista de contatos',
    time: '2 min atrás',
  },
  {
    id: 2,
    type: 'form',
    title: 'Formulário respondido',
    description: 'Pesquisa de satisfação recebeu nova resposta',
    time: '15 min atrás',
  },
  {
    id: 3,
    type: 'task',
    title: 'Tarefa concluída',
    description: 'Enviar proposta para cliente XYZ',
    time: '1h atrás',
  },
  {
    id: 4,
    type: 'message',
    title: 'Nova mensagem WhatsApp',
    description: 'João Pedro enviou uma mensagem',
    time: '2h atrás',
  },
]

const iconMap = {
  form: FileText,
  contact: Users,
  message: MessageSquare,
  task: CheckCircle2,
}

const colorMap = {
  form:    { icon: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', ring: 'ring-emerald-500/20' },
  contact: { icon: 'text-blue-600 dark:text-blue-400',       bg: 'bg-blue-50 dark:bg-blue-500/10',       ring: 'ring-blue-500/20'    },
  message: { icon: 'text-teal-600 dark:text-teal-400',       bg: 'bg-teal-50 dark:bg-teal-500/10',       ring: 'ring-teal-500/20'    },
  task:    { icon: 'text-violet-600 dark:text-violet-400',   bg: 'bg-violet-50 dark:bg-violet-500/10',   ring: 'ring-violet-500/20'  },
}

export function RecentActivity() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Atividades Recentes</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Últimas interações do sistema</p>
        </div>
        <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
          Ver todas <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <ul className="flex-1 flex flex-col justify-between min-h-0">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type]
          const colors = colorMap[activity.type]

          return (
            <li key={activity.id}>
              <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition-all duration-200 hover:bg-muted/40 group cursor-pointer">
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-2 transition-transform duration-200 group-hover:scale-105",
                  colors.bg, colors.ring
                )}>
                  <Icon className={cn("h-3.5 w-3.5", colors.icon)} />
                </div>

                <div className="flex-1 overflow-hidden min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">{activity.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{activity.description}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5" />
                  <span className="whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
              {index < activities.length - 1 && (
                <div className="mx-3 h-px bg-border/40" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
