import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  BarChart3,
  Settings as SettingsIcon,
  LifeBuoy,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/paydots-logo.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRole, RoleProvider, type Role } from "./role-context";
import { Footer } from "@/components/site/Footer";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { to: "/dashboard/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/dashboard/cards", label: "Cards / Payouts", icon: CreditCard },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy },
] as const;

const roleLabel: Record<Role, string> = {
  customer: "Customer",
  merchant: "Merchant",
  agent: "Agent",
};

function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="glass flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold"
      >
        <span className="h-2 w-2 rounded-full bg-gradient-vivid" />
        {roleLabel[role]}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl p-1.5 z-50 shadow-card">
          {(Object.keys(roleLabel) as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-accent/10 transition flex items-center justify-between ${
                role === r ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              Login as {roleLabel[r]}
              {role === r && <span className="text-xs text-accent">●</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const loc = useLocation();
  return (
    <aside className="h-full flex flex-col gap-1 p-3">
      <Link to="/" className="flex items-center gap-2 px-2 py-3">
        <img src={logo} alt="Paydots" className="h-8 w-8" />
        <span className="font-display font-bold text-lg">Paydots</span>
      </Link>
      <nav className="mt-2 flex flex-col gap-1">
        {nav.map((item) => {
          const active = loc.pathname === item.to || (item.to !== "/dashboard" && loc.pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-gradient-vivid text-primary-foreground shadow-neon font-semibold"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-3 glass rounded-xl text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Demo mode</p>
        <p>Switch roles anytime from the top bar.</p>
      </div>
    </aside>
  );
}

function MobileBottomNav() {
  const loc = useLocation();
  const items = nav.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = loc.pathname === item.to || (item.to !== "/dashboard" && loc.pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-accent" : ""}`} />
              <span className="truncate max-w-full px-1">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const { role } = useRole();
  return (
    <div className="sticky top-0 z-30 glass-strong border-b border-border">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="lg:hidden glass h-9 w-9 grid place-items-center rounded-xl">
            <Menu className="h-4 w-4" />
          </button>
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <p className="text-sm font-semibold capitalize">{role} workspace</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleSwitcher />
          <button className="glass h-9 w-9 grid place-items-center rounded-xl hover:bg-accent/10">
            <Bell className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <div className="h-9 w-9 rounded-xl bg-gradient-vivid grid place-items-center text-primary-foreground font-bold text-sm">
            {role[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 border-r border-border glass-strong">
        <div className="w-full">
          <Sidebar />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-72 glass-strong border-r border-border">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 glass h-8 w-8 grid place-items-center rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </div>
  );
}

export function DashboardLayout() {
  return (
    <RoleProvider>
      <DashboardShell />
    </RoleProvider>
  );
}
