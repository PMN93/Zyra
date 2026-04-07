# Zyra CRM — Contexto do Projeto

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3 + shadcn/ui (components.json)
- Recharts (gráficos)
- React Router DOM v7
- Lucide React (ícones)

## Estrutura de pastas relevante
```
src/
  pages/
    Dashboard.tsx              ← página principal
    Contatos.tsx
    Quadro.tsx
    Respostas.tsx
    Formularios.tsx
    Tags.tsx
    relatorios/
      RelatoriosLayout.tsx
      RelatoriosKanban.tsx
      RelatoriosAgendamentos.tsx
      RelatoriosAtendimentos.tsx
      RelatoriosFormularios.tsx
    configuracoes/
      ConfiguracoesLayout.tsx
      CriarQuadros.tsx
      CriarFormulario.tsx
      StatusRespostas.tsx
      GerenciarUsuarios.tsx
      PermissoesMenu.tsx

  components/dashboard/
    DashboardLayout.tsx        ← layout com Sidebar + <Outlet />
    Sidebar.tsx                ← nav colapsável, dark/light toggle, usuário fixo "Maria Costa"
    Header.tsx                 ← título + subtítulo da página
    StatsCard.tsx              ← card KPI reutilizável
    ActivityChart.tsx          ← BarChart semanal (Respostas, Contatos, Tarefas por dia)
    CompletionDonut.tsx        ← donut de taxa de conclusão
    ContactsLineChart.tsx      ← AreaChart crescimento de contatos (6 meses)
    TaskStatusChart.tsx        ← PieChart distribuição de status das tarefas
    QuickActions.tsx           ← botões de ação rápida (5 ações em grid)
    RecentActivity.tsx         ← lista de atividades recentes (componente existe mas não usado no Dashboard atual)
```

## Layout atual do Dashboard (Dashboard.tsx)
3 linhas de conteúdo dentro de um flex-col com gap-3:

**Row 1** — `grid-cols-4`, altura fixa 140px
- `StatsCard` Respostas Recebidas (amber)
- `StatsCard` Total Contatos (indigo)
- `ContactsLineChart` (col-span-2) — AreaChart crescimento 6 meses

**Row 2** — `flex-1 grid-cols-3`
- `ActivityChart` (col-span-2) — BarChart por dia da semana
- `CompletionDonut` inline no card (col-span-1)

**Row 3** — `flex-1 grid-cols-3`
- `TaskStatusChart` (col-span-2) — PieChart com 4 status
- `QuickActions` (col-span-1)

## Sidebar — Navegação
**Menu principal:**
- Dashboard `/`
- Contatos `/contatos` (badge: 643)
- Quadro `/quadro`
- Respostas `/respostas`
- Formulários `/formularios`
- Tags `/tags`

**Sistema (com sub-itens):**
- Relatórios → Kanban, Agendamentos, Atendimentos, Formulários
- Configurações → Criar Quadros, Criar Formulário, Status Respostas, Gerenciar Usuários, Permissões de Menu

Sidebar é colapsável (ícone PanelLeftClose/Open). Usuário fixo: "Maria Costa / maria@email.com".

## Dados mock usados nos gráficos
- **ActivityChart**: 7 dias (Seg–Dom), 3 séries: respostas, contatos, tarefas
- **ContactsLineChart**: 6 meses (Nov–Abr), contatos crescendo 480→643
- **TaskStatusChart**: 670 tarefas — Pendentes 312, Em andamento 228, Concluídas 95, Canceladas 35
- **CompletionDonut**: 0% concluído (0 de 670)
- **StatsCards**: 1954 respostas, 643 contatos

## Histórico de alterações

### Sessão 2026-04-06
- Removidos 2 dos 4 KPI cards (restaram Respostas e Contatos)
- Removido o painel "Status Rápido" (mini cards de WhatsApp/Agendamentos/etc.)
- Removido o `RecentActivity` (lista de texto) do layout principal
- Criado `ContactsLineChart.tsx` — AreaChart com gradiente indigo
- Criado `TaskStatusChart.tsx` — PieChart tipo donut com legenda customizada
- Dashboard refatorado para 3 rows com foco em gráficos
- Corrigido erro de imports não utilizados (`LineChart`, `Line`) em `ContactsLineChart.tsx`
- Removido `"baseUrl": "."` do `tsconfig.json` (desnecessário com `moduleResolution: "bundler"` no TS5+; `paths` com `@/*` continua funcionando)

## Convenções de estilo
- Cards: `rounded-2xl border border-border bg-card p-4 shadow-md`
- Textos secundários: `text-[11px] text-muted-foreground`
- Títulos de card: `text-sm font-semibold text-foreground`
- Cores por domínio: blue=tarefas, amber=respostas, indigo=contatos, violet=conclusão, teal=WhatsApp, emerald=formulários, rose=campanhas
- Suporte a dark mode via classes `dark:` do Tailwind
