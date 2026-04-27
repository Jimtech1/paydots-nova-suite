import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/ui-bits";
import { CurrencyFlag } from "@/components/dashboard/currency";
import { Send, ArrowRight, Repeat, Users } from "lucide-react";
import { fmt } from "@/components/dashboard/mock-data";

export const Route = createFileRoute("/dashboard/send")({
  component: SendPage,
});

const currencies = ["USD", "NGN", "EUR", "GBP", "GHS", "KES", "ZAR", "CAD"];
const rates: Record<string, number> = { USD: 1, NGN: 1580, EUR: 0.92, GBP: 0.79, GHS: 14.5, KES: 129, ZAR: 18.4, CAD: 1.36 };

const beneficiaries = [
  { id: "b1", name: "Ada Lovelace", country: "NG", currency: "NGN", account: "•••• 4421" },
  { id: "b2", name: "Marcus Chen", country: "US", currency: "USD", account: "•••• 9931" },
  { id: "b3", name: "Sofia Costa", country: "PT", currency: "EUR", account: "IBAN •••• 7821" },
];

function SendPage() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [amount, setAmount] = useState("100");
  const [tab, setTab] = useState<"send" | "convert">("send");

  const converted = (Number(amount) || 0) * (rates[to] / rates[from]);
  const fee = (Number(amount) || 0) * 0.001;

  return (
    <div>
      <PageHeader title="Send & Convert" subtitle="Move money across 40+ countries with near-zero fees (0.1%)." />

      <div className="glass rounded-2xl p-1 inline-flex mb-5">
        {([
          { k: "send", label: "Send money", icon: Send },
          { k: "convert", label: "Convert", icon: Repeat },
        ] as const).map(({ k, label, icon: Icon }) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition ${tab === k ? "bg-gradient-vivid text-primary-foreground shadow-neon" : "text-muted-foreground"}`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">You send</label>
              <div className="mt-1.5 glass rounded-xl flex items-center gap-3 px-4 py-3">
                <CurrencyFlag code={from} />
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="bg-transparent outline-none font-semibold text-sm">
                  {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-right text-2xl font-display font-bold"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-full bg-gradient-vivid grid place-items-center text-primary-foreground shadow-neon">
                <ArrowRight className="h-4 w-4 rotate-90" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Recipient gets</label>
              <div className="mt-1.5 glass rounded-xl flex items-center gap-3 px-4 py-3">
                <CurrencyFlag code={to} />
                <select value={to} onChange={(e) => setTo(e.target.value)} className="bg-transparent outline-none font-semibold text-sm">
                  {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex-1 text-right text-2xl font-display font-bold">{converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs pt-2">
              <div className="glass rounded-xl p-3">
                <p className="text-muted-foreground">Rate</p>
                <p className="font-mono font-bold mt-1">1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}</p>
              </div>
              <div className="glass rounded-xl p-3">
                <p className="text-muted-foreground">Fee (0.1%)</p>
                <p className="font-mono font-bold mt-1">{fmt(fee, from)}</p>
              </div>
              <div className="glass rounded-xl p-3">
                <p className="text-muted-foreground">Arrives in</p>
                <p className="font-bold text-accent mt-1">~5 seconds</p>
              </div>
            </div>

            <button className="w-full bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-3.5 text-sm shadow-neon mt-3 flex items-center justify-center gap-2">
              {tab === "send" ? "Send now" : "Convert now"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Panel>

        <Panel title="Beneficiaries" action={<Users className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-2">
            {beneficiaries.map((b) => (
              <li key={b.id} className="glass rounded-xl p-3 flex items-center gap-3 hover:bg-accent/10 transition cursor-pointer">
                <CurrencyFlag code={b.currency} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{b.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{b.account}</p>
                </div>
                <span className="text-xs text-muted-foreground">{b.currency}</span>
              </li>
            ))}
          </ul>
          <button className="w-full mt-3 glass rounded-xl px-3 py-2 text-sm font-semibold hover:bg-accent/10">+ Add beneficiary</button>
        </Panel>
      </div>
    </div>
  );
}
