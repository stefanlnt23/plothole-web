export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-5xl">Pricing</h1>
      <p className="mt-3 text-secondary">Choose the plan that fits your contract volume.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Pay As You Go", "£3/analysis", ["No subscription", "Great for occasional checks"]],
          ["Starter", "£19/month", ["10 analyses/month", "Ideal for sole traders"]],
          ["Pro", "£49/month", ["Unlimited analyses", "Priority support"]],
        ].map(([tier, price, points]) => (
          <div key={tier} className="rounded-xl border border-border bg-white p-6">
            <h2 className="font-serif text-2xl">{tier}</h2>
            <p className="mt-2 text-3xl">{price}</p>
            <ul className="mt-4 text-sm text-secondary space-y-1">{(points as string[]).map((p) => <li key={p}>• {p}</li>)}</ul>
            <button className="mt-6 w-full rounded-md bg-forest py-2 text-white">Get Started</button>
            <p className="mt-2 text-xs text-secondary">TODO: Stripe checkout integration</p>
          </div>
        ))}
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="font-serif text-3xl">FAQ</h2>
        <div className="rounded-xl border border-border bg-white p-5"><h3 className="font-semibold">Is PlotHole suitable for employment contracts?</h3><p className="text-secondary mt-1">Yes — it supports common employment and contractor agreements used in the UK.</p></div>
        <div className="rounded-xl border border-border bg-white p-5"><h3 className="font-semibold">Does it replace a solicitor?</h3><p className="text-secondary mt-1">No. PlotHole helps you spot issues quickly so solicitor time can focus on decisions and negotiation.</p></div>
        <div className="rounded-xl border border-border bg-white p-5"><h3 className="font-semibold">What types of contracts can it analyse?</h3><p className="text-secondary mt-1">Most UK commercial, service, employment, supplier and freelance contracts.</p></div>
        <div className="rounded-xl border border-border bg-white p-5"><h3 className="font-semibold">Is my contract data secure?</h3><p className="text-secondary mt-1">Yes. Data is handled over encrypted channels and only used for your analysis workflow.</p></div>
      </section>
    </main>
  );
}
