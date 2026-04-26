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
      { title: "Paydots — The Stellar Financial Ecosystem" },
      { name: "description", content: "Spend, invest, accept payments, and earn yield in one secure custodian wallet. Powered by Stellar and a licensed portfolio manager." },
      { property: "og:title", content: "Paydots — The Stellar Financial Ecosystem" },
      { property: "og:description", content: "Custodian wallet, virtual cards, cross-border payments and institutional-grade investments — built on Stellar." },
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
