import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/dashboard/ui-bits";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [twofa, setTwofa] = useState(true);
  const [notif, setNotif] = useState(true);
  const [currency, setCurrency] = useState("USD");

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account preferences" />
      <div className="grid lg:grid-cols-2 gap-5">
        <Panel title="Profile">
          <div className="space-y-4">
            <Input label="Full name" defaultValue="John Doe" />
            <Input label="Email" defaultValue="john@paydots.app" type="email" />
            <Input label="Phone" defaultValue="+1 (555) 010-2244" />
            <button className="bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-2 text-sm shadow-neon">
              Save changes
            </button>
          </div>
        </Panel>

        <Panel title="Security">
          <Toggle label="Two-factor authentication" desc="Add an extra layer to your sign in." value={twofa} onChange={setTwofa} />
          <Toggle label="Notifications" desc="Email + push for activity." value={notif} onChange={setNotif} />
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Default currency</p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none w-full"
            >
              {["USD", "NGN", "EUR", "GBP"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input {...rest} className="mt-1 w-full glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none" />
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-11 rounded-full relative transition ${value ? "bg-gradient-vivid" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all ${value ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
