import { Coins, CreditCard, Globe, TrendingUp, Store, Users } from "lucide-react";
import dashboard from "@/assets/dashboard-preview.jpg";

const features = [
  { icon: Coins, title: "Multi-Currency Custodian Wallet", desc: "Hold NGN, USDC, EUR, GBP, and stablecoins. Instant swaps via Stellar DEX. Paydots securely manages your funds." },
  { icon: CreditCard, title: "Virtual & Physical Cards", desc: "Issue virtual cards instantly or order a physical card. Spend your balance anywhere Visa is accepted." },
  { icon: Globe, title: "Cross-Border Payments", desc: "Send and receive money across different countries with near-zero fees (0.1%). Powered by Stellar's fast settlement." },
  { icon: TrendingUp, title: "Yield & Investment Plans", desc: "Invest in T-Bills, real estate, and fixed-dollar products through a licensed portfolio manager. Up to 18% APY." },
  { icon: Store, title: "Merchant Tools", desc: "Payment links, QR codes, invoices, and APIs. Settle in stablecoins or local currency." },
  { icon: Users, title: "Agent & Referral System", desc: "Earn commissions on deposits, withdrawals, and transactions. Build your own agent network." },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Core Pillars</div>
          <h2 className="text-3xl md:text-5xl font-bold">Everything you need, <span className="text-gradient">in one wallet</span></h2>
          <p className="mt-4 text-muted-foreground">A complete financial OS, custodian-grade and built on Stellar.</p>
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

        {/* Dashboard preview */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-3">Dashboard preview</div>
            <h3 className="text-3xl md:text-4xl font-bold">Your money, beautifully organized.</h3>
            <p className="mt-4 text-muted-foreground">See balances across currencies, manage cards, track investments, and accept payments — all from a single, fast, native-feel app.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Real-time multi-currency balances", "Issue & freeze cards instantly", "Yield portfolio at a glance", "Merchant tools built-in"].map((t) => (
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
