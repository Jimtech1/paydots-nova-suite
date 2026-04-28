import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/components/dashboard/role-context";
import { customerData, agentData, fmt } from "@/components/dashboard/mock-data";
import { PageHeader, Panel, Pill, StatCard } from "@/components/dashboard/ui-bits";
import { CreditCard, Snowflake, Plus } from "lucide-react";
import { useState } from "react";
import { Modal, FormField, fieldClass, primaryBtn, ghostBtn } from "@/components/dashboard/Modal";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/cards")({
  component: CardsPage,
});

function CardsPage() {
  const { role } = useRole();

  if (role === "agent") {
    return (
      <div>
        <PageHeader title="Payouts" subtitle="Your commissions and float payouts" />
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Pending payout" value={fmt(640)} accent />
          <StatCard label="Paid this month" value={fmt(agentData.commissionMonth)} />
          <StatCard label="Lifetime" value={fmt(28400)} />
        </div>
        <Panel title="Commission ledger">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="px-2 py-3">Date</th>
                  <th className="px-2 py-3">Source</th>
                  <th className="px-2 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {agentData.commissions.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="px-2 py-3 text-muted-foreground">{c.date}</td>
                    <td className="px-2 py-3 font-medium">{c.source}</td>
                    <td className="px-2 py-3 text-right font-mono font-semibold text-emerald-500">+{fmt(c.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  if (role === "merchant") {
    return (
      <div>
        <PageHeader title="Payouts & Settlements" subtitle="Track upcoming and past settlements" />
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Next payout" value={fmt(12400)} accent hint="Apr 30, 2026" />
          <StatCard label="Last payout" value={fmt(8200)} hint="Apr 23, 2026" />
          <StatCard label="Lifetime" value={fmt(184320)} />
        </div>
        <Panel title="Recent settlements">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="px-2 py-3">Date</th>
                  <th className="px-2 py-3">Reference</th>
                  <th className="px-2 py-3 text-right">Amount</th>
                  <th className="px-2 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { d: "2026-04-23", r: "PO-9921", a: 8200, s: "Paid" },
                  { d: "2026-04-16", r: "PO-9842", a: 7400, s: "Paid" },
                  { d: "2026-04-09", r: "PO-9760", a: 6100, s: "Paid" },
                ].map((p) => (
                  <tr key={p.r} className="border-b border-border last:border-0">
                    <td className="px-2 py-3 text-muted-foreground">{p.d}</td>
                    <td className="px-2 py-3 font-mono">{p.r}</td>
                    <td className="px-2 py-3 text-right font-mono font-semibold text-emerald-500">+{fmt(p.a)}</td>
                    <td className="px-2 py-3"><Pill tone="success">{p.s}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  return <CustomerCards />;
}

function CustomerCards() {
  const [cards, setCards] = useState(customerData.cards);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ brand: "Visa", label: "Personal", currency: "USD" });
  const toggle = (i: number) => {
    setCards((c) => c.map((card, idx) => (idx === i ? { ...card, frozen: !card.frozen } : card)));
    toast.success(cards[i].frozen ? "Card unfrozen" : "Card frozen");
  };

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = String(Math.floor(1000 + Math.random() * 9000));
    setCards((c) => [...c, { last4, expiry: "06/29", frozen: false, brand: form.brand }]);
    toast.success(`New ${form.brand} card •••• ${last4} issued`);
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Virtual Cards"
        subtitle="Spend anywhere with your Paydots virtual cards"
        action={
          <button onClick={() => setOpen(true)} className={`${primaryBtn} flex items-center gap-2`}>
            <Plus className="h-4 w-4" /> Request new card
          </button>
        }
      />
      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map((card, i) => (
          <div key={`${card.last4}-${i}`} className="relative rounded-2xl p-6 overflow-hidden shadow-glow text-white" style={{ background: "var(--gradient-vivid)" }}>
            <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">{card.brand} virtual</p>
                <p className="font-display font-bold text-lg mt-1">Paydots</p>
              </div>
              <CreditCard className="h-7 w-7" />
            </div>
            <p className="font-mono text-xl mt-8 tracking-widest">•••• •••• •••• {card.last4}</p>
            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="text-[10px] uppercase opacity-70">Expiry</p>
                <p className="font-mono font-semibold">{card.expiry}</p>
              </div>
              <button
                onClick={() => toggle(i)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
              >
                <Snowflake className="h-3.5 w-3.5" />
                {card.frozen ? "Unfreeze" : "Freeze"}
              </button>
            </div>
            {card.frozen && (
              <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] grid place-items-center">
                <span className="glass-strong px-4 py-2 rounded-xl text-foreground text-sm font-semibold">Frozen</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Request a new virtual card">
        <form onSubmit={create} className="space-y-4">
          <FormField label="Card brand">
            <select className={fieldClass} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}>
              {["Visa", "Mastercard"].map((b) => <option key={b}>{b}</option>)}
            </select>
          </FormField>
          <FormField label="Label">
            <input className={fieldClass} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Personal, Subscriptions…" />
          </FormField>
          <FormField label="Currency">
            <select className={fieldClass} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              {["USD", "NGN", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpen(false)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Issue card</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
