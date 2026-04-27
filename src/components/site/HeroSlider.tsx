import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import heroPerson from "@/assets/hero-person.jpg";
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
              Powered by the Stellar Network
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] tracking-tighter">
              Your financial<br />
              super-app, <span className="text-gradient">Paydots</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Earn yield, spend anywhere, move instantly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Link to="/dashboard" className="bg-gradient-vivid text-primary-foreground font-semibold px-7 py-3.5 rounded-xl shadow-glow hover:scale-[1.02] transition">
                Create account
              </Link>
              <a href="#features" className="glass px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-accent/10 transition">
                Explore features
              </a>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute -inset-8 bg-gradient-glow blur-3xl" />
            <div className="relative glass-strong rounded-3xl p-3 shadow-card neon-border overflow-hidden">
              <img
                src={heroPerson}
                alt="Paydots customer using the financial super-app"
                width={1024}
                height={1280}
                className="rounded-2xl w-full h-[480px] md:h-[560px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-vivid grid place-items-center shadow-neon text-primary-foreground font-bold">P</div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Total balance</div>
                  <div className="font-bold text-lg">$12,480.55</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-accent font-semibold">+18.4% APY</div>
                  <div className="text-[10px] text-muted-foreground">Yield earning</div>
                </div>
              </div>
            </div>
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
                  className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-gradient-vivid" : "w-4 bg-muted-foreground/30"}`}
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
