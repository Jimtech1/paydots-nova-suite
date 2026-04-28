import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/dashboard/ui-bits";
import { useState } from "react";
import { Modal, FormField, fieldClass, primaryBtn, ghostBtn } from "@/components/dashboard/Modal";
import { toast } from "sonner";
import { KeyRound, LogOut, Trash2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [twofa, setTwofa] = useState(true);
  const [notif, setNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [profile, setProfile] = useState({ name: "John Doe", email: "john@paydots.app", phone: "+1 (555) 010-2244" });
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [delOpen, setDelOpen] = useState(false);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.email.includes("@")) {
      toast.error("Please enter a valid name and email");
      return;
    }
    toast.success("Profile updated");
  };

  const changePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next.length < 8) return toast.error("Password must be at least 8 characters");
    if (pw.next !== pw.confirm) return toast.error("Passwords do not match");
    toast.success("Password changed");
    setPw({ current: "", next: "", confirm: "" });
    setPwOpen(false);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account preferences" />
      <div className="grid lg:grid-cols-2 gap-5">
        <Panel title="Profile">
          <form onSubmit={saveProfile} className="space-y-4">
            <FormField label="Full name">
              <input className={fieldClass} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </FormField>
            <FormField label="Email">
              <input type="email" className={fieldClass} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </FormField>
            <FormField label="Phone">
              <input className={fieldClass} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </FormField>
            <button type="submit" className={primaryBtn}>Save changes</button>
          </form>
        </Panel>

        <Panel title="Security">
          <Toggle label="Two-factor authentication" desc="Add an extra layer to your sign in." value={twofa} onChange={(v) => { setTwofa(v); toast.success(`2FA ${v ? "enabled" : "disabled"}`); }} />
          <Toggle label="Activity notifications" desc="Email + push for activity." value={notif} onChange={(v) => { setNotif(v); toast.success(`Notifications ${v ? "on" : "off"}`); }} />
          <Toggle label="Product updates" desc="Occasional product news." value={marketing} onChange={setMarketing} />
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Default currency</p>
            <select
              value={currency}
              onChange={(e) => { setCurrency(e.target.value); toast.success(`Default currency set to ${e.target.value}`); }}
              className={fieldClass}
            >
              {["USD", "NGN", "EUR", "GBP", "GHS", "KES", "ZAR", "CAD"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => setPwOpen(true)} className={`${ghostBtn} flex items-center gap-2`}>
              <KeyRound className="h-4 w-4" /> Change password
            </button>
            <button onClick={() => toast.success("Signed out from all devices")} className={`${ghostBtn} flex items-center gap-2`}>
              <LogOut className="h-4 w-4" /> Sign out everywhere
            </button>
          </div>
        </Panel>

        <Panel title="Danger zone" className="lg:col-span-2 border border-rose-500/30">
          <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This cannot be undone.</p>
          <button onClick={() => setDelOpen(true)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 px-4 py-2.5 text-sm font-semibold">
            <Trash2 className="h-4 w-4" /> Delete account
          </button>
        </Panel>
      </div>

      <Modal open={pwOpen} onClose={() => setPwOpen(false)} title="Change password">
        <form onSubmit={changePw} className="space-y-4">
          <FormField label="Current password">
            <input type="password" className={fieldClass} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          </FormField>
          <FormField label="New password" hint="Min. 8 characters">
            <input type="password" className={fieldClass} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          </FormField>
          <FormField label="Confirm new password">
            <input type="password" className={fieldClass} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          </FormField>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPwOpen(false)} className={`flex-1 ${ghostBtn}`}>Cancel</button>
            <button type="submit" className={`flex-1 ${primaryBtn}`}>Update password</button>
          </div>
        </form>
      </Modal>

      <Modal open={delOpen} onClose={() => setDelOpen(false)} title="Delete account?" subtitle="This action is irreversible.">
        <p className="text-sm text-muted-foreground">All your wallets, cards and investment positions will be liquidated and the account closed.</p>
        <div className="flex gap-2 mt-5">
          <button onClick={() => setDelOpen(false)} className={`flex-1 ${ghostBtn}`}>Keep my account</button>
          <button
            onClick={() => { toast.success("Account deletion scheduled"); setDelOpen(false); }}
            className="flex-1 rounded-xl bg-rose-500 text-white font-semibold px-4 py-2.5 text-sm hover:opacity-90"
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-4">
      <div className="min-w-0">
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-11 rounded-full relative transition shrink-0 ${value ? "bg-gradient-vivid" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all ${value ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
