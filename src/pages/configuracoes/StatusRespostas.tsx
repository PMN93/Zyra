import { Plus, GripVertical, Edit2, Trash2 } from 'lucide-react'

const statuses = [
  { id: 1, label: 'Novo',          color: '#3b82f6', count: 24 },
  { id: 2, label: 'Em Análise',    color: '#f59e0b', count: 18 },
  { id: 3, label: 'Em Andamento',  color: '#8b5cf6', count: 31 },
  { id: 4, label: 'Aguardando',    color: '#f97316', count: 9  },
  { id: 5, label: 'Resolvido',     color: '#10b981', count: 142},
  { id: 6, label: 'Encerrado',     color: '#64748b', count: 67 },
]

export default function StatusRespostas() {
  return (
    <div className="flex h-full gap-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Status de Respostas</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Arraste para reordenar o pipeline</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
              <Plus className="h-3.5 w-3.5" />Novo Status
            </button>
          </div>

          <div className="divide-y divide-border/50">
            {statuses.map((s, i) => (
              <div key={s.id} className="group flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <button className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab transition-opacity">
                  <GripVertical className="h-4 w-4" />
                </button>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: s.color }}>
                  {i + 1}
                </span>
                <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                <p className="flex-1 text-sm font-medium text-foreground">{s.label}</p>
                <span className="text-xs text-muted-foreground">{s.count} respostas</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className="w-64 shrink-0">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
          <p className="text-xs font-semibold text-foreground mb-3">Pipeline Visual</p>
          <div className="flex items-center gap-1">
            {statuses.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-1 flex-1">
                <div className="h-2 w-full rounded-full" style={{ backgroundColor: s.color, opacity: 0.7 + i * 0.05 }} />
                <p className="text-[9px] text-center text-muted-foreground leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
