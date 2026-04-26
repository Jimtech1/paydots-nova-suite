const stats = [
  { v: "0.1%", l: "Transaction fee" },
  { v: "3-5s", l: "Stellar settlement" },
  { v: "30+", l: "Currencies supported" },
  { v: "18%", l: "APY on investments" },
];

export function Stats() {
  return (
    <section id="stats" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl font-bold text-gradient">{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
