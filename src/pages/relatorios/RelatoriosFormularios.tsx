import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CompletionDonut } from '../../components/dashboard/CompletionDonut'

const data = [
  { form: 'Pré-cadastro', respostas: 1954 },
  { form: 'Satisfação Q1', respostas: 128  },
  { form: 'Contato Web',   respostas: 67   },
  { form: 'Avaliação',     respostas: 312  },
]

export default function RelatoriosFormularios() {
  return (
    <div className="flex h-full gap-3">
      {/* Bar chart */}
      <div className="flex-1 flex flex-col rounded-2xl border border-border bg-card p-5 shadow-md min-h-0">
        <div className="mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-foreground">Respostas por Formulário</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Total de respostas acumuladas</p>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" barSize={20} margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,0.15)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="form" tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', fontSize: '12px' }} />
              <Bar dataKey="respostas" name="Respostas" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: donuts */}
      <div className="w-64 shrink-0 flex flex-col gap-3">
        <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-md flex flex-col items-center justify-center">
          <h3 className="text-xs font-semibold text-foreground mb-3">Taxa de Conclusão</h3>
          <CompletionDonut value={0} label="Formulários" sublabel="0 concluídos" color="#3b82f6" bgColor="rgb(226,232,240)" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-md">
          <h3 className="text-xs font-semibold text-foreground mb-3">Resumo Geral</h3>
          <div className="space-y-2">
            {[
              { label: 'Total de respostas', value: '2.461' },
              { label: 'Formulários ativos',  value: '2' },
              { label: 'Média por form',      value: '615' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
                <p className="text-xs font-bold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
