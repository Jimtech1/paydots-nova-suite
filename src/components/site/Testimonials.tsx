import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const items = [
  { quote: "Paydots makes it effortless to hold multiple currencies, spend with a card, and invest in high-yield assets — all from one dashboard.", name: "Chidi Okafor", role: "Early backer · Lagos", avatar: avatar1 },
  { quote: "Finally, an app that bridges Stellar's speed with real institutional yield. The custodian model just works for everyday users.", name: "Amara Kalu", role: "Stellar ecosystem builder", avatar: avatar2 },
  { quote: "Cross-border payouts to my contractors used to take days. With Paydots, they're done in seconds at near-zero cost.", name: "David Mensah", role: "SaaS founder · Nairobi", avatar: avatar3 },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold">Early community</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Loved by builders & <span className="text-gradient">early backers</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <figure key={i} className="glass rounded-2xl p-7 hover:-translate-y-1 transition-transform">
              <blockquote className="text-base leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} loading="lazy" width={512} height={512} className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/30" />
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
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
