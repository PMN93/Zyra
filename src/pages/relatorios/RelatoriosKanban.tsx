import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { semana: 'S1', aFazer: 12, emAndamento: 8,  concluido: 5  },
  { semana: 'S2', aFazer: 15, emAndamento: 11, concluido: 9  },
  { semana: 'S3', aFazer: 9,  emAndamento: 14, concluido: 18 },
  { semana: 'S4', aFazer: 7,  emAndamento: 10, concluido: 24 },
]

const stats = [
  { label: 'Total de Tarefas', value: '670', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { label: 'Em Andamento',     value: '43',  color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { label: 'Concluídas',       value: '0',   color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { label: 'Taxa Conclusão',   value: '0%',  color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-500/10' },
]

export default function RelatoriosKanban() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {stats.map(s => (
          <div key={s.label} className={`rounded-2xl border border-border bg-card p-4 shadow-md flex items-center gap-3`}>
            <div className={`h-2 w-2 rounded-full ${s.bg.replace('bg-', 'bg-').split(' ')[0]}`} style={{ backgroundColor: 'currentColor' }} />
            <div>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-md min-h-0 flex flex-col">
        <div className="mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-foreground">Evolução do Quadro por Semana</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Distribuição de tarefas por status</p>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={28} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="semana" tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', fontSize: '12px' }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
              <Bar dataKey="aFazer"      name="A Fazer"       fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="emAndamento" name="Em Andamento"  fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="concluido"   name="Concluído"     fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
