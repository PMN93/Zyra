import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  accentColor?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  trendType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  accentColor = "from-primary to-primary/40",
}: StatsCardProps) {
  const TrendIcon =
    trendType === "positive" ? TrendingUp
    : trendType === "negative" ? TrendingDown
    : Minus;

  const trendColor =
    trendType === "positive" ? "text-emerald-500 dark:text-emerald-400"
    : trendType === "negative" ? "text-red-500 dark:text-red-400"
    : "text-muted-foreground";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      {/* Left accent bar */}
      <div className={cn(
        "absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b",
        accentColor
      )} />

      <div className="flex items-center gap-3 px-4 py-3.5 pl-5">
        {/* Icon */}
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          iconBg
        )}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium text-muted-foreground truncate leading-none">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-xl font-bold text-foreground leading-none">{value}</p>
            {trend && (
              <span className={cn("flex items-center gap-0.5 text-[10px] font-medium leading-none", trendColor)}>
                <TrendIcon className="h-2.5 w-2.5" />
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-[10px] text-muted-foreground truncate leading-none">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
