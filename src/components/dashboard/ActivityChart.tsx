import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { dia: "Seg", respostas: 38, contatos: 12, tarefas: 20 },
  { dia: "Ter", respostas: 52, contatos: 19, tarefas: 31 },
  { dia: "Qua", respostas: 61, contatos: 27, tarefas: 18 },
  { dia: "Qui", respostas: 45, contatos: 14, tarefas: 24 },
  { dia: "Sex", respostas: 78, contatos: 33, tarefas: 42 },
  { dia: "Sáb", respostas: 29, contatos: 8, tarefas: 11 },
  { dia: "Dom", respostas: 15, contatos: 5, tarefas: 7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
        <p className="mb-2 text-xs font-semibold text-foreground">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ActivityChart() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-md">
      <div className="mb-3 flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Atividade Semanal</h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Respostas, contatos e tarefas por dia</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
          Última semana
        </span>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={8}
            barGap={2}
            margin={{ top: 4, right: 4, left: -22, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
            <XAxis
              dataKey="dia"
              tick={{ fontSize: 11, fill: "rgb(100,116,139)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "rgb(100,116,139)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
            />
            <Bar dataKey="respostas" name="Respostas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="contatos"  name="Contatos"  fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tarefas"   name="Tarefas"   fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
