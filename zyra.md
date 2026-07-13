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
  - **Status dos Formulários** (shrink-0) — grid 2×2 com Aprovados (emerald/CheckSquare), Reprovados (rose/XSquare), Pendente (amber/Clock), Desistente (slate/UserX); valores alimentados por `MOCK_FORM_STATUS`, cursor-pointer nos itens

## Seletor de mês
- Embutido no Header via prop `actions`
- Navegação com setas ← → por mês/ano (ambas com `cursor-pointer`)
- Seta direita desabilitada no mês atual (`disabled:cursor-not-allowed`)
- Badge com largura fixa `w-[108px] whitespace-nowrap` para não causar layout shift
- Exibe "Mês atual" (bg-primary/10, text-primary) ou "Mês anterior" (bg-muted, text-muted-foreground)
- Meses disponíveis no mock: 2025-01 a 2025-04 + 2026-04 (mês corrente)

## Dados e lógica de estado (Dashboard.tsx)
- `weeklyData: WeekData[]` — array de 4 semanas, cada uma com `{ semana, recebido, trafego, indicacao, instagram }`
- `formStatus: FormStatus` — `{ aprovados, reprovados, pendente, desistente }` — alimenta o grid Status dos Formulários
- `totals` — soma de cada métrica em todas as semanas, alimenta os KPI cards e a pizza
- **Modo MOCK ativo:**
  - `MOCK_DATA` (Record<string, WeekData[]>) com chaves `'YYYY-MM'`, Jan–Abr 2025
  - `MOCK_FORM_STATUS` (Record<string, FormStatus>) com chaves `'YYYY-MM'`, Jan–Abr 2025
- **Modo API (comentado):** bloco `useEffect` pronto para descomentar em Dashboard.tsx
- Para ativar a API:
  1. Descomentar o bloco `useEffect` (já inclui `setWeeklyData` e `setFormStatus`)
  2. Remover `MOCK_DATA`, `MOCK_FORM_STATUS`, `EMPTY_FORM_STATUS` e os dois `useMemo` mocados
  3. Trocar o import de `useState, useMemo` para `useState, useMemo, useEffect`
  4. A API deve aceitar `?month=YYYY-MM` e retornar `{ weeks: WeekData[], formStatus: FormStatus }`

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

## Interface FormStatus (definida em Dashboard.tsx)
```ts
interface FormStatus {
  aprovados:  number
  reprovados: number
  pendente:   number
  desistente: number
}
```

## Estado atual do Dashboard (✓ concluído)
- KPI cards, gráfico de barras, pizza e status dos formulários todos funcionando com mock
- Sem erros de TypeScript (apenas hints de depreciação do Recharts/Lucide, não críticos)
- CSS global em `globals.css` remove outline de foco nos gráficos (`.recharts-wrapper *:focus { outline: none }`)
- `cursor-pointer` nos botões de navegação, notificações e itens do Status dos Formulários

## Pendências / próximos passos
- **Integração API do Dashboard**: estrutura pronta, basta seguir os 4 passos em "Para ativar a API" acima
- API deve aceitar `?month=YYYY-MM` e retornar `{ weeks: WeekData[], formStatus: FormStatus }`
- **Próximas páginas a construir**: Contatos, Quadro, Respostas, Formulários, Tags (e subpáginas de Relatórios/Configurações)
