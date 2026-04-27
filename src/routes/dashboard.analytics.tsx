import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/components/dashboard/role-context";
import { getRoleData, customerData, fmt } from "@/components/dashboard/mock-data";
import { PageHeader, Panel } from "@/components/dashboard/ui-bits";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { role } = useRole();
  const data = getRoleData(role) as { trend: number[] };
  const trend = data.trend.map((v, i) => ({ day: `D${i + 1}`, value: v }));
  const bars =
    role === "customer"
      ? customerData.spendByCategory
      : (getRoleData(role) as { payoutByDay: Array<{ name: string; value: number }> }).payoutByDay;

  return (
    <div>
      <PageHeader title="Analytics" subtitle="30-day trends and category breakdown" />
      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title="Balance / volume trend (30d)" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }}
                  formatter={(v: number) => fmt(v)}
                />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title={role === "customer" ? "Spend by category" : "Volume by day"}>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={bars}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }}
                  formatter={(v: number) => fmt(v)}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}
