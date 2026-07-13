import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Pendentes",   value: 312, color: "#f59e0b" },
  { name: "Em andamento", value: 228, color: "#3b82f6" },
  { name: "Concluídas",  value: 95,  color: "#10b981" },
  { name: "Canceladas",  value: 35,  color: "#f43f5e" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0];
    return (
      <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.payload.color }} />
          <p className="text-[11px] font-semibold text-foreground">{d.name}</p>
        </div>
        <p className="text-xs font-bold" style={{ color: d.payload.color }}>{d.value} tarefas</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1">
      {payload.map((entry: any) => (
        <li key={entry.value} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-[10px] text-muted-foreground">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export function TaskStatusChart() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-md">
      <div className="mb-1 shrink-0">
        <h3 className="text-sm font-semibold text-foreground">Status das Tarefas</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Distribuição de 670 tarefas</p>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="48%"
              innerRadius="40%"
              outerRadius="68%"
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
