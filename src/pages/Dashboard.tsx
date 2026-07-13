import { Header } from '../components/dashboard/Header'
import { StatsCard } from '../components/dashboard/StatsCard'
import { QuickActions } from '../components/dashboard/QuickActions'
import { ActivityChart } from '../components/dashboard/ActivityChart'
import { CompletionDonut } from '../components/dashboard/CompletionDonut'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { MessageSquare, Users, CheckSquare, Target, MessageCircle, Calendar, FileText, Megaphone, WifiOff } from 'lucide-react'

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Visão geral do negócio" />

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden">

        {/* Row 1: 4 KPI cards */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          <StatsCard
            title="Total de Tarefas" value="670"
            subtitle="670 tarefas no total"
            icon={CheckSquare} iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-50 dark:bg-blue-500/10" accentColor="from-blue-500 to-blue-400"
          />
          <StatsCard
            title="Respostas Recebidas" value="1954"
            trend="+0% vs semana anterior" trendType="neutral"
            icon={MessageSquare} iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-50 dark:bg-amber-500/10" accentColor="from-amber-500 to-amber-400"
          />
          <StatsCard
            title="Total Contatos" value="643"
            trend="+44 esta semana" trendType="positive"
            icon={Users} iconColor="text-indigo-600 dark:text-indigo-400"
            iconBg="bg-indigo-50 dark:bg-indigo-500/10" accentColor="from-indigo-500 to-indigo-400"
          />
          <StatsCard
            title="Taxa de Conclusão" value="0%"
            subtitle="0 concluídas esta semana"
            icon={Target} iconColor="text-violet-600 dark:text-violet-400"
            iconBg="bg-violet-50 dark:bg-violet-500/10" accentColor="from-violet-500 to-violet-400"
          />
        </div>

        {/* Row 2: Activity chart + Donut + Status Rápido */}
        <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
          <div className="col-span-2 min-h-0"><ActivityChart /></div>

          <div className="flex flex-col gap-3 h-full overflow-hidden">
            {/* Completion Donut */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-md flex-1 min-h-0 overflow-hidden">
              <h3 className="text-sm font-semibold text-foreground shrink-0">Taxa de Conclusão</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 shrink-0">Tarefas concluídas no período</p>
              <div className="flex-1 flex items-center justify-center min-h-0">
                <CompletionDonut value={0} label="Taxa de Conclusão" sublabel="0 de 670 concluídas" color="#3b82f6" bgColor="rgb(226,232,240)" />
              </div>
            </div>

            {/* Status Rápido */}
            <div className="rounded-2xl border border-border bg-card px-4 pt-3 pb-3 shadow-md flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">Status Rápido</h3>
                <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <WifiOff className="h-3 w-3" />
                  WA Desconectado
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { icon: MessageCircle, label: 'WhatsApp',    value: '0/1', color: 'text-teal-600 dark:text-teal-400',    bg: 'bg-teal-50 dark:bg-teal-500/10'       },
                  { icon: Calendar,      label: 'Agendamentos', value: '0',   color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10'   },
                  { icon: FileText,      label: 'Formulários',  value: '2',   color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                  { icon: Megaphone,     label: 'Campanhas',    value: '0',   color: 'text-rose-600 dark:text-rose-400',    bg: 'bg-rose-50 dark:bg-rose-500/10'       },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                  <div key={label} className="flex items-center gap-2 rounded-xl p-2 bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground leading-none">{value}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Recent activity + Quick actions */}
        <div className="flex-1 grid grid-cols-5 gap-3 min-h-0">
          <div className="col-span-3 min-h-0"><RecentActivity /></div>
          <div className="col-span-2 min-h-0"><QuickActions /></div>
        </div>

      </div>
    </>
  )
}
