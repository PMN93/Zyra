import { Header } from '../components/dashboard/Header'
import { Plus, FileText, Eye, Edit2, MoreHorizontal, MessageSquare, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const forms = [
  { id: 1, name: 'Pré-cadastro Raríssima Be Rare', responses: 1954, status: 'active',   created: '15 jan 2025', views: 3240 },
  { id: 2, name: 'Pesquisa de Satisfação Q1',       responses: 128,  status: 'active',   created: '1 fev 2025',  views: 450  },
  { id: 3, name: 'Formulário de Contato Website',   responses: 67,   status: 'inactive', created: '10 dez 2024', views: 890  },
  { id: 4, name: 'Avaliação de Atendimento',         responses: 312,  status: 'inactive', created: '5 nov 2024',  views: 1100 },
]

export default function Formularios() {
  return (
    <>
      <Header title="Formulários" subtitle="2 formulários ativos" />

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          <p className="text-xs text-muted-foreground">{forms.length} formulários no total</p>
          <button className="ml-auto flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />Novo Formulário
          </button>
        </div>

        {/* Forms grid */}
        <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto content-start">
          {forms.map(form => (
            <div key={form.id} className="group rounded-2xl border border-border bg-card p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{form.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        form.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-muted text-muted-foreground'
                      )}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', form.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground')} />
                        {form.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="shrink-0 rounded-lg p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl bg-muted/40 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Respostas</p>
                  <p className="text-sm font-bold text-foreground flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-primary" />{form.responses.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/40 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Visualizações</p>
                  <p className="text-sm font-bold text-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3 text-violet-500" />{form.views.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/40 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">Criado em</p>
                  <p className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />{form.created}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Eye className="h-3.5 w-3.5" />Ver Respostas
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-2 text-[11px] font-semibold text-primary hover:bg-primary/15 transition-colors">
                  <Edit2 className="h-3.5 w-3.5" />Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
