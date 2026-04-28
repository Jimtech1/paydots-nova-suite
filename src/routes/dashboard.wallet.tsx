import { createFileRoute, Link } from "@tanstack/react-router";
import { useRole } from "@/components/dashboard/role-context";
import { customerData, merchantData, agentData, fmt } from "@/components/dashboard/mock-data";
import { PageHeader, Panel, StatCard } from "@/components/dashboard/ui-bits";
import { CurrencyFlag } from "@/components/dashboard/currency";
import { ArrowDownToLine, ArrowUpFromLine, Send, Plus, Copy } from "lucide-react";
import { useState } from "react";
import { Modal, FormField, fieldClass, primaryBtn, ghostBtn } from "@/components/dashboard/Modal";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/wallet")({
  component: WalletPage,
});

function WalletPage() {
  const { role } = useRole();

  if (role === "merchant") return <MerchantWallet />;
  if (role === "agent") return <AgentWallet />;
  return <CustomerWallet />;
}

function MerchantWallet() {
  return (
    <div>
      <PageHeader title="Settlement Wallet" subtitle="Your merchant balances and payout accounts" />
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <StatCard label="USD Settlement" value={fmt(merchantData.settlementUSD)} accent />
        <StatCard label="NGN Settlement" value={fmt(merchantData.settlementNGN, "NGN")} />
      </div>
      <Panel title="Settlement account">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <Field label="Bank" value="Airwallex Global Account" />
          <Field label="Account number" value="•••• 7821" />
          <Field label="Routing" value="026073150" />
          <Field label="Next payout" value="Apr 30, 2026" />
        </div>
      </Panel>
    </div>
  );
}

