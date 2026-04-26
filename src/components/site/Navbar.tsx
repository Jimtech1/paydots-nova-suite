import { Link } from "@tanstack/react-router";
import logo from "@/assets/paydots-logo.png";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Paydots" className="h-8 w-8 object-contain" />
            <span className="font-display font-bold text-lg tracking-tight">Paydots</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#invest" className="hover:text-foreground transition">Investments</a>
            <a href="#stats" className="hover:text-foreground transition">Network</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#waitlist"
              className="bg-gradient-vivid text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl shadow-neon hover:opacity-90 transition"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

