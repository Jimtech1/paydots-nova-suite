import { UserPlus, Wallet, Rocket } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Sign up for Paydots", desc: "Create your account with email and complete a quick KYC verification." },
  { icon: Wallet, title: "Fund your wallet", desc: "Deposit via bank transfer, card, or stablecoins — multi-currency from day one." },
  { icon: Rocket, title: "Use, invest & spend", desc: "Pay bills, invest in T-Bills, issue cards, or accept payments as a merchant." },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">How it works</div>
          <h2 className="text-3xl md:text-5xl font-bold">From zero to global in <span className="text-gradient">three steps</span></h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-6">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.title} className="glass rounded-2xl p-6 text-center relative">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-vivid grid place-items-center shadow-glow mb-4 relative">
                <s.icon className="h-10 w-10 text-primary-foreground" />
                <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full glass-strong grid place-items-center text-xs font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