function AgentWallet() {
  const [open, setOpen] = useState(false);
  const [amt, setAmt] = useState("1000");
  return (
    <div>
      <PageHeader title="Float Wallet" subtitle="Your agent float and commission balances" />
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <StatCard label="Float balance" value={fmt(8400)} accent />
        <StatCard label="Commission balance" value={fmt(agentData.commissionMonth)} />
      </div>
      <Panel title="Top up float">
        <p className="text-sm text-muted-foreground">Increase your float to serve more cash-in customers.</p>
        <button onClick={() => setOpen(true)} className={`mt-4 ${primaryBtn}`}>Request float top-up</button>
      </Panel>

      <Modal open={open} onClose={() => setOpen(false)} title="Request float top-up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(`Top-up of ${fmt(Number(amt))} requested`);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <FormField label="Amount (USD)">
            <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} className={fieldClass} />
          </FormField>
          <FormField label="Notes (optional)">
            <textarea rows={3} className={fieldClass} placeholder="Any details for ops…" />
          </FormField>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpen(false)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Submit request</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

type ActionKind = "deposit" | "withdraw" | "addCurrency" | null;

function CustomerWallet() {
  const b = customerData.balances;
  const [action, setAction] = useState<ActionKind>(null);
  const [form, setForm] = useState({ amount: "", currency: "USD", method: "Bank transfer", destination: "" });
  const [extra, setExtra] = useState<string[]>([]);

  const open = (k: Exclude<ActionKind, null>) => {
    setForm({ amount: "", currency: "USD", method: k === "withdraw" ? "Bank transfer" : "Wire", destination: "" });
    setAction(k);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter an amount");
      return;
    }
    if (action === "deposit") toast.success(`${fmt(Number(form.amount), form.currency)} deposit initiated`);
    else if (action === "withdraw") toast.success(`${fmt(Number(form.amount), form.currency)} withdrawal queued`);
    setAction(null);
  };

  const addCurrency = (e: React.FormEvent) => {
    e.preventDefault();
    setExtra((c) => Array.from(new Set([...c, form.currency])));
    toast.success(`${form.currency} wallet enabled`);
    setAction(null);
  };

  const copy = (txt: string, label: string) => {
    navigator.clipboard?.writeText(txt);
    toast.success(`${label} copied`);
  };

  return (
    <div>
      <PageHeader title="Wallet & Balances" subtitle="Hold and move money in multiple currencies" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {([
          { code: "USD", val: b.usd, hint: "Airwallex virtual account", accent: true },
          { code: "NGN", val: b.ngn, hint: "Local wallet" },
          { code: "EUR", val: b.eur },
          { code: "GBP", val: b.gbp },
        ] as const).map((c) => (
          <StatCard
            key={c.code}
            label={c.code}
            value={fmt(c.val, c.code)}
            hint={"hint" in c ? c.hint : undefined}
            accent={"accent" in c ? c.accent : undefined}
            icon={<CurrencyFlag code={c.code} size="md" />}
          />
        ))}
        {extra.map((c) => (
          <StatCard key={c} label={c} value={fmt(0, c)} hint="New wallet" icon={<CurrencyFlag code={c} size="md" />} />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <ActionBtn icon={<ArrowDownToLine className="h-4 w-4" />} label="Deposit" onClick={() => open("deposit")} />
        <ActionBtn icon={<ArrowUpFromLine className="h-4 w-4" />} label="Withdraw" onClick={() => open("withdraw")} />
        <Link to="/dashboard/send" className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-semibold hover:bg-accent/10 transition">
          <span className="text-accent"><Send className="h-4 w-4" /></span>
          Send
        </Link>
        <ActionBtn icon={<Plus className="h-4 w-4" />} label="Add currency" onClick={() => open("addCurrency")} />
      </div>
      <Panel title="Account details (USD)" action={
        <button onClick={() => copy("026073150", "Routing")} className={`${ghostBtn} !py-1.5 !px-3 text-xs flex items-center gap-1.5`}>
          <Copy className="h-3.5 w-3.5" /> Copy details
        </button>
      }>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <Field label="Beneficiary" value="Paydots — John Doe" />
          <Field label="Routing (ACH)" value="026073150" />
          <Field label="Account number" value="•••• 4421" />
          <Field label="Bank" value="Community Federal Savings Bank" />
        </div>
      </Panel>

      <Modal open={action === "deposit"} onClose={() => setAction(null)} title="Deposit funds" subtitle="Add money to your Paydots wallet.">
        <form onSubmit={submit} className="space-y-4">
          <FormField label="Currency">
            <select className={fieldClass} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              {["USD", "NGN", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Amount">
            <input type="number" inputMode="decimal" className={fieldClass} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" />
          </FormField>
          <FormField label="Method">
            <select className={fieldClass} value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
              {["Wire", "ACH", "Card", "Crypto (USDC)"].map((m) => <option key={m}>{m}</option>)}
            </select>
          </FormField>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAction(null)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Confirm deposit</button>
          </div>
        </form>
      </Modal>

      <Modal open={action === "withdraw"} onClose={() => setAction(null)} title="Withdraw funds" subtitle="Send to your linked bank account.">
        <form onSubmit={submit} className="space-y-4">
          <FormField label="Currency">
            <select className={fieldClass} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              {["USD", "NGN", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Amount">
            <input type="number" inputMode="decimal" className={fieldClass} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" />
          </FormField>
          <FormField label="Destination account">
            <input className={fieldClass} value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="•••• 4421" />
          </FormField>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAction(null)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Withdraw</button>
          </div>
        </form>
      </Modal>

      <Modal open={action === "addCurrency"} onClose={() => setAction(null)} title="Add a new currency wallet">
        <form onSubmit={addCurrency} className="space-y-4">
          <FormField label="Currency">
            <select className={fieldClass} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              {["GHS", "KES", "ZAR", "CAD", "AUD", "JPY", "CHF", "AED"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <p className="text-xs text-muted-foreground">A virtual local account will be provisioned for you.</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAction(null)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Enable wallet</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-semibold hover:bg-accent/10 transition">
      <span className="text-accent">{icon}</span>
      {label}
    </button>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="font-mono font-semibold mt-1 break-all">{value}</p>
    </div>
  );
}
