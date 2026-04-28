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
    Dashboard.tsx              ← página principal (detalhada abaixo)
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
    Header.tsx                 ← título + subtítulo + prop `actions` (ReactNode injetado à direita)
    StatsCard.tsx              ← card KPI reutilizável
    ActivityChart.tsx          ← BarChart mensal (4 semanas × 4 métricas), recebe `data: WeekData[]` via props
    CompletionDonut.tsx        ← donut com prop `size`, não usado no Dashboard atual
    ContactsLineChart.tsx      ← não usado no Dashboard atual
    TaskStatusChart.tsx        ← não usado no Dashboard atual
    QuickActions.tsx           ← não usado no Dashboard atual
    RecentActivity.tsx         ← não usado no Dashboard atual
```

## Layout atual do Dashboard (Dashboard.tsx)
2 linhas de conteúdo dentro de um flex-col com gap-3, precedidas pelo Header:

**Header** — `Header` com `actions={monthSelector}` (seletor de mês embutido no canto direito do cabeçalho)

**Row 1** — `grid-cols-4 shrink-0` — 4 KPI cards
- `StatsCard` Total Recebido (blue, ícone Inbox)
- `StatsCard` Tráfego (amber, ícone Activity)
- `StatsCard` Indicação (indigo, ícone Share2)
- `StatsCard` Instagram (violet, ícone Instagram)
- Valores calculados automaticamente como soma das 4 semanas de `weeklyData`

**Row 2** — `flex-[2] grid-cols-3 min-h-0`
- `ActivityChart` (col-span-2) — BarChart com 4 barras por semana (Total Recebido, Tráfego, Indicação, Instagram), barSize=22
- Coluna direita (col-span-1), flex-col com 2 blocos:
  - **Origem dos Leads** (flex-1) — PieChart pizza sólida com LabelList de valores dentro das fatias (branco bold 1rem), legenda embaixo, tooltip fundo escuro #1e293b
  - **Status dos Formulários** (shrink-0) — grid 2×2 com Aprovados (emerald/CheckSquare), Reprovados (rose/XSquare), Pendente (amber/Clock), Desistente (slate/UserX); valores fixos em '0' aguardando API

## Seletor de mês
- Embutido no Header via prop `actions`
- Navegação com setas ← → por mês/ano
- Seta direita desabilitada no mês atual
- Badge "Mês atual" exibida quando no mês corrente
- Meses disponíveis no mock: 2025-01 a 2025-04

## Dados e lógica de estado (Dashboard.tsx)
- `weeklyData: WeekData[]` — array de 4 semanas, cada uma com `{ semana, recebido, trafego, indicacao, instagram }`
- `totals` — soma de cada métrica em todas as semanas, alimenta os KPI cards e a pizza
- **Modo MOCK ativo:** `MOCK_DATA` (Record<string, WeekData[]>) com chaves `'YYYY-MM'`, Jan–Abr 2025
- **Modo API (comentado):** `useEffect` + `fetch('/api/dashboard?month=YYYY-MM')` pronto para descomentar; API deve retornar `WeekData[]`
- Para ativar a API: descomentar bloco `useEffect` em Dashboard.tsx e remover `MOCK_DATA` e o `useMemo` mocado

## Interface WeekData (exportada de ActivityChart.tsx)
```ts
interface WeekData {
  semana: string       // 'Sem 1' | 'Sem 2' | 'Sem 3' | 'Sem 4'
  recebido: number
  trafego: number
  indicacao: number
  instagram: number
}
```

## Header (Header.tsx)
- Props: `title`, `subtitle?`, `actions?: React.ReactNode`
- Direita fixa: campo de busca + botão de notificações (badge com "3")
- `actions` é injetado após o sino, separado por linha vertical `border-l`
- Botão "Novo" foi removido (não há criação nessa tela)

## Sidebar (Sidebar.tsx)
**Menu principal:**
- Dashboard `/`
- Contatos `/contatos`
- Quadro `/quadro`
- Respostas `/respostas`
- Formulários `/formularios`
- Tags `/tags`

**Sistema (com sub-itens):**
- Relatórios → Kanban, Agendamentos, Atendimentos, Formulários
- Configurações → Criar Quadros, Criar Formulário, Status Respostas, Gerenciar Usuários, Permissões de Menu

Sidebar colapsável (PanelLeftClose/Open). Usuário fixo: "Maria Costa / maria@email.com".

## Tipografia e escala global
- `font-size: 112.5%` no `html` (globals.css) — equivale a 18px base, escala todo o site via rem
- Todos os textos usam classes rem-based do Tailwind (`text-xs`, `text-sm`, etc.)
- Textos inline do Recharts (fontSize nos eixos, wrapperStyle da Legend) usam `'0.75rem'`

## Convenções de estilo
- Cards: `rounded-2xl border border-border bg-card p-4 shadow-md`
- Títulos de card: `text-sm font-semibold text-foreground`
- Textos secundários: `text-xs text-muted-foreground`
- Cores por domínio: blue=recebido, amber=tráfego, indigo=indicação, violet=instagram, emerald=aprovado, rose=reprovado, amber=pendente, slate=desistente
- Suporte a dark mode via classes `dark:` do Tailwind

## Pendências / próximos passos
- **Status dos Formulários** (Aprovados, Reprovados, Pendente, Desistente): valores fixos em '0', aguardam integração com API
- **Integração API do Dashboard**: estrutura pronta, basta descomentar `useEffect` em Dashboard.tsx
- API deve aceitar `?month=YYYY-MM` e retornar `WeekData[]` (4 semanas)
