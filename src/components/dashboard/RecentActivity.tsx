import { FileText, Users, MessageSquare, CheckCircle2, Clock } from 'lucide-react'
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
  form: { icon: 'text-emerald-600', bg: 'bg-emerald-50' },
  contact: { icon: 'text-blue-600', bg: 'bg-blue-50' },
  message: { icon: 'text-teal-600', bg: 'bg-teal-50' },
  task: { icon: 'text-violet-600', bg: 'bg-violet-50' },
}

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Atividades Recentes</h3>
        <button className="text-xs font-medium text-primary transition-colors hover:text-primary/80">
          Ver todas
        </button>
      </div>

      {activities.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Nenhuma atividade recente
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type]
            const colors = colorMap[activity.type]
            
            return (
              <li
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className={cn("rounded-lg p-2", colors.bg)}>
                  <Icon className={cn("h-4 w-4", colors.icon)} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
