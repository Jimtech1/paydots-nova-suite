import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/ui-bits";
import { CurrencyFlag } from "@/components/dashboard/currency";
import { Send, ArrowRight, Repeat, Users, Plus, ArrowDown } from "lucide-react";
import { fmt } from "@/components/dashboard/mock-data";
import { Modal, FormField, fieldClass, primaryBtn, ghostBtn } from "@/components/dashboard/Modal";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/send")({
  component: SendPage,
});

const currencies = ["USD", "NGN", "EUR", "GBP", "GHS", "KES", "ZAR", "CAD"];
const rates: Record<string, number> = { USD: 1, NGN: 1580, EUR: 0.92, GBP: 0.79, GHS: 14.5, KES: 129, ZAR: 18.4, CAD: 1.36 };

type Beneficiary = { id: string; name: string; country: string; currency: string; account: string };

const initialBeneficiaries: Beneficiary[] = [
  { id: "b1", name: "Ada Lovelace", country: "NG", currency: "NGN", account: "•••• 4421" },
  { id: "b2", name: "Marcus Chen", country: "US", currency: "USD", account: "•••• 9931" },
  { id: "b3", name: "Sofia Costa", country: "PT", currency: "EUR", account: "IBAN •••• 7821" },
];

function SendPage() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [amount, setAmount] = useState("100");
  const [tab, setTab] = useState<"send" | "convert">("send");
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [activeBen, setActiveBen] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newBen, setNewBen] = useState({ name: "", account: "", currency: "USD" });

  const converted = (Number(amount) || 0) * (rates[to] / rates[from]);
  const fee = (Number(amount) || 0) * 0.001;

  const submit = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter an amount greater than 0");
      return;
    }
    if (tab === "send" && !activeBen) {
      toast.error("Select a beneficiary first");
      return;
    }
    setConfirm(true);
  };

  const finalize = () => {
    toast.success(
      tab === "send"
        ? `Sent ${fmt(Number(amount), from)} successfully`
        : `Converted ${fmt(Number(amount), from)} to ${to}`,
    );
    setConfirm(false);
  };

  const addBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBen.name.trim() || !newBen.account.trim()) {
      toast.error("Fill in name and account");
      return;
    }
    const b: Beneficiary = {
      id: `b${Date.now()}`,
      name: newBen.name,
      country: "—",
      currency: newBen.currency,
      account: `•••• ${newBen.account.slice(-4)}`,
    };
    setBeneficiaries((bs) => [b, ...bs]);
    setNewBen({ name: "", account: "", currency: "USD" });
    setAddOpen(false);
    toast.success(`${b.name} added to beneficiaries`);
  };

  return (
    <div>
      <PageHeader title="Send & Convert" subtitle="Move money across 40+ countries with near-zero fees (0.1%)." />

      <div className="glass rounded-2xl p-1 inline-flex mb-5 max-w-full overflow-x-auto">
        {([
          { k: "send", label: "Send money", icon: Send },
          { k: "convert", label: "Convert", icon: Repeat },
        ] as const).map(({ k, label, icon: Icon }) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${tab === k ? "bg-gradient-vivid text-primary-foreground shadow-neon" : "text-muted-foreground"}`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">You send</label>
              <div className="mt-1.5 glass rounded-xl px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <CurrencyFlag code={from} />
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="bg-transparent outline-none font-semibold text-sm appearance-none pr-4 cursor-pointer"
                      style={{ backgroundImage: "none" }}
                    >
                      {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent outline-none text-right text-2xl font-display font-bold"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-full bg-gradient-vivid grid place-items-center text-primary-foreground shadow-neon">
                <ArrowDown className="h-4 w-4" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Recipient gets</label>
              <div className="mt-1.5 glass rounded-xl px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <CurrencyFlag code={to} />
                    <select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="bg-transparent outline-none font-semibold text-sm appearance-none pr-4 cursor-pointer"
                      style={{ backgroundImage: "none" }}
                    >
                      {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 min-w-0 text-right text-2xl font-display font-bold truncate">
                    {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs pt-2">
              <div className="glass rounded-xl p-2.5 sm:p-3 min-w-0">
                <p className="text-muted-foreground text-[10px] sm:text-xs">Rate</p>
                <p className="font-mono font-bold mt-1 text-[11px] sm:text-xs truncate">
                  1 {from} = {(rates[to] / rates[from]).toFixed(2)} {to}
                </p>
              </div>
              <div className="glass rounded-xl p-2.5 sm:p-3 min-w-0">
                <p className="text-muted-foreground text-[10px] sm:text-xs">Fee (0.1%)</p>
                <p className="font-mono font-bold mt-1 text-[11px] sm:text-xs truncate">{fmt(fee, from)}</p>
              </div>
              <div className="glass rounded-xl p-2.5 sm:p-3 min-w-0">
                <p className="text-muted-foreground text-[10px] sm:text-xs">Arrives in</p>
                <p className="font-bold text-accent mt-1 text-[11px] sm:text-xs">~5 sec</p>
              </div>
            </div>

            <button
              onClick={submit}
              className="w-full bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-3.5 text-sm shadow-neon mt-3 flex items-center justify-center gap-2"
            >
              {tab === "send" ? "Send now" : "Convert now"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Panel>

        <Panel
          title={tab === "send" ? "Beneficiaries" : "Recent conversions"}
          action={<Users className="h-4 w-4 text-muted-foreground" />}
        >
          {tab === "send" ? (
            <>
              <ul className="space-y-2">
                {beneficiaries.map((b) => (
                  <li
                    key={b.id}
                    onClick={() => setActiveBen(b.id)}
                    className={`glass rounded-xl p-3 flex items-center gap-3 hover:bg-accent/10 transition cursor-pointer ${activeBen === b.id ? "neon-border" : ""}`}
                  >
                    <CurrencyFlag code={b.currency} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{b.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{b.account}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{b.currency}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setAddOpen(true)}
                className="w-full mt-3 glass rounded-xl px-3 py-2 text-sm font-semibold hover:bg-accent/10 flex items-center gap-2 justify-center"
              >
                <Plus className="h-4 w-4" /> Add beneficiary
              </button>
            </>
          ) : (
            <ul className="space-y-2 text-sm">
              {[
                { f: "USD", t: "NGN", a: 200 },
                { f: "EUR", t: "USD", a: 150 },
                { f: "GBP", t: "USD", a: 80 },
              ].map((c, i) => (
                <li key={i} className="glass rounded-xl p-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CurrencyFlag code={c.f} /> → <CurrencyFlag code={c.t} />
                  </span>
                  <span className="font-mono font-semibold text-xs">{fmt(c.a, c.f)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Confirm transfer" subtitle="Review the details below.">
        <div className="space-y-3 text-sm">
          <Row label="You send" value={`${fmt(Number(amount), from)}`} />
          <Row label="Recipient gets" value={`${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`} />
          <Row label="Fee" value={fmt(fee, from)} />
          <Row label="Total debit" value={fmt(Number(amount) + fee, from)} bold />
          {tab === "send" && activeBen && (
            <Row label="To" value={beneficiaries.find((b) => b.id === activeBen)?.name ?? ""} />
          )}
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={() => setConfirm(false)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
          <button onClick={finalize} className={`flex-1 ${primaryBtn}`}>Confirm</button>
        </div>
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add beneficiary">
        <form onSubmit={addBeneficiary} className="space-y-4">
          <FormField label="Full name">
            <input className={fieldClass} value={newBen.name} onChange={(e) => setNewBen({ ...newBen, name: e.target.value })} placeholder="Jane Doe" />
          </FormField>
          <FormField label="Account / IBAN">
            <input className={fieldClass} value={newBen.account} onChange={(e) => setNewBen({ ...newBen, account: e.target.value })} placeholder="0123456789" />
          </FormField>
          <FormField label="Currency">
            <select className={fieldClass} value={newBen.currency} onChange={(e) => setNewBen({ ...newBen, currency: e.target.value })}>
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAddOpen(false)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Save beneficiary</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono ${bold ? "font-bold text-base" : "font-semibold"}`}>{value}</span>
    </div>
  );
}
