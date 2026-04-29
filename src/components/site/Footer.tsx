import { Twitter, Github, MessageCircle } from "lucide-react";
import logo from "@/assets/paydots-logo.png";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Paydots" className="h-8 w-8" />
            <span className="font-bold text-lg">Paydots</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            The Lightspark-powered financial ecosystem. Custodian wallet, UMA money address, virtual cards, global payroll, and institutional-grade investments.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#invest" className="hover:text-foreground">Licensed Portfolio Manager</a></li>
            <li><a href="#stats" className="hover:text-foreground">Lightspark Global Account</a></li>
            <li><a href="#waitlist" className="hover:text-foreground">Waitlist</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Community</div>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter" className="glass h-10 w-10 rounded-xl grid place-items-center hover:text-accent transition"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Discord" className="glass h-10 w-10 rounded-xl grid place-items-center hover:text-accent transition"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="glass h-10 w-10 rounded-xl grid place-items-center hover:text-accent transition"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
        © 2026 Paydots — Powered by Lightspark Global Account. Investments via a licensed portfolio manager (SEC-registered).
      </div>
    </footer>
  );
}
