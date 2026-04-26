const items = [
  { quote: "Paydots makes it effortless to hold multiple currencies, spend with a card, and invest in high-yield assets — all from one dashboard.", name: "Chidi O.", role: "Early backer · Lagos" },
  { quote: "Finally, an app that bridges Stellar's speed with real institutional yield. The custodian model just works.", name: "Amara K.", role: "Stellar ecosystem builder" },
  { quote: "Cross-border payouts to my contractors used to take days. With Paydots, they're done in seconds at near-zero cost.", name: "David M.", role: "SaaS founder · Nairobi" },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Early community</div>
          <h2 className="text-3xl md:text-5xl font-bold">Loved by builders & <span className="text-gradient">early backers</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <figure key={i} className="glass rounded-2xl p-6">
              <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-vivid shadow-neon" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
