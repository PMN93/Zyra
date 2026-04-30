// ─── Quando a API estiver pronta, ative este import e remova o useState mocado ─
// import { useState, useMemo, useEffect } from 'react'
import { useState, useMemo } from 'react'
import { Header } from '../components/dashboard/Header'
import { StatsCard } from '../components/dashboard/StatsCard'
import { ActivityChart, type WeekData } from '../components/dashboard/ActivityChart'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts'
import { Inbox, Activity, Share2, Instagram, CheckSquare, XSquare, Clock, UserX, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── MOCK — remova este bloco inteiro quando a API estiver pronta ─────────────
interface FormStatus { aprovados: number; reprovados: number; pendente: number; desistente: number }

const MOCK_FORM_STATUS: Record<string, FormStatus> = {
  '2025-01': { aprovados: 18, reprovados: 5,  pendente: 12, desistente: 3  },
  '2025-02': { aprovados: 22, reprovados: 8,  pendente: 9,  desistente: 6  },
  '2025-03': { aprovados: 35, reprovados: 11, pendente: 14, desistente: 4  },
  '2025-04': { aprovados: 41, reprovados: 7,  pendente: 18, desistente: 8  },
  '2026-04': { aprovados: 52, reprovados: 9,  pendente: 21, desistente: 5  },
}
const EMPTY_FORM_STATUS: FormStatus = { aprovados: 0, reprovados: 0, pendente: 0, desistente: 0 }

const MOCK_DATA: Record<string, WeekData[]> = {
  '2025-01': [
    { semana: 'Sem 1', recebido: 20, trafego: 8,  indicacao: 5,  instagram: 7  },
    { semana: 'Sem 2', recebido: 35, trafego: 14, indicacao: 10, instagram: 11 },
    { semana: 'Sem 3', recebido: 28, trafego: 11, indicacao: 8,  instagram: 9  },
    { semana: 'Sem 4', recebido: 40, trafego: 18, indicacao: 12, instagram: 10 },
  ],
  '2025-02': [
    { semana: 'Sem 1', recebido: 18, trafego: 6,  indicacao: 7,  instagram: 5  },
    { semana: 'Sem 2', recebido: 42, trafego: 20, indicacao: 13, instagram: 9  },
    { semana: 'Sem 3', recebido: 31, trafego: 15, indicacao: 9,  instagram: 7  },
    { semana: 'Sem 4', recebido: 25, trafego: 10, indicacao: 6,  instagram: 9  },
  ],
  '2025-03': [
    { semana: 'Sem 1', recebido: 44, trafego: 22, indicacao: 15, instagram: 7  },
    { semana: 'Sem 2', recebido: 38, trafego: 17, indicacao: 11, instagram: 10 },
    { semana: 'Sem 3', recebido: 55, trafego: 25, indicacao: 18, instagram: 12 },
    { semana: 'Sem 4', recebido: 30, trafego: 13, indicacao: 9,  instagram: 8  },
  ],
  '2025-04': [
    { semana: 'Sem 1', recebido: 50, trafego: 20, indicacao: 20, instagram: 10 },
    { semana: 'Sem 2', recebido: 30, trafego: 10, indicacao: 10, instagram: 10 },
    { semana: 'Sem 3', recebido: 45, trafego: 18, indicacao: 16, instagram: 11 },
    { semana: 'Sem 4', recebido: 60, trafego: 28, indicacao: 20, instagram: 12 },
  ],
  '2026-04': [
    { semana: 'Sem 1', recebido: 55, trafego: 24, indicacao: 18, instagram: 13 },
    { semana: 'Sem 2', recebido: 48, trafego: 19, indicacao: 15, instagram: 14 },
    { semana: 'Sem 3', recebido: 62, trafego: 30, indicacao: 22, instagram: 10 },
    { semana: 'Sem 4', recebido: 70, trafego: 35, indicacao: 25, instagram: 10 },
  ],
}
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY_WEEKS: WeekData[] = [
  { semana: 'Sem 1', recebido: 0, trafego: 0, indicacao: 0, instagram: 0 },
  { semana: 'Sem 2', recebido: 0, trafego: 0, indicacao: 0, instagram: 0 },
  { semana: 'Sem 3', recebido: 0, trafego: 0, indicacao: 0, instagram: 0 },
  { semana: 'Sem 4', recebido: 0, trafego: 0, indicacao: 0, instagram: 0 },
]

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

function toKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

export default function Dashboard() {
  const now = new Date()
  const [year,  setYear]  = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  // ─── MOCK: lê os dados do objeto local ───────────────────────────────────────
  const weeklyData  = useMemo(() => MOCK_DATA[toKey(year, month)]       ?? EMPTY_WEEKS,       [year, month])
  const formStatus  = useMemo(() => MOCK_FORM_STATUS[toKey(year, month)] ?? EMPTY_FORM_STATUS, [year, month])
  // ─── API: substitua os dois blocos acima por este quando a API estiver pronta ─
  // const [weeklyData, setWeeklyData]   = useState<WeekData[]>(EMPTY_WEEKS)
  // const [formStatus, setFormStatus]   = useState<FormStatus>(EMPTY_FORM_STATUS)
  // useEffect(() => {
  //   const key = toKey(year, month)
  //   fetch(`/api/dashboard?month=${key}`)
  //     .then(r => r.json())
  //     .then(data => { setWeeklyData(data.weeks); setFormStatus(data.formStatus) })
  // }, [year, month])
  // ─────────────────────────────────────────────────────────────────────────────

  const totals = useMemo(() => ({
    recebido:  weeklyData.reduce((a, w) => a + w.recebido,  0),
    trafego:   weeklyData.reduce((a, w) => a + w.trafego,   0),
    indicacao: weeklyData.reduce((a, w) => a + w.indicacao, 0),
    instagram: weeklyData.reduce((a, w) => a + w.instagram, 0),
  }), [weeklyData])

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()
    if (isCurrentMonth) return
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()

  const monthSelector = (
    <div className="flex items-center gap-1.5">
      <button
        onClick={prevMonth}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-[120px] text-center text-xs font-semibold text-foreground">
        {MONTHS[month]} {year}
      </span>
      <button
        onClick={nextMonth}
        disabled={isCurrentMonth}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <span className={`inline-block w-[108px] whitespace-nowrap text-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${isCurrentMonth ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
        {isCurrentMonth ? 'Mês atual' : 'Mês anterior'}
      </span>
    </div>
  )

  return (
    <>
      <Header title="Dashboard" subtitle="Visão geral do negócio" actions={monthSelector} />

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden">

        {/* Row 1: 4 KPI cards */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          <StatsCard
            title="Total Recebido" value={String(totals.recebido)}
            icon={Inbox} iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-50 dark:bg-blue-500/10" accentColor="from-blue-500 to-blue-400"
          />
          <StatsCard
            title="Tráfego" value={String(totals.trafego)}
            icon={Activity} iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-50 dark:bg-amber-500/10" accentColor="from-amber-500 to-amber-400"
          />
          <StatsCard
            title="Indicação" value={String(totals.indicacao)}
            icon={Share2} iconColor="text-indigo-600 dark:text-indigo-400"
            iconBg="bg-indigo-50 dark:bg-indigo-500/10" accentColor="from-indigo-500 to-indigo-400"
          />
          <StatsCard
            title="Instagram" value={String(totals.instagram)}
            icon={Instagram} iconColor="text-violet-600 dark:text-violet-400"
            iconBg="bg-violet-50 dark:bg-violet-500/10" accentColor="from-violet-500 to-violet-400"
          />
        </div>

        {/* Row 2: Activity chart + Pizza + Status Formulários */}
        <div className="flex-[2] grid grid-cols-3 gap-3 min-h-0">
          <div className="col-span-2 min-h-0"><ActivityChart data={weeklyData} /></div>

          <div className="flex flex-col gap-3 h-full overflow-hidden">
            {/* Origem dos Leads */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-md flex-1 min-h-0 overflow-hidden">
              <h3 className="text-sm font-semibold text-foreground shrink-0">Origem dos Leads</h3>
              <p className="text-xs text-muted-foreground mt-0.5 shrink-0">Distribuição total no mês</p>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Total Recebido', value: totals.recebido  },
                        { name: 'Tráfego',        value: totals.trafego   },
                        { name: 'Indicação',      value: totals.indicacao },
                        { name: 'Instagram',      value: totals.instagram },
                      ]}
                      cx="50%" cy="45%"
                      outerRadius="72%"
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {['#3b82f6','#f59e0b','#6366f1','#8b5cf6'].map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="inside"
                        style={{ fontSize: '1rem', fontWeight: 700, fill: '#fff' }}
                        formatter={(v: unknown) => (Number(v) > 0 ? String(v) : '')}
                      />
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', background: '#1e293b', fontSize: '0.75rem', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                      formatter={(value, name) => [value, name]}
                    />
                    <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: '0.75rem' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Formulários */}
            <div className="rounded-2xl border border-border bg-card px-4 pt-3 pb-3 shadow-md flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Status dos Formulários</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Situação dos leads no mês</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { icon: CheckSquare, label: 'Aprovados',  value: String(formStatus.aprovados),  color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                  { icon: XSquare,     label: 'Reprovados', value: String(formStatus.reprovados), color: 'text-rose-600 dark:text-rose-400',       bg: 'bg-rose-50 dark:bg-rose-500/10'       },
                  { icon: Clock,       label: 'Pendente',   value: String(formStatus.pendente),   color: 'text-amber-600 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-500/10'     },
                  { icon: UserX,       label: 'Desistente', value: String(formStatus.desistente), color: 'text-slate-500 dark:text-slate-400',     bg: 'bg-slate-100 dark:bg-slate-500/10'    },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                  <div key={label} className="flex items-center gap-2 rounded-xl p-2 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground leading-none">{value}</p>
                      <p className="text-xs text-muted-foreground truncate">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
