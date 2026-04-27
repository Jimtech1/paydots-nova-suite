import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/components/dashboard/role-context";
import { customerData, merchantData, agentData, fmt } from "@/components/dashboard/mock-data";
import { PageHeader, Panel, StatCard } from "@/components/dashboard/ui-bits";
import { ArrowDownToLine, ArrowUpFromLine, Send, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/wallet")({
  component: WalletPage,
});

function WalletPage() {
  const { role } = useRole();

  if (role === "merchant") {
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

  if (role === "agent") {
    return (
      <div>
        <PageHeader title="Float Wallet" subtitle="Your agent float and commission balances" />
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <StatCard label="Float balance" value={fmt(8400)} accent />
          <StatCard label="Commission balance" value={fmt(agentData.commissionMonth)} />
        </div>
        <Panel title="Top up float">
          <p className="text-sm text-muted-foreground">Increase your float to serve more cash-in customers.</p>
          <button className="mt-4 bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-2 text-sm shadow-neon">
            Request float top-up
          </button>
        </Panel>
      </div>
    );
  }

  const b = customerData.balances;
  return (
    <div>
      <PageHeader title="Wallet & Balances" subtitle="Hold and move money in multiple currencies" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="USD" value={fmt(b.usd)} accent hint="Airwallex virtual account" />
        <StatCard label="NGN" value={fmt(b.ngn, "NGN")} hint="Local wallet" />
        <StatCard label="EUR" value={fmt(b.eur, "EUR")} />
        <StatCard label="GBP" value={fmt(b.gbp, "GBP")} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Action icon={<ArrowDownToLine className="h-4 w-4" />} label="Deposit" />
        <Action icon={<ArrowUpFromLine className="h-4 w-4" />} label="Withdraw" />
        <Action icon={<Send className="h-4 w-4" />} label="Send" />
        <Action icon={<Plus className="h-4 w-4" />} label="Add currency" />
      </div>
      <Panel title="Account details (USD)">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <Field label="Beneficiary" value="Paydots — John Doe" />
          <Field label="Routing (ACH)" value="026073150" />
          <Field label="Account number" value="•••• 4421" />
          <Field label="Bank" value="Community Federal Savings Bank" />
        </div>
      </Panel>
    </div>
  );
}

function Action({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-semibold hover:bg-accent/10 transition">
      <span className="text-accent">{icon}</span>
      {label}
    </button>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="font-mono font-semibold mt-1">{value}</p>
    </div>
  );
}
