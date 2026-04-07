import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { dia: 'Seg', respostas: 38, tempoMedio: 4.2 },
  { dia: 'Ter', respostas: 52, tempoMedio: 3.8 },
  { dia: 'Qua', respostas: 61, tempoMedio: 5.1 },
  { dia: 'Qui', respostas: 45, tempoMedio: 3.2 },
  { dia: 'Sex', respostas: 78, tempoMedio: 4.7 },
  { dia: 'Sáb', respostas: 29, tempoMedio: 2.9 },
  { dia: 'Dom', respostas: 15, tempoMedio: 1.8 },
]

const kpis = [
  { label: 'Total Atendimentos', value: '318',    sub: 'Esta semana',   color: '#3b82f6' },
  { label: 'Tempo Médio',        value: '3.7h',   sub: 'Resposta',      color: '#10b981' },
  { label: 'Satisfação',         value: '94%',    sub: 'Índice geral',  color: '#8b5cf6' },
  { label: 'Pendentes',          value: '12',     sub: 'Aguardando',    color: '#f59e0b' },
]

export default function RelatoriosAtendimentos() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {kpis.map(k => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-4 shadow-md">
            <p className="text-[11px] text-muted-foreground">{k.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: k.color }}>{k.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Area chart */}
      <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-md min-h-0 flex flex-col">
        <div className="mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-foreground">Volume de Atendimentos</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Respostas recebidas por dia da semana</p>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradAtend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgb(100,116,139)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="respostas" name="Atendimentos" stroke="#3b82f6" strokeWidth={2} fill="url(#gradAtend)" dot={false} activeDot={{ r: 5, fill: '#3b82f6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
