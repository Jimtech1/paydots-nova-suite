import { Link } from "@tanstack/react-router";
import { customerData, fmt } from "../mock-data";
import { PageHeader, Panel, StatCard, Pill } from "../ui-bits";
import { CurrencyFlag } from "../currency";
import { Wallet, CreditCard, TrendingUp, Users, Send, Repeat, ArrowDownToLine, Sparkles, Briefcase } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const COLORS = ["var(--primary)", "var(--accent)", "var(--purple)"];

export function CustomerOverview() {
  const trend = customerData.trend.map((v, i) => ({ d: i, v }));
  const pie = customerData.investments.map((i) => ({ name: i.name, value: i.value }));

  return (
    <div>
      <PageHeader title="Overview" subtitle="Your money at a glance" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total balance" value={fmt(customerData.balances.usd)} hint={`≈ ${fmt(customerData.balances.ngn, "NGN")}`} icon={<CurrencyFlag code="USD" />} accent />
        <StatCard label="Card spend (mo)" value={fmt(customerData.cardSpend)} icon={<CreditCard className="h-4 w-4" />} />
        <StatCard label="Investments" value={fmt(customerData.investmentValue)} hint="+3.2% this month" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Referral earnings" value={fmt(customerData.referrals)} icon={<Users className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
        {[
          { to: "/dashboard/send", label: "Send", icon: Send },
          { to: "/dashboard/send", label: "Convert", icon: Repeat },
          { to: "/dashboard/wallet", label: "Deposit", icon: ArrowDownToLine },
          { to: "/dashboard/payroll", label: "Payroll", icon: Briefcase },
          { to: "/dashboard/investments", label: "Invest", icon: Sparkles },
        ].map((a) => (
          <Link key={a.label} to={a.to} className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-semibold hover:bg-accent/10 transition">
            <span className="h-8 w-8 rounded-lg bg-gradient-vivid grid place-items-center text-primary-foreground"><a.icon className="h-4 w-4" /></span>
            {a.label}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <Panel title="Multi-currency wallet" className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-3">
            {(["USD", "NGN", "EUR", "GBP"] as const).map((c) => (
              <div key={c} className="glass rounded-xl p-4 flex items-center gap-3">
                <CurrencyFlag code={c} size="lg" />
                <div>
                  <p className="text-xs text-muted-foreground">{c}</p>
                  <p className="font-display font-bold text-lg">{fmt(customerData.balances[c.toLowerCase() as keyof typeof customerData.balances], c)}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Your UMA money address" className="lg:col-span-1">
          <p className="text-xs text-muted-foreground">Receive money from any UMA-compatible wallet, bank, or country.</p>
          <div className="glass rounded-xl p-4 mt-3 flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-semibold truncate">$you@paydots.app</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText("$you@paydots.app");
              }}
              className="text-xs text-accent font-semibold shrink-0 hover:underline"
            >
              Copy
            </button>
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-neon" />
            Powered by Lightspark Global Account
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Panel title="Balance trend (30d)" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="bal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }}
                  formatter={(v: number) => fmt(v)}
                  labelFormatter={() => ""}
                />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} fill="url(#bal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Investment allocation">
          <div className="h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {pie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v: number) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 text-sm">
            {customerData.investments.map((i, idx) => (
              <li key={i.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[idx] }} />
                  {i.name}
                </span>
                <span className="font-mono font-semibold">{fmt(i.value)} <span className="text-muted-foreground text-xs">· {i.apy}% APY</span></span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Recent transactions" className="mt-6">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Description</th>
                <th className="px-2 py-3 text-right">Amount</th>
                <th className="px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {customerData.transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-2 py-3 text-muted-foreground whitespace-nowrap">{t.date}</td>
                  <td className="px-2 py-3 font-medium">{t.desc}</td>
                  <td className={`px-2 py-3 text-right font-mono font-semibold ${t.amount < 0 ? "text-rose-500" : "text-emerald-500"}`}>
                    {t.amount < 0 ? "-" : "+"}
                    {fmt(Math.abs(t.amount))}
                  </td>
                  <td className="px-2 py-3"><Pill tone={t.status === "Completed" ? "success" : "warn"}>{t.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
