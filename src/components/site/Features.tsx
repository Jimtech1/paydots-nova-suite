import { Coins, CreditCard, Globe, TrendingUp, Store, Users, Landmark, Send, AtSign, Briefcase, Zap } from "lucide-react";
import dashboard from "@/assets/dashboard-preview.jpg";
import lightsparkNetwork from "@/assets/lightspark-network.jpg";
import globalPayroll from "@/assets/global-payroll.jpg";
import umaAddress from "@/assets/uma-address.jpg";

const features = [
  { icon: Zap, title: "Lightspark Global Account", desc: "Move money worldwide in under a second through Lightspark Grid switches. One account, every currency, instant settlement — fiat or crypto." },
  { icon: AtSign, title: "UMA Money Address", desc: "Your portable Universal Money Address (e.g. $you@paydots.app). Receive payments from any UMA-compatible wallet, bank, or country — no IBANs required." },
  { icon: Briefcase, title: "Global Payroll", desc: "Pay contractors and employees in 30+ currencies in seconds. Bulk runs, scheduled payouts, and per-employee UMA delivery — fully automated." },
  { icon: Coins, title: "Multi-Currency Custodian Wallet", desc: "Hold NGN, USDC, EUR, GBP, and stablecoins. Instant cross-currency swaps via your Lightspark Global Account. Paydots securely manages your funds." },
  { icon: CreditCard, title: "Virtual & Physical Cards", desc: "Issue virtual cards instantly or order a physical card. Spend your balance anywhere Visa is accepted." },
  { icon: Globe, title: "Cross-Border Payments", desc: "Send and receive money across countries with near-zero fees (0.1%). Powered by Lightspark Grid for instant, transparent FX." },
  { icon: TrendingUp, title: "Yield & Investment Plans", desc: "Invest in T-Bills, real estate, and fixed-dollar products through a licensed portfolio manager. Up to 18% APY." },
  { icon: Store, title: "Merchant Tools", desc: "Payment links, QR codes, invoices, and APIs. Settle in stablecoins or local currency." },
  { icon: Users, title: "Agent & Referral System", desc: "Earn commissions on deposits, withdrawals, and transactions. Build your own agent network." },
  { icon: Landmark, title: "USD Receivable Account", desc: "Get a real US bank account number. Receive payments from clients, marketplaces, and freelancing platforms directly. Hold, convert, or spend USD instantly." },
  { icon: Send, title: "Instant Peer-to-Peer Transfers", desc: "Send money instantly to any other Paydots user using their UMA, email, phone, or username. No fees, no delays." },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Core Pillars</div>
          <h2 className="text-3xl md:text-5xl font-bold">Everything you need, <span className="text-gradient">in one wallet</span></h2>
          <p className="mt-4 text-muted-foreground">A complete financial OS, custodian-grade and powered by your Lightspark Global Account.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 group hover:-translate-y-1 transition-transform relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-12 w-12 rounded-xl bg-gradient-vivid grid place-items-center shadow-neon mb-4">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Lightspark Global Account showcase */}
        <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-10 bg-gradient-glow blur-3xl" />
            <img src={lightsparkNetwork} alt="Lightspark Global Account network" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-glow animate-float" />
          </div>
          <div className="order-1 md:order-2">
            <div className="text-xs uppercase tracking-widest text-accent mb-3">Lightspark Global Account</div>
            <h3 className="text-3xl md:text-4xl font-bold">One account. <span className="text-gradient">Every currency.</span> Sub-second settlement.</h3>
            <p className="mt-4 text-muted-foreground">Powered by Lightspark Grid — the global rail used by modern financial institutions to move fiat and crypto across borders. Quotes, FX, and settlement happen in a single API call.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Real-time FX with transparent quotes", "Pay-ins & payouts to 30+ countries", "Card top-ups and ramps in/out", "On-chain settlement when you need it"].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-accent shadow-neon" />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* UMA Money Address showcase */}
        <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-3">UMA Money Address</div>
            <h3 className="text-3xl md:text-4xl font-bold">Your money handle, <span className="text-gradient">anywhere on Earth.</span></h3>
            <p className="mt-4 text-muted-foreground">A Universal Money Address looks like an email — <span className="font-mono text-foreground">$you@paydots.app</span> — and works with any UMA-compatible wallet, bank, or country. No IBANs, no SWIFT, no friction.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Human-readable, portable identity", "Cross-wallet, cross-currency receive", "Built-in compliance & travel rule", "Works with Lightning, fiat, and stablecoins"].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-accent shadow-neon" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-glow blur-3xl" />
            <img src={umaAddress} alt="UMA Universal Money Address" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-glow animate-float" />
          </div>
        </div>

        {/* Global Payroll showcase */}
        <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-10 bg-gradient-glow blur-3xl" />
            <img src={globalPayroll} alt="Paydots global payroll dashboard" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-glow animate-float" />
          </div>
          <div className="order-1 md:order-2">
            <div className="text-xs uppercase tracking-widest text-accent mb-3">Global Payroll</div>
            <h3 className="text-3xl md:text-4xl font-bold">Pay your global team in <span className="text-gradient">seconds, not weeks.</span></h3>
            <p className="mt-4 text-muted-foreground">Run payroll for contractors and employees across 30+ countries from one dashboard. Fund once in your base currency — Paydots handles FX, routing, and per-employee delivery via UMA, bank, or local rail.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Bulk runs & scheduled cycles", "Pay in USD, EUR, NGN, GBP and more", "Per-employee UMA or bank delivery", "Receipts, payslips & CSV exports"].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-accent shadow-neon" />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-3">Dashboard preview</div>
            <h3 className="text-3xl md:text-4xl font-bold">Your money, beautifully organized.</h3>
            <p className="mt-4 text-muted-foreground">See balances across currencies, manage cards, run payroll, track investments, and accept payments — all from a single, fast, native-feel app.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Real-time multi-currency balances", "Issue & freeze cards instantly", "Global payroll with one click", "Yield portfolio at a glance", "Merchant tools built-in"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-neon" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-glow blur-3xl" />
            <img src={dashboard} alt="Paydots dashboard" loading="lazy" width={1024} height={1024} className="relative rounded-3xl shadow-glow animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
