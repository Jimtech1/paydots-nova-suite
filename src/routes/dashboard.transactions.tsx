import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/components/dashboard/role-context";
import { getRoleData, fmt } from "@/components/dashboard/mock-data";
import { PageHeader, Panel, Pill } from "@/components/dashboard/ui-bits";
import { Download, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  const { role } = useRole();
  const data = getRoleData(role) as { transactions: Array<{ id: string; date: string; desc: string; amount: number; type: string; status: string }> };
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const types = Array.from(new Set(data.transactions.map((t) => t.type)));
  const filtered = data.transactions.filter(
    (t) => (filter === "all" || t.type === filter) && t.desc.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle={`Unified history for your ${role} account`}
        action={
          <button className="glass rounded-xl px-3 py-2 text-sm flex items-center gap-2 font-semibold hover:bg-accent/10">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        }
      />

      <Panel>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search descriptions"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none"
          >
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Description</th>
                <th className="px-2 py-3">Type</th>
                <th className="px-2 py-3 text-right">Amount</th>
                <th className="px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-2 py-3 text-muted-foreground whitespace-nowrap">{t.date}</td>
                  <td className="px-2 py-3 font-medium">{t.desc}</td>
                  <td className="px-2 py-3 capitalize text-muted-foreground">{t.type}</td>
                  <td className={`px-2 py-3 text-right font-mono font-semibold ${t.amount < 0 ? "text-rose-500" : "text-emerald-500"}`}>
                    {t.amount < 0 ? "-" : "+"}
                    {fmt(Math.abs(t.amount))}
                  </td>
                  <td className="px-2 py-3">
                    <Pill tone={t.status === "Completed" || t.status === "Settled" ? "success" : t.status === "Pending" ? "warn" : "default"}>
                      {t.status}
                    </Pill>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    No transactions match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
