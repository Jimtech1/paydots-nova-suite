import { merchantData, fmt } from "../mock-data";
import { PageHeader, Panel, StatCard, Pill } from "../ui-bits";
import { Activity, Wallet, Hash, ShoppingBag, QrCode, Link2 } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export function MerchantOverview() {
  const trend = merchantData.trend.map((v, i) => ({ d: i, v }));
  const [showLink, setShowLink] = useState(false);
  const [generated, setGenerated] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div>
      <PageHeader title="Merchant overview" subtitle="Sell faster. Settle smarter." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Volume (mo)" value={fmt(merchantData.volumeMonth)} accent icon={<Activity className="h-4 w-4" />} />
        <StatCard label="Settlement USD" value={fmt(merchantData.settlementUSD)} icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Successful txns" value={merchantData.successCount.toLocaleString()} icon={<Hash className="h-4 w-4" />} />
        <StatCard label="Avg ticket" value={fmt(merchantData.avgTicket)} icon={<ShoppingBag className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <Panel title="Volume (30d)" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v: number) => fmt(v)} labelFormatter={() => ""} />
                <Area type="monotone" dataKey="v" stroke="var(--accent)" strokeWidth={2.5} fill="url(#vol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Payment tools">
          <div className="space-y-3">
            <button onClick={() => setShowLink(true)} className="w-full bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-3 text-sm shadow-neon flex items-center gap-2 justify-center">
              <Link2 className="h-4 w-4" /> Create payment link
            </button>
            <div className="glass rounded-xl p-4 text-center">
              <div className="mx-auto h-32 w-32 grid place-items-center rounded-xl bg-foreground text-background">
                <QrCode className="h-20 w-20" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Scan to pay</p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Recent payment links" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-2 py-3">Created</th>
                <th className="px-2 py-3">Label</th>
                <th className="px-2 py-3 text-right">Amount</th>
                <th className="px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {merchantData.links.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0">
                  <td className="px-2 py-3 text-muted-foreground">{l.created}</td>
                  <td className="px-2 py-3 font-medium">{l.label}</td>
                  <td className="px-2 py-3 text-right font-mono font-semibold">{fmt(l.amount)}</td>
                  <td className="px-2 py-3"><Pill tone={l.status === "Paid" ? "success" : "warn"}>{l.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {showLink && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-sm p-4" onClick={() => setShowLink(false)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-display font-bold text-xl mb-4">New payment link</h3>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (USD)" className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none mb-3" />
            <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none mb-4" />
            <button
              onClick={() => setGenerated(`https://pay.paydots.app/${Math.random().toString(36).slice(2, 10)}`)}
              className="w-full bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-2 text-sm shadow-neon"
            >
              Generate link
            </button>
            {generated && (
              <div className="mt-4 glass rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Link</p>
                <p className="font-mono text-sm break-all text-accent">{generated}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
