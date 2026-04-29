import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { customerData, fmt } from "@/components/dashboard/mock-data";
import { PageHeader, Panel, Pill, StatCard } from "@/components/dashboard/ui-bits";
import { TrendingUp, ShieldCheck, Building2, Landmark, Coins, Sparkles, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/dashboard/investments")({
  component: InvestmentsPage,
  head: () => ({
    meta: [
      { title: "Paydots — Investments" },
      { name: "description", content: "Earn yield on T-Bills, Real Estate, Fixed Dollar and stablecoin products." },
    ],
  }),
});

type Product = {
  id: string;
  name: string;
  desc: string;
  apy: number;
  min: number;
  term: string;
  risk: "Low" | "Medium" | "High";
  currency: "USD" | "NGN";
  tag: string;
  icon: React.ReactNode;
};

const products: Product[] = [
  {
    id: "tbill",
    name: "US Treasury Bills",
    desc: "Sovereign-backed short-term debt issued by the US government. Capital-protected, daily-priced.",
    apy: 5.2,
    min: 100,
    term: "30 / 90 / 180 days",
    risk: "Low",
    currency: "USD",
    tag: "Most popular",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "ng-tbill",
    name: "Nigeria T-Bills",
    desc: "Federal Government of Nigeria treasury bills, accessed via licensed portfolio manager.",
    apy: 18.5,
    min: 50000,
    term: "91 / 182 / 364 days",
    risk: "Low",
    currency: "NGN",
    tag: "High yield",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    id: "realestate",
    name: "Tokenized Real Estate",
    desc: "Fractional ownership of yield-producing properties, settled instantly via Lightspark Global Account.",
    apy: 14.0,
    min: 250,
    term: "12 — 36 months",
    risk: "Medium",
    currency: "USD",
    tag: "New",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "fixed",
    name: "Fixed Dollar",
    desc: "Lock USDC for fixed terms, earn predictable dollar yield.",
    apy: 9.5,
    min: 100,
    term: "30 / 60 / 90 days",
    risk: "Low",
    currency: "USD",
    tag: "Stable",
    icon: <Coins className="h-5 w-5" />,
  },
  {
    id: "money-market",
    name: "Money Market Fund",
    desc: "Diversified short-term debt instruments. Withdraw anytime, earn daily.",
    apy: 11.2,
    min: 10,
    term: "Flexible",
    risk: "Low",
    currency: "USD",
    tag: "Flexible",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: "growth",
    name: "Growth Portfolio",
    desc: "Curated basket of equity ETFs and tokenized funds. Higher risk, higher upside.",
    apy: 22.0,
    min: 500,
    term: "12+ months",
    risk: "High",
    currency: "USD",
    tag: "Aggressive",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const portfolioTrend = [8000, 8120, 8050, 8200, 8350, 8290, 8400, 8520, 8480, 8600, 8720, 8800, 8950, 9100, 9050, 9200, 9320, 9400, 9550, 9700].map((v, i) => ({ d: i, v }));

const COLORS = ["var(--primary)", "var(--accent)", "var(--purple)"];

function RiskPill({ risk }: { risk: Product["risk"] }) {
  const tone = risk === "Low" ? "success" : risk === "Medium" ? "warn" : "danger";
  return <Pill tone={tone}>{risk} risk</Pill>;
}

function InvestmentsPage() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [amount, setAmount] = useState("500");
  const [done, setDone] = useState(false);
  const pie = customerData.investments.map((i) => ({ name: i.name, value: i.value }));

  return (
    <div>
      <PageHeader
        title="Investments"
        subtitle="Grow your money with institutional-grade products via our licensed portfolio manager."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Portfolio value" value={fmt(customerData.investmentValue)} hint="+3.2% this month" accent icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Earned yield (YTD)" value={fmt(642.18)} hint="Across all products" />
        <StatCard label="Avg APY" value="13.9%" hint="Weighted by allocation" />
        <StatCard label="Next payout" value={fmt(86.5)} hint="May 2, 2026" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <Panel title="Portfolio growth (20d)" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={portfolioTrend}>
                <defs>
                  <linearGradient id="port" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }}
                  formatter={(v: number) => fmt(v)}
                  labelFormatter={() => ""}
                />
                <Area type="monotone" dataKey="v" stroke="var(--accent)" strokeWidth={2.5} fill="url(#port)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Allocation">
          <div className="h-44">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} dataKey="value" innerRadius={40} outerRadius={68} paddingAngle={3}>
                  {pie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v: number) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 text-xs mt-2">
            {customerData.investments.map((i, idx) => (
              <li key={i.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[idx] }} />
                  {i.name}
                </span>
                <span className="font-mono font-semibold">{fmt(i.value)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display font-bold text-xl">Available products</h2>
        <span className="text-xs text-muted-foreground">Powered by SEC-licensed portfolio manager</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-5 hover:bg-accent/5 transition group relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-vivid opacity-10 blur-2xl group-hover:opacity-25 transition" />
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-gradient-vivid grid place-items-center text-primary-foreground shadow-neon">
                {p.icon}
              </div>
              <Pill tone="default">{p.tag}</Pill>
            </div>
            <h3 className="font-display font-bold text-lg mt-4">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{p.desc}</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div>
                <p className="text-muted-foreground uppercase tracking-wider">APY</p>
                <p className="font-display font-bold text-2xl text-accent mt-0.5">{p.apy}%</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-wider">Min</p>
                <p className="font-mono font-semibold text-foreground mt-1">{fmt(p.min, p.currency)}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-wider">Term</p>
                <p className="font-medium text-foreground mt-1">{p.term}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-wider">Risk</p>
                <div className="mt-1"><RiskPill risk={p.risk} /></div>
              </div>
            </div>
            <button
              onClick={() => { setSelected(p); setDone(false); setAmount(String(p.min)); }}
              className="mt-5 w-full bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-2.5 text-sm shadow-neon hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Invest now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative glass-strong rounded-3xl p-7 max-w-md w-full neon-border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-vivid grid place-items-center text-primary-foreground">{selected.icon}</div>
              <div>
                <h3 className="font-display font-bold text-lg">{selected.name}</h3>
                <p className="text-xs text-muted-foreground">{selected.apy}% APY · {selected.term}</p>
              </div>
            </div>

            {done ? (
              <div className="mt-6 text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 grid place-items-center mx-auto">
                  <ShieldCheck className="h-7 w-7 text-emerald-500" />
                </div>
                <p className="font-display font-bold text-lg mt-4">Investment confirmed</p>
                <p className="text-sm text-muted-foreground mt-1">{fmt(Number(amount), selected.currency)} into {selected.name}.</p>
                <button onClick={() => setSelected(null)} className="mt-5 glass rounded-xl px-4 py-2 text-sm font-semibold w-full">Done</button>
              </div>
            ) : (
              <>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mt-5">Amount ({selected.currency})</label>
                <input
                  type="number"
                  value={amount}
                  min={selected.min}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1.5 w-full glass rounded-xl px-4 py-3 text-lg font-display font-bold outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <div className="glass rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">Estimated yearly yield</p>
                    <p className="font-mono font-bold text-emerald-500 mt-1">+{fmt((Number(amount) || 0) * (selected.apy / 100), selected.currency)}</p>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">Risk</p>
                    <div className="mt-1"><RiskPill risk={selected.risk} /></div>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={() => setSelected(null)} className="flex-1 glass rounded-xl px-4 py-2.5 text-sm font-semibold">Cancel</button>
                  <button onClick={() => setDone(true)} className="flex-1 bg-gradient-vivid text-primary-foreground rounded-xl px-4 py-2.5 text-sm font-semibold shadow-neon">Confirm</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
