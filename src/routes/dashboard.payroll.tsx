import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Panel, StatCard, Pill } from "@/components/dashboard/ui-bits";
import { CurrencyFlag, flagFor } from "@/components/dashboard/currency";
import { Modal, FormField, fieldClass, primaryBtn, ghostBtn } from "@/components/dashboard/Modal";
import { fmt } from "@/components/dashboard/mock-data";
import {
  Briefcase,
  Plus,
  Play,
  Calendar,
  Download,
  Trash2,
  Search,
  Globe,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/payroll")({
  component: PayrollPage,
  head: () => ({
    meta: [
      { title: "Paydots — Global Payroll" },
      {
        name: "description",
        content:
          "Run global payroll for your team in 30+ currencies via your Lightspark Global Account. UMA, bank, or local-rail delivery in seconds.",
      },
    ],
  }),
});

type Employee = {
  id: string;
  name: string;
  role: string;
  country: string;
  currency: string;
  amount: number;
  uma: string;
  status: "Active" | "Paused";
};

type PayrollRun = {
  id: string;
  date: string;
  cycle: string;
  total: number;
  count: number;
  status: "Completed" | "Scheduled" | "Processing";
};

const initialEmployees: Employee[] = [
  { id: "e1", name: "Ada Okafor", role: "Lead Engineer", country: "NG", currency: "NGN", amount: 4500, uma: "$ada@paydots.app", status: "Active" },
  { id: "e2", name: "Marcus Reed", role: "Product Designer", country: "US", currency: "USD", amount: 5200, uma: "$marcus@paydots.app", status: "Active" },
  { id: "e3", name: "Sofia Costa", role: "Growth Manager", country: "PT", currency: "EUR", amount: 3800, uma: "$sofia@paydots.app", status: "Active" },
  { id: "e4", name: "Liam Walsh", role: "Customer Success", country: "GB", currency: "GBP", amount: 3200, uma: "$liam@paydots.app", status: "Active" },
  { id: "e5", name: "Aisha Mwangi", role: "Operations", country: "KE", currency: "KES", amount: 2400, uma: "$aisha@paydots.app", status: "Paused" },
  { id: "e6", name: "Tunde Bakare", role: "Backend Engineer", country: "NG", currency: "NGN", amount: 4200, uma: "$tunde@paydots.app", status: "Active" },
];

const initialRuns: PayrollRun[] = [
  { id: "r1", date: "2026-04-01", cycle: "March 2026", total: 22340, count: 6, status: "Completed" },
  { id: "r2", date: "2026-03-01", cycle: "February 2026", total: 21100, count: 5, status: "Completed" },
  { id: "r3", date: "2026-05-01", cycle: "April 2026", total: 23320, count: 6, status: "Scheduled" },
];

const COUNTRY_NAME: Record<string, string> = {
  NG: "Nigeria", US: "United States", PT: "Portugal", GB: "United Kingdom", KE: "Kenya", GH: "Ghana", ZA: "South Africa", CA: "Canada",
};

function PayrollPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [runs, setRuns] = useState<PayrollRun[]>(initialRuns);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(initialEmployees.filter(e => e.status === "Active").map(e => e.id)));
  const [addOpen, setAddOpen] = useState(false);
  const [runOpen, setRunOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [newEmp, setNewEmp] = useState({ name: "", role: "", country: "US", currency: "USD", amount: "", uma: "" });

  const filtered = useMemo(
    () =>
      employees.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.role.toLowerCase().includes(query.toLowerCase()) ||
          e.country.toLowerCase().includes(query.toLowerCase()),
      ),
    [employees, query],
  );

  // All amounts converted to USD for the run total (mock fixed rates)
  const toUsd: Record<string, number> = { USD: 1, NGN: 1 / 1580, EUR: 1 / 0.92, GBP: 1 / 0.79, GHS: 1 / 14.5, KES: 1 / 129, ZAR: 1 / 18.4, CAD: 1 / 1.36 };
  const selectedEmployees = employees.filter((e) => selected.has(e.id));
  const runTotalUsd = selectedEmployees.reduce((sum, e) => sum + e.amount * (toUsd[e.currency] ?? 1), 0);
  const fxFee = runTotalUsd * 0.001;
  const monthlyBase = employees.filter((e) => e.status === "Active").reduce((s, e) => s + e.amount * (toUsd[e.currency] ?? 1), 0);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const togglePause = (id: string) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, status: e.status === "Active" ? "Paused" : "Active" } : e)));
    toast.success("Employee status updated");
  };

  const removeEmp = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    toast.success("Removed from payroll");
  };

  const addEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.amount) {
      toast.error("Name and amount are required");
      return;
    }
    const id = "e" + Math.random().toString(36).slice(2, 7);
    const uma = newEmp.uma || `$${newEmp.name.toLowerCase().replace(/\s+/g, ".")}@paydots.app`;
    const emp: Employee = {
      id,
      name: newEmp.name,
      role: newEmp.role || "Contractor",
      country: newEmp.country,
      currency: newEmp.currency,
      amount: Number(newEmp.amount),
      uma,
      status: "Active",
    };
    setEmployees((prev) => [emp, ...prev]);
    setSelected((prev) => new Set(prev).add(id));
    setAddOpen(false);
    setNewEmp({ name: "", role: "", country: "US", currency: "USD", amount: "", uma: "" });
    toast.success(`${emp.name} added to payroll`);
  };

  const runPayroll = () => {
    if (selected.size === 0) {
      toast.error("Select at least one employee");
      return;
    }
    setRunOpen(true);
  };

  const finalizeRun = () => {
    const newRun: PayrollRun = {
      id: "r" + Math.random().toString(36).slice(2, 7),
      date: new Date().toISOString().slice(0, 10),
      cycle: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      total: Math.round(runTotalUsd),
      count: selected.size,
      status: "Processing",
    };
    setRuns((prev) => [newRun, ...prev]);
    setRunOpen(false);
    toast.success(`Payroll initiated — ${selected.size} payouts via Lightspark Grid`);
    setTimeout(() => {
      setRuns((prev) => prev.map((r) => (r.id === newRun.id ? { ...r, status: "Completed" } : r)));
      toast.success("All payouts settled");
    }, 2200);
  };

  const schedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleDate) {
      toast.error("Pick a date");
      return;
    }
    const newRun: PayrollRun = {
      id: "r" + Math.random().toString(36).slice(2, 7),
      date: scheduleDate,
      cycle: new Date(scheduleDate).toLocaleString("en-US", { month: "long", year: "numeric" }),
      total: Math.round(runTotalUsd),
      count: selected.size,
      status: "Scheduled",
    };
    setRuns((prev) => [newRun, ...prev]);
    setScheduleOpen(false);
    setScheduleDate("");
    toast.success("Payroll scheduled");
  };

  const exportCsv = () => {
    const header = ["Name", "Role", "Country", "Currency", "Amount", "UMA", "Status"];
    const rows = employees.map((e) => [e.name, e.role, e.country, e.currency, String(e.amount), e.uma, e.status]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paydots-payroll-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported payroll CSV");
  };

  return (
    <div>
      <PageHeader
        title="Global Payroll"
        subtitle="Pay your team worldwide in seconds via your Lightspark Global Account"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={exportCsv} className={ghostBtn}>
              <Download className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Export
            </button>
            <button onClick={() => setScheduleOpen(true)} className={ghostBtn}>
              <Calendar className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Schedule
            </button>
            <button onClick={() => setAddOpen(true)} className={ghostBtn}>
              <Plus className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Add employee
            </button>
            <button onClick={runPayroll} className={primaryBtn}>
              <Play className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />Run payroll
            </button>
          </div>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Selected total" value={fmt(runTotalUsd)} hint={`${selected.size} payees · 0.1% FX fee ${fmt(fxFee)}`} icon={<Briefcase className="h-4 w-4" />} accent />
        <StatCard label="Monthly run (est.)" value={fmt(monthlyBase)} hint="Across active employees" icon={<Calendar className="h-4 w-4" />} />
        <StatCard label="Active employees" value={String(employees.filter((e) => e.status === "Active").length)} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Countries" value={String(new Set(employees.map((e) => e.country)).size)} icon={<Globe className="h-4 w-4" />} />
      </div>

      <Panel
        title="Employees & contractors"
        className="mt-6"
        action={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="glass rounded-xl pl-9 pr-3 py-2 text-sm bg-transparent outline-none w-44 sm:w-56"
            />
          </div>
        }
      >
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[680px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-2 py-3 w-8"></th>
                <th className="px-2 py-3">Employee</th>
                <th className="px-2 py-3">Country</th>
                <th className="px-2 py-3">UMA</th>
                <th className="px-2 py-3 text-right">Amount</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0">
                  <td className="px-2 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(e.id)}
                      onChange={() => toggle(e.id)}
                      disabled={e.status === "Paused"}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <div className="font-semibold">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{e.role}</div>
                  </td>
                  <td className="px-2 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-base leading-none">{flagFor(e.currency)}</span>
                      <span className="text-xs text-muted-foreground">{COUNTRY_NAME[e.country] ?? e.country}</span>
                    </span>
                  </td>
                  <td className="px-2 py-3 font-mono text-xs text-muted-foreground">{e.uma}</td>
                  <td className="px-2 py-3 text-right font-mono font-semibold whitespace-nowrap">{fmt(e.amount, e.currency)}</td>
                  <td className="px-2 py-3"><Pill tone={e.status === "Active" ? "success" : "warn"}>{e.status}</Pill></td>
                  <td className="px-2 py-3 text-right whitespace-nowrap">
                    <button onClick={() => togglePause(e.id)} className="text-xs text-accent hover:underline mr-3">
                      {e.status === "Active" ? "Pause" : "Resume"}
                    </button>
                    <button onClick={() => removeEmp(e.id)} className="text-xs text-rose-500 hover:underline inline-flex items-center gap-1">
                      <Trash2 className="h-3 w-3" />Remove
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-2 py-8 text-center text-muted-foreground text-sm">
                    No employees match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Payroll runs" className="mt-6">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Cycle</th>
                <th className="px-2 py-3 text-right">Payees</th>
                <th className="px-2 py-3 text-right">Total</th>
                <th className="px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-2 py-3 whitespace-nowrap text-muted-foreground">{r.date}</td>
                  <td className="px-2 py-3 font-medium">{r.cycle}</td>
                  <td className="px-2 py-3 text-right font-mono">{r.count}</td>
                  <td className="px-2 py-3 text-right font-mono font-semibold whitespace-nowrap">{fmt(r.total)}</td>
                  <td className="px-2 py-3">
                    <Pill tone={r.status === "Completed" ? "success" : r.status === "Processing" ? "default" : "warn"}>{r.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Run payroll confirm */}
      <Modal open={runOpen} onClose={() => setRunOpen(false)} title="Confirm payroll run" subtitle="Funds settle via your Lightspark Global Account">
        <div className="space-y-3 text-sm">
          <div className="glass rounded-xl p-4 space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Payees</span><span className="font-semibold">{selected.size}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Gross total</span><span className="font-mono font-semibold">{fmt(runTotalUsd)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">FX & routing (0.1%)</span><span className="font-mono">{fmt(fxFee)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2"><span>Debit from USD account</span><span className="font-mono font-bold">{fmt(runTotalUsd + fxFee)}</span></div>
          </div>
          <div className="max-h-40 overflow-auto glass rounded-xl p-3 text-xs space-y-1.5">
            {selectedEmployees.map((e) => (
              <div key={e.id} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><CurrencyFlag code={e.currency} size="sm" /> {e.name}</span>
                <span className="font-mono">{fmt(e.amount, e.currency)}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={() => setRunOpen(false)} className={`${ghostBtn} flex-1`}>Cancel</button>
            <button onClick={finalizeRun} className={`${primaryBtn} flex-1`}>Run now</button>
          </div>
        </div>
      </Modal>

      {/* Schedule */}
      <Modal open={scheduleOpen} onClose={() => setScheduleOpen(false)} title="Schedule payroll" subtitle="Auto-execute on the chosen date">
        <form onSubmit={schedule} className="space-y-3">
          <FormField label="Run date">
            <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className={fieldClass} />
          </FormField>
          <FormField label="Selected payees" hint="Adjust selection from the table">
            <input value={`${selected.size} employees · ${fmt(runTotalUsd)}`} readOnly className={fieldClass} />
          </FormField>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => setScheduleOpen(false)} className={`${ghostBtn} flex-1`}>Cancel</button>
            <button type="submit" className={`${primaryBtn} flex-1`}>Schedule</button>
          </div>
        </form>
      </Modal>

      {/* Add employee */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add to payroll" subtitle="Pay anyone with a UMA, bank, or local-rail destination">
        <form onSubmit={addEmployee} className="space-y-3">
          <FormField label="Full name">
            <input value={newEmp.name} onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })} className={fieldClass} placeholder="Jane Doe" />
          </FormField>
          <FormField label="Role">
            <input value={newEmp.role} onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })} className={fieldClass} placeholder="Engineer" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Country">
              <select value={newEmp.country} onChange={(e) => setNewEmp({ ...newEmp, country: e.target.value })} className={fieldClass}>
                {Object.entries(COUNTRY_NAME).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
              </select>
            </FormField>
            <FormField label="Currency">
              <select value={newEmp.currency} onChange={(e) => setNewEmp({ ...newEmp, currency: e.target.value })} className={fieldClass}>
                {["USD", "NGN", "EUR", "GBP", "GHS", "KES", "ZAR", "CAD"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Amount per cycle">
            <input type="number" value={newEmp.amount} onChange={(e) => setNewEmp({ ...newEmp, amount: e.target.value })} className={fieldClass} placeholder="3000" />
          </FormField>
          <FormField label="UMA address (optional)" hint="Auto-generated if left blank">
            <input value={newEmp.uma} onChange={(e) => setNewEmp({ ...newEmp, uma: e.target.value })} className={fieldClass} placeholder="$jane@paydots.app" />
          </FormField>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => setAddOpen(false)} className={`${ghostBtn} flex-1`}>Cancel</button>
            <button type="submit" className={`${primaryBtn} flex-1`}>Add employee</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
