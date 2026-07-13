import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const roles = ['Admin', 'Gerente', 'Operador', 'Analista']
const menuItems = [
  'Dashboard', 'Contatos', 'Quadro', 'Respostas', 'Formulários', 'Tags', 'Relatórios', 'Configurações',
]

// true = allowed, false = denied, null = partial
const permissions: Record<string, Record<string, boolean | null>> = {
  Admin:    { Dashboard: true,  Contatos: true,  Quadro: true,  Respostas: true,  'Formulários': true,  Tags: true,  'Relatórios': true,  'Configurações': true  },
  Gerente:  { Dashboard: true,  Contatos: true,  Quadro: true,  Respostas: true,  'Formulários': true,  Tags: true,  'Relatórios': true,  'Configurações': false },
  Operador: { Dashboard: true,  Contatos: true,  Quadro: true,  Respostas: true,  'Formulários': false, Tags: false, 'Relatórios': null,  'Configurações': false },
  Analista: { Dashboard: true,  Contatos: false, Quadro: false, Respostas: true,  'Formulários': true,  Tags: false, 'Relatórios': true,  'Configurações': false },
}

function PermCell({ value }: { value: boolean | null }) {
  if (value === true)  return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20"><Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /></div>
  if (value === null)  return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20"><Minus className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /></div>
  return <div className="h-6 w-6 rounded-full border-2 border-border" />
}

export default function PermissoesMenu() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <div className="flex-1 rounded-2xl border border-border bg-card shadow-md overflow-hidden min-h-0">
        {/* Header row */}
        <div className={`grid items-center border-b border-border bg-muted/30 px-5 py-3`} style={{ gridTemplateColumns: `1fr repeat(${roles.length}, 1fr)` }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Menu</p>
          {roles.map(r => (
            <p key={r} className="text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{r}</p>
          ))}
        </div>

        {/* Rows */}
        <div className="overflow-y-auto h-[calc(100%-44px)]">
          {menuItems.map((item, i) => (
            <div
              key={item}
              className={cn(
                'grid items-center px-5 py-3 hover:bg-muted/30 transition-colors',
                i < menuItems.length - 1 && 'border-b border-border/50'
              )}
              style={{ gridTemplateColumns: `1fr repeat(${roles.length}, 1fr)` }}
            >
              <p className="text-xs font-medium text-foreground">{item}</p>
              {roles.map(r => (
                <div key={r} className="flex justify-center">
                  <PermCell value={permissions[r][item]} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 shrink-0 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center"><Check className="h-2 w-2 text-emerald-600" /></span>Acesso total</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-amber-100 dark:bg-amber-500/20" />Acesso parcial</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border-2 border-border" />Sem acesso</span>
        <button className="ml-auto rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors">Salvar alterações</button>
      </div>
    </div>
  )
}
