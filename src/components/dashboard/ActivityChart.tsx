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

export interface WeekData {
  semana: string;
  recebido: number;
  trafego: number;
  indicacao: number;
  instagram: number;
}

interface ActivityChartProps {
  data: WeekData[];
}

const BARS = [
  { key: "recebido",  name: "Total Recebido", color: "#3b82f6" },
  { key: "trafego",   name: "Tráfego",        color: "#f59e0b" },
  { key: "indicacao", name: "Indicação",       color: "#6366f1" },
  { key: "instagram", name: "Instagram",       color: "#8b5cf6" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
        <p className="mb-2 text-xs font-semibold text-foreground">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-md">
      <div className="mb-4 flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Atividade Mensal</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Leads por semana — Recebido, Tráfego, Indicação e Instagram</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          Este mês
        </span>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={22}
            barGap={3}
            barCategoryGap="30%"
            margin={{ top: 8, right: 8, left: -16, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
            <XAxis
              dataKey="semana"
              tick={{ fontSize: '0.75rem', fill: "rgb(100,116,139)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: '0.75rem', fill: "rgb(100,116,139)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
            <Legend
              iconType="circle"
              iconSize={9}
              wrapperStyle={{ fontSize: "0.75rem", paddingTop: "12px" }}
            />
            {BARS.map(({ key, name, color }) => (
              <Bar key={key} dataKey={key} name={name} fill={color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
