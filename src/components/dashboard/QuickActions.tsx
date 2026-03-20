import { FileText, Plus, MessageCircle, Calendar, Users } from 'lucide-react'

const actions = [
  { icon: FileText, label: 'Criar Formulário', color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100' },
  { icon: Plus, label: 'Nova Tarefa', color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100' },
  { icon: MessageCircle, label: 'WhatsApp', color: 'text-teal-600', bg: 'bg-teal-50 hover:bg-teal-100' },
  { icon: Calendar, label: 'Agendamentos', color: 'text-violet-600', bg: 'bg-violet-50 hover:bg-violet-100' },
  { icon: Users, label: 'Contatos', color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100' },
]

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-foreground">Ações Rápidas</h3>
      
      <div className="mt-4 grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="group flex flex-col items-center gap-2 rounded-lg p-3 transition-colors"
          >
            <div className={`rounded-lg p-3 transition-colors ${action.bg}`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <span className="text-center text-xs font-medium text-muted-foreground group-hover:text-foreground">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
