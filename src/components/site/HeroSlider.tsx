import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import slideWallet from "@/assets/slide-wallet.jpg";
import slideCard from "@/assets/slide-card.jpg";
import slideInvest from "@/assets/slide-invest.jpg";

const slides = [
  {
    title: "Multi-Currency Custodian Wallet",
    sub: "Hold NGN, USDC, EUR, and stablecoins. Instant swaps via the Stellar DEX.",
    img: slideWallet,
  },
  {
    title: "Virtual Cards & Payments",
    sub: "Issue virtual cards instantly. Pay online or in-store with Google & Apple Pay.",
    img: slideCard,
  },
  {
    title: "Institutional-Grade Investments",
    sub: "T-Bills, real estate, and fixed-dollar products via a licensed portfolio manager.",
    img: slideInvest,
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/60 to-background" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
            Powered by the Stellar Network
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05]">
            The Stellar Financial<br />
            Ecosystem — <span className="text-gradient">Paydots</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Spend, invest, accept payments, and earn yield — all in one secure custodian wallet.
            Powered by Stellar and a licensed portfolio manager.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#waitlist" className="bg-gradient-vivid text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-glow hover:scale-[1.02] transition">
              Create account
            </a>
            <a href="#features" className="glass px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition">
              Explore features
            </a>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-16 relative">
          <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-card neon-border overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center min-h-[360px]">
              <div key={active} className="animate-fade-up">
                <div className="text-xs uppercase tracking-widest text-accent mb-3">
                  0{active + 1} / 0{slides.length}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">{slides[active].title}</h2>
                <p className="mt-4 text-muted-foreground text-lg">{slides[active].sub}</p>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-glow blur-2xl" />
                <img
                  src={slides[active].img}
                  alt={slides[active].title}
                  width={1024}
                  height={1024}
                  className="relative rounded-2xl w-full h-[320px] md:h-[380px] object-cover animate-float"
                />
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-gradient-vivid" : "w-4 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          {["Stellar Network", "Custodian Wallet", "Licensed Portfolio Manager", "Virtual Cards"].map((b) => (
            <span key={b} className="glass rounded-full px-4 py-2">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
