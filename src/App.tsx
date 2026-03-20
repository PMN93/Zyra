import { Sidebar } from "./components/dashboard/Sidebar";
import { Header } from "./components/dashboard/Header";
import { StatsCard } from "./components/dashboard/StatsCard";
import { QuickActions } from "./components/dashboard/QuickActions";
import { RecentActivity } from "./components/dashboard/RecentActivity";
import { ThemeProvider } from "../components/theme-provider"; // 1. Importe o Provider aqui

import {
  ListTodo,
  FileText,
  MessageSquare,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Users,
  Target,
} from "lucide-react";

function App() {
  return (
    // 2. Envolva tudo com o ThemeProvider
    <ThemeProvider defaultTheme="light" storageKey="zyra-ui-theme">
      <div className="flex h-screen bg-background">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Dashboard" subtitle="Visão geral do negócio" />

          <main className="flex-1 overflow-auto p-6">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total de Tarefas"
                value="670"
                subtitle="670 tarefas no total"
                icon={ListTodo}
                iconColor="text-blue-600 dark:text-blue-400"
                iconBg="bg-blue-50 dark:bg-blue-500/10"
              />
              <StatsCard
                title="Formulários Ativos"
                value="2"
                trend="+0 novos esta semana"
                trendType="neutral"
                icon={FileText}
                iconColor="text-emerald-600"
                iconBg="bg-emerald-50"
              />
              <StatsCard
                title="Respostas Recebidas"
                value="1954"
                trend="+0% vs semana anterior"
                trendType="neutral"
                icon={MessageSquare}
                iconColor="text-amber-600"
                iconBg="bg-amber-50"
              />
              <StatsCard
                title="Taxa de Conclusão"
                value="0%"
                subtitle="0 concluídas esta semana"
                icon={CheckCircle2}
                iconColor="text-violet-600"
                iconBg="bg-violet-50"
              />
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="WhatsApp Ativo"
                value="0/1"
                trend="Conexões em tempo real"
                trendType="positive"
                icon={MessageCircle}
                iconColor="text-teal-600"
                iconBg="bg-teal-50"
              />
              <StatsCard
                title="Agendamentos Hoje"
                value="0"
                trend="+0 amanhã"
                trendType="neutral"
                icon={Calendar}
                iconColor="text-blue-600"
                iconBg="bg-blue-50"
              />
              <StatsCard
                title="Total Contatos"
                value="643"
                trend="+44 esta semana"
                trendType="positive"
                icon={Users}
                iconColor="text-indigo-600"
                iconBg="bg-indigo-50"
              />
              <StatsCard
                title="Campanhas Ativas"
                value="0"
                subtitle="0 msgs enviadas"
                icon={Target}
                iconColor="text-rose-600"
                iconBg="bg-rose-50"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <RecentActivity />
              </div>
              <div className="lg:col-span-2">
                <QuickActions />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
