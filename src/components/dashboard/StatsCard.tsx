import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  action?: React.ReactNode;
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
  action,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <div className="mt-2">
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trendType === "positive" && "text-emerald-600",
                  trendType === "negative" && "text-red-600",
                  trendType === "neutral" && "text-muted-foreground",
                )}
              >
                {trend}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {action}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              iconBg,
              "dark:bg-primary/10",
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>
      </div>
    </div>
  );
}
