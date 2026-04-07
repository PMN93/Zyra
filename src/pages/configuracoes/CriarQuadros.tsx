import { LayoutGrid, Palette, Users } from 'lucide-react'

const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#14b8a6','#f97316','#6366f1']
const members = ['Ana Silva','João Pedro','Maria Souza','Carlos Lima','Fernanda Costa']

export default function CriarQuadros() {
  return (
    <div className="flex h-full gap-4 overflow-hidden">
      {/* Form */}
      <div className="flex-1 overflow-y-auto">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-md space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <LayoutGrid className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Novo Quadro</h3>
              <p className="text-[11px] text-muted-foreground">Configure o quadro Kanban</p>
            </div>
          </div>

          {[
            { label: 'Nome do Quadro',  placeholder: 'Ex: Pipeline de Vendas', type: 'input' },
            { label: 'Descrição',       placeholder: 'Descreva o objetivo deste quadro...', type: 'textarea' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs font-medium text-foreground block mb-1.5">{f.label}</label>
              {f.type === 'input'
                ? <input placeholder={f.placeholder} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                : <textarea rows={3} placeholder={f.placeholder} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              }
            </div>
          ))}

          {/* Color picker */}
          <div>
            <label className="text-xs font-medium text-foreground block mb-2 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5" />Cor do Quadro
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {colors.map(c => (
                <button key={c} className="h-7 w-7 rounded-lg border-2 border-transparent hover:border-foreground/30 transition-all" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="text-xs font-medium text-foreground block mb-2 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />Membros
            </label>
            <div className="space-y-1.5">
              {members.map(m => (
                <label key={m} className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-xs text-foreground">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">
            Criar Quadro
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="w-72 shrink-0">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
          <p className="text-xs font-semibold text-foreground mb-3">Pré-visualização</p>
          <div className="space-y-2">
            {['A Fazer', 'Em Andamento', 'Concluído'].map((col, i) => (
              <div key={col} className="rounded-xl border border-border bg-background p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${['bg-slate-400','bg-blue-500','bg-emerald-500'][i]}`} />
                  <span className="text-[11px] font-semibold text-foreground">{col}</span>
                </div>
                <div className="h-1.5 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
