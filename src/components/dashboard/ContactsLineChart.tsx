import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { mes: "Nov", contatos: 480 },
  { mes: "Dez", contatos: 510 },
  { mes: "Jan", contatos: 543 },
  { mes: "Fev", contatos: 571 },
  { mes: "Mar", contatos: 599 },
  { mes: "Abr", contatos: 643 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-xl">
        <p className="text-[11px] font-semibold text-foreground">{label}</p>
        <p className="text-xs text-indigo-500 font-bold">{payload[0].value} contatos</p>
      </div>
    );
  }
  return null;
};

export function ContactsLineChart() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-md">
      <div className="mb-3 flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Crescimento de Contatos</h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Últimos 6 meses</p>
        </div>
        <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-500">
          +34% total
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="colorContatos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "rgb(100,116,139)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "rgb(100,116,139)" }} axisLine={false} tickLine={false} domain={[450, 680]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(99,102,241,0.2)", strokeWidth: 2 }} />
            <Area type="monotone" dataKey="contatos" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorContatos)" dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#6366f1" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
