import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface CompletionDonutProps {
  value: number;      // 0-100
  label: string;
  sublabel?: string;
  color?: string;
  bgColor?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-xl text-xs">
        <span className="font-semibold text-foreground">{payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

export function CompletionDonut({
  value,
  label,
  sublabel,
  color = "#3b82f6",
  bgColor = "#e2e8f0",
}: CompletionDonutProps) {
  const filled = value <= 0 ? 1 : value;
  const empty = 100 - filled;
  const isZero = value <= 0;

  const data = [
    { name: "Concluído", value: filled },
    { name: "Restante", value: empty },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="relative h-[110px] w-[110px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={34}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={isZero ? bgColor : color} />
              <Cell fill={bgColor} />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-foreground">{value}%</span>
        </div>
      </div>

      <p className="text-sm font-semibold text-foreground text-center">{label}</p>
      {sublabel && (
        <p className="text-xs text-muted-foreground text-center">{sublabel}</p>
      )}
    </div>
  );
}
