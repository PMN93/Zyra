import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { mes: 'Out', agendamentos: 12 }, { mes: 'Nov', agendamentos: 19 },
  { mes: 'Dez', agendamentos: 8  }, { mes: 'Jan', agendamentos: 24 },
  { mes: 'Fev', agendamentos: 17 }, { mes: 'Mar', agendamentos: 31 },
  { mes: 'Abr', agendamentos: 0  },
]

const upcoming = [
  { id: 1, name: 'Ana Silva',      type: 'Reunião de alinhamento',  date: '10 Abr', time: '14:00', status: 'confirmed' },
  { id: 2, name: 'Carlos Lima',    type: 'Demo do produto',          date: '11 Abr', time: '10:30', status: 'pending'   },
  { id: 3, name: 'Fernanda Costa', type: 'Follow-up proposta',       date: '12 Abr', time: '16:00', status: 'confirmed' },
]

export default function RelatoriosAgendamentos() {
  return (
    <div className="flex h-full gap-3">
      {/* Chart */}
      <div className="flex-1 flex flex-col rounded-2xl border border-border bg-card p-5 shadow-md min-h-0">
        <div className="mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-foreground">Agendamentos por Mês</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Evolução dos agendamentos nos últimos 7 meses</p>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="agendamentos" name="Agendamentos" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming list */}
      <div className="w-72 shrink-0 flex flex-col rounded-2xl border border-border bg-card p-4 shadow-md min-h-0">
        <h3 className="text-sm font-semibold text-foreground mb-3 shrink-0">Próximos Agendamentos</h3>
        <div className="flex-1 overflow-y-auto space-y-2">
          {upcoming.map((a, i) => (
            <div key={a.id} className={`rounded-xl border border-border/50 bg-muted/30 p-3 ${i < upcoming.length - 1 ? '' : ''}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-foreground truncate">{a.name}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${a.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}`}>
                  {a.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{a.type}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{a.date} · {a.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
