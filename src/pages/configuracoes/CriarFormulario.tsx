import { Plus, Type, AlignLeft, List, ToggleLeft, Calendar, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'

const fieldTypes = [
  { icon: Type,        label: 'Texto Curto',  color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-500/10'    },
  { icon: AlignLeft,   label: 'Texto Longo',  color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  { icon: List,        label: 'Seleção',      color: 'text-emerald-600',bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: ToggleLeft,  label: 'Sim / Não',    color: 'text-amber-600',  bg: 'bg-amber-50 dark:bg-amber-500/10'  },
  { icon: Calendar,    label: 'Data',         color: 'text-teal-600',   bg: 'bg-teal-50 dark:bg-teal-500/10'    },
  { icon: Hash,        label: 'Número',       color: 'text-rose-600',   bg: 'bg-rose-50 dark:bg-rose-500/10'    },
]

const previewFields = [
  { label: 'Nome completo', type: 'Texto Curto' },
  { label: 'E-mail',        type: 'Texto Curto' },
  { label: 'Mensagem',      type: 'Texto Longo'  },
]

export default function CriarFormulario() {
  return (
    <div className="flex h-full gap-4 overflow-hidden">
      {/* Field palette */}
      <div className="w-56 shrink-0 overflow-y-auto">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
          <p className="text-xs font-semibold text-foreground mb-3">Tipos de Campo</p>
          <div className="space-y-1.5">
            {fieldTypes.map(f => (
              <button key={f.label} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <div className={cn('flex h-6 w-6 items-center justify-center rounded-lg', f.bg)}>
                  <f.icon className={cn('h-3.5 w-3.5', f.color)} />
                </div>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-md space-y-3">
          <div className="mb-4">
            <input placeholder="Título do formulário" className="w-full rounded-xl border border-dashed border-border bg-transparent px-3 py-2 text-base font-semibold placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
            <input placeholder="Descrição (opcional)" className="w-full rounded-xl border-0 bg-transparent px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none" />
          </div>

          {previewFields.map((field, i) => (
            <div key={i} className="group rounded-xl border border-border bg-background p-3 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <input defaultValue={field.label} className="flex-1 text-xs font-semibold text-foreground bg-transparent focus:outline-none" />
                <span className="text-[10px] text-muted-foreground ml-2">{field.type}</span>
              </div>
              <div className="h-7 rounded-lg border border-border/60 bg-muted/30" />
            </div>
          ))}

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
            <Plus className="h-4 w-4" />Adicionar campo
          </button>

          <div className="pt-3 flex gap-2">
            <button className="flex-1 rounded-xl border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">Pré-visualizar</button>
            <button className="flex-1 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">Publicar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
