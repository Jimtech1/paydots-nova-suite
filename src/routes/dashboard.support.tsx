import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/dashboard/ui-bits";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/support")({
  component: SupportPage,
});

const faqs = [
  { q: "How do I get a virtual card?", a: "Go to Cards and click 'Request new card'. Your card is issued instantly." },
  { q: "What are the FX fees?", a: "Cross-border transfers cost 0.1% via Stellar. There are no hidden markups." },
  { q: "Is my money safe?", a: "Funds are custodied with regulated partners and investments are managed by a licensed portfolio manager." },
  { q: "How do payouts work for merchants?", a: "Payouts settle to your linked bank account every weekday." },
];

function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader title="Support" subtitle="Find answers fast or reach out to our team" />
      <div className="grid lg:grid-cols-2 gap-5">
        <Panel title="Frequently asked">
          <div className="divide-y divide-border">
            {faqs.map((f, i) => (
              <div key={i} className="py-3">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center text-left">
                  <span className="font-semibold text-sm">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="text-sm text-muted-foreground mt-2">{f.a}</p>}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Contact us">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-3"
          >
            <input placeholder="Subject" className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none" />
            <textarea placeholder="How can we help?" rows={5} className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none resize-none" />
            <button className="bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-2 text-sm shadow-neon">Send message</button>
            {sent && <p className="text-emerald-500 text-sm font-semibold">Thanks — we'll be in touch shortly.</p>}
          </form>
        </Panel>
      </div>
    </div>
  );
}
