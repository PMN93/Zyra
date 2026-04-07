import { Header } from '../components/dashboard/Header'
import { Plus, MoreHorizontal, Clock, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

const columns = [
  {
    id: 'todo',
    label: 'A Fazer',
    color: 'bg-slate-400',
    count: 4,
    cards: [
      { id: 1, title: 'Criar proposta para cliente XYZ', tag: 'Urgente',  tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',   due: 'Hoje' },
      { id: 2, title: 'Atualizar base de contatos',      tag: 'Normal',   tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',    due: 'Amanhã' },
      { id: 3, title: 'Revisar formulário de pesquisa',  tag: 'Baixa',    tagColor: 'bg-muted text-muted-foreground',                                         due: '10 abr' },
      { id: 4, title: 'Configurar integração WhatsApp',  tag: 'Urgente',  tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',   due: '11 abr' },
    ],
  },
  {
    id: 'doing',
    label: 'Em Andamento',
    color: 'bg-blue-500',
    count: 3,
    cards: [
      { id: 5, title: 'Campanha de e-mail Q2',          tag: 'Normal',   tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',    due: '12 abr' },
      { id: 6, title: 'Relatório mensal de clientes',   tag: 'Normal',   tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',    due: '15 abr' },
      { id: 7, title: 'Treinamento da equipe de vendas', tag: 'Alta',    tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300', due: '14 abr' },
    ],
  },
  {
    id: 'done',
    label: 'Concluído',
    color: 'bg-emerald-500',
    count: 5,
    cards: [
      { id: 8, title: 'Reunião de alinhamento Q1',      tag: 'Feito',    tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300', due: '1 abr' },
      { id: 9, title: 'Atualização do sistema CRM',     tag: 'Feito',    tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300', due: '3 abr' },
      { id: 10, title: 'Onboarding cliente ABC',        tag: 'Feito',    tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300', due: '5 abr' },
    ],
  },
]

export default function Quadro() {
  return (
    <>
      <Header title="Quadro" subtitle="Gestão de tarefas" />

      <div className="flex flex-1 min-h-0 gap-3 overflow-hidden">
        {columns.map(col => (
          <div key={col.id} className="flex flex-1 min-w-0 flex-col rounded-2xl border border-border bg-card shadow-md overflow-hidden">
            {/* Column header */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 shrink-0">
              <span className={cn('h-2 w-2 rounded-full', col.color)} />
              <h3 className="flex-1 text-xs font-semibold text-foreground">{col.label}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{col.count}</span>
              <button className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {col.cards.map(card => (
                <div key={card.id} className="group rounded-xl border border-border bg-background p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <p className="text-xs font-medium text-foreground leading-snug flex-1">{card.title}</p>
                    <button className="shrink-0 rounded-md p-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', card.tagColor)}>
                      <Tag className="h-2.5 w-2.5" />{card.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />{card.due}
                    </span>
                  </div>
                </div>
              ))}

              {/* Add card */}
              <button className="flex w-full items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2.5 text-[11px] text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Plus className="h-3.5 w-3.5" />Adicionar tarefa
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
