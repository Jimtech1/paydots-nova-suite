import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { InvestmentPartner } from "@/components/site/InvestmentPartner";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { Waitlist } from "@/components/site/Waitlist";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Paydots — Your Lightspark-Powered Financial Super-App" },
      { name: "description", content: "Spend, invest, accept payments, run global payroll, and earn yield in one custodian wallet — powered by your Lightspark Global Account and UMA." },
      { property: "og:title", content: "Paydots — Your Lightspark-Powered Financial Super-App" },
      { property: "og:description", content: "Custodian wallet, UMA money address, virtual cards, global payroll, cross-border payments and institutional-grade investments — powered by Lightspark Global Account." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSlider />
        <Features />
        <HowItWorks />
        <InvestmentPartner />
        <Stats />
        <Testimonials />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
