import { agentData, fmt } from "../mock-data";
import { PageHeader, Panel, StatCard, Pill } from "../ui-bits";
import { Coins, Users, ArrowDownToLine, ArrowUpFromLine, Plus } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { Modal, FormField, fieldClass, primaryBtn, ghostBtn } from "@/components/dashboard/Modal";
import { toast } from "sonner";

export function AgentOverview() {
  const trend = agentData.trend.map((v, i) => ({ d: i, v }));
  const [requests, setRequests] = useState(agentData.requests);
  const [toastMsg, setToast] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customer: "", type: "Cash-in", amount: "" });

  const act = (id: string, action: "Approved" | "Rejected") => {
    setRequests((r) => r.map((req) => (req.id === id ? { ...req, status: action } : req)));
    setToast(`Request ${action.toLowerCase()}`);
    setTimeout(() => setToast(null), 2000);
  };

  const newRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer.trim() || !form.amount || Number(form.amount) <= 0) {
      toast.error("Fill in customer and amount");
      return;
    }
    setRequests((r) => [
      { id: `r${Date.now()}`, customer: form.customer, type: form.type, amount: Number(form.amount), status: "Pending" },
      ...r,
    ]);
    toast.success("Cash request created");
    setForm({ customer: "", type: "Cash-in", amount: "" });
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Agent dashboard"
        subtitle="Manage cash requests and earn commissions"
        action={
          <button onClick={() => setOpen(true)} className={`${primaryBtn} flex items-center gap-2`}>
            <Plus className="h-4 w-4" /> New cash request
          </button>
        }
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Commission (mo)" value={fmt(agentData.commissionMonth)} accent icon={<Coins className="h-4 w-4" />} />
        <StatCard label="Customers served" value={agentData.customersServed.toString()} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Cash-in volume" value={fmt(agentData.cashInVolume)} icon={<ArrowDownToLine className="h-4 w-4" />} />
        <StatCard label="Cash-out volume" value={fmt(agentData.cashOutVolume)} icon={<ArrowUpFromLine className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <Panel title="Commission trend (30d)" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="com" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--purple)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--purple)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v: number) => fmt(v)} labelFormatter={() => ""} />
                <Area type="monotone" dataKey="v" stroke="var(--purple)" strokeWidth={2.5} fill="url(#com)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Recent commissions">
          <ul className="divide-y divide-border text-sm">
            {agentData.commissions.map((c) => (
              <li key={c.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-medium">{c.source}</p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
                <span className="font-mono font-semibold text-emerald-500">+{fmt(c.amount)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Pending cash requests" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-2 py-3">Customer</th>
                <th className="px-2 py-3">Type</th>
                <th className="px-2 py-3 text-right">Amount</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-2 py-3 font-medium">{r.customer}</td>
                  <td className="px-2 py-3 text-muted-foreground">{r.type}</td>
                  <td className="px-2 py-3 text-right font-mono font-semibold">{fmt(r.amount)}</td>
                  <td className="px-2 py-3">
                    <Pill tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "warn"}>{r.status}</Pill>
                  </td>
                  <td className="px-2 py-3 text-right whitespace-nowrap">
                    {r.status === "Pending" ? (
                      <div className="inline-flex gap-2">
                        <button onClick={() => act(r.id, "Approved")} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25">Approve</button>
                        <button onClick={() => act(r.id, "Rejected")} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-500 hover:bg-rose-500/25">Reject</button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {toast && (
        <div className="fixed bottom-20 lg:bottom-8 right-4 glass-strong rounded-xl px-4 py-3 text-sm font-semibold shadow-card z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
