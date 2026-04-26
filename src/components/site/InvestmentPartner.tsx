import { ShieldCheck, Building2, Landmark, ArrowRight } from "lucide-react";

export function InvestmentPartner() {
  return (
    <section id="invest" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-strong rounded-3xl p-8 md:p-14 neon-border relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 bg-gradient-glow blur-3xl" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <div>
              <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-accent mb-4">
                <ShieldCheck className="h-3.5 w-3.5" /> Licensed Partner · SEC Nigeria
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Institutional-grade investments, powered by a <span className="text-gradient">licensed portfolio manager</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Through our partnership with a fully licensed portfolio manager, Paydots users access T-Bills, real estate funds, and fixed-dollar products previously reserved for institutional investors.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["SEC-registered", "Regulated custodian", "Up to 18% APY (historical)"].map((t) => (
                  <span key={t} className="glass rounded-full px-3 py-1.5 text-xs">{t}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Landmark, title: "T-Bills", desc: "Government-backed treasury bills with predictable yield." },
                { icon: Building2, title: "Real Estate Funds", desc: "Fractional access to vetted real estate portfolios." },
                { icon: ShieldCheck, title: "Fixed-Dollar Products", desc: "USD-denominated returns, hedged against volatility." },
              ].map((p) => (
                <div key={p.title} className="glass rounded-2xl p-5 flex items-start gap-4 hover:-translate-y-0.5 transition">
                  <div className="h-11 w-11 rounded-xl bg-gradient-vivid grid place-items-center shadow-neon shrink-0">
                    <p.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Flow */}
          <div className="mt-10 glass rounded-2xl p-5 flex flex-wrap items-center justify-around gap-4 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground text-xs">Step 1</div>
              <div className="font-semibold">Paydots Wallet</div>
            </div>
            <ArrowRight className="text-accent" />
            <div className="text-center">
              <div className="text-muted-foreground text-xs">Step 2</div>
              <div className="font-semibold">Licensed Portfolio Manager</div>
            </div>
            <ArrowRight className="text-accent" />
            <div className="text-center">
              <div className="text-muted-foreground text-xs">Step 3</div>
              <div className="font-semibold">Investment Instruments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
