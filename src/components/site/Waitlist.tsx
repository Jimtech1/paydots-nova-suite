import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("T-Bills");
  const [done, setDone] = useState(false);

  return (
    <section id="waitlist" className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="glass-strong rounded-3xl p-10 md:p-14 text-center neon-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tighter">
              The future of finance is<br />
              <span className="text-gradient">one click away.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">Join the waitlist and be first to spend, send, and invest with Paydots.</p>

            {done ? (
              <div className="mt-8 glass rounded-2xl p-6 inline-block">
                <div className="text-lg font-semibold">You're on the list 🎉</div>
                <div className="text-sm text-muted-foreground mt-1">We'll be in touch with early-access details.</div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setDone(true); }}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
                >
                  <option>T-Bills</option>
                  <option>Real Estate</option>
                  <option>Fixed Dollar</option>
                </select>
                <button className="bg-gradient-vivid text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-glow hover:scale-[1.02] transition flex items-center justify-center gap-2">
                  Join waitlist <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Custodian wallet with institutional-grade security. Your funds are held securely.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
