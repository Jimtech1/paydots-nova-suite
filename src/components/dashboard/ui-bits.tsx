import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`glass rounded-2xl p-5 relative overflow-hidden ${accent ? "neon-border" : ""}`}>
      {accent && <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-vivid opacity-20 blur-2xl" />}
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
      <p className="font-display text-2xl sm:text-3xl font-bold mt-3">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-2">{hint}</p>}
    </div>
  );
}

export function Panel({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-4 sm:p-5 min-w-0 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-2 mb-4">
          {title && <h3 className="font-display font-semibold text-base sm:text-lg min-w-0 truncate">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warn" | "danger" }) {
  const map: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/15 text-emerald-500",
    warn: "bg-amber-500/15 text-amber-500",
    danger: "bg-rose-500/15 text-rose-500",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${map[tone]}`}>{children}</span>;
}
