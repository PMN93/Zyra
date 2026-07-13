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
  size?: number;
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
  size = 110,
}: CompletionDonutProps) {
  const filled = value <= 0 ? 1 : value;
  const empty = 100 - filled;
  const isZero = value <= 0;

  const innerRadius = Math.round(size * 0.31);
  const outerRadius = Math.round(size * 0.45);
  const fontSize = size >= 160 ? 'text-3xl' : 'text-xl';

  const data = [
    { name: "Concluído", value: filled },
    { name: "Restante", value: empty },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative" style={{ height: size, width: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
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
          <span className={`${fontSize} font-bold text-foreground`}>{value}%</span>
        </div>
      </div>

      <p className="text-sm font-semibold text-foreground text-center">{label}</p>
      {sublabel && (
        <p className="text-xs text-muted-foreground text-center">{sublabel}</p>
      )}
    </div>
  );
}
