import Link from "next/link";

const pricing = [
  ["Pay As You Go", "£3/analysis", ["Single-use credits", "No commitment", "Full legal risk scan"]],
  ["Starter", "£19/month", ["10 analyses/month", "Clause-by-clause breakdown", "Email support"]],
  ["Pro", "£49/month", ["Unlimited analyses", "Priority support", "Best for growing firms"]],
] as const;

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-20 text-center animate-fadeIn">
        <p className="font-serif text-xl text-forest">PlotHole</p>
        <h1 className="mt-6 font-serif text-5xl md:text-7xl">Your Next Contract Could Cost You Everything.</h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-secondary">PlotHole reads the small print so you don&apos;t have to. Instant AI analysis of any UK contract in under 60 seconds.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/auth" className="rounded-md bg-forest px-6 py-3 text-white">Analyse a Contract — Free</Link>
          <Link href="/sample-report" className="rounded-md border border-border px-6 py-3">See a Sample Report</Link>
        </div>
        <p className="mt-4 text-sm text-secondary">Trusted by 1,200+ UK tradespeople, freelancers and small businesses</p>
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-white p-8 text-left shadow-subtle">
          <div className="space-y-3">
            <p className="font-mono text-sm">SERVICE AGREEMENT</p>
            <p className="rounded bg-danger/10 p-2 text-sm">⚠ Unlimited liability clause detected</p>
            <p className="rounded bg-warning/10 p-2 text-sm">⚠ Auto-renewal with 90-day notice period</p>
            <p className="rounded bg-forest/10 p-2 text-sm">✓ Standard payment terms</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        {["Upload your PDF contract", "AI analyses every clause in 60 seconds", "Get a plain-English risk report with a score out of 10"].map((step, i) => (
          <div key={step} className="rounded-xl border border-border p-6">
            <p className="font-serif text-5xl text-forest">{i + 1}</p>
            <p className="mt-3">{step}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-serif text-3xl">What we find</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["🔴 Dangerous Clauses", "IP grabs, unlimited liability, unfair termination"],
            ["⚠️ Missing Protections", "No GDPR clause? No exit rights? We flag the gaps"],
            ["📅 Key Dates", "Auto-renewals, notice deadlines, payment terms"],
            ["💰 Financial Exposure", "Hidden costs, uncapped liability, late payment penalties"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-secondary">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-serif text-3xl">Trusted by people who sign contracts for a living</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["\"Saved me from a brutal termination clause. Paid for itself in five minutes.\"", "Dave H., Electrician, Birmingham"],
            ["\"I finally understand what I&apos;m agreeing to before I click send.\"", "Aisha L., Freelance Designer, Leeds"],
            ["\"Clear, practical, and straight to the point. Exactly what small firms need.\"", "Tom R., Small Practice Accountant, Bristol"],
          ].map(([quote, author]) => (
            <blockquote key={author} className="rounded-xl border border-border bg-white p-5">
              <p>{quote}</p>
              <footer className="mt-3 text-sm text-secondary">{author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12" id="pricing">
        <h2 className="font-serif text-3xl">Simple pricing</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pricing.map(([tier, price, items]) => (
            <div key={tier} className="rounded-xl border border-border bg-white p-6">
              <h3 className="font-serif text-2xl">{tier}</h3>
              <p className="mt-2 text-3xl">{price}</p>
              <ul className="mt-4 space-y-2 text-sm text-secondary">{items.map((item) => <li key={item}>• {item}</li>)}</ul>
              <button className="mt-6 w-full rounded-md bg-forest py-2 text-white">Get Started</button>
              <p className="mt-2 text-xs text-secondary">TODO: Stripe checkout integration</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-secondary">All plans include full clause breakdown, missing protections check, financial exposure analysis and key dates extraction. No legal advice — for informational purposes only.</p>
      </section>

      <footer className="border-t border-border px-6 py-10 text-sm text-secondary">
        <div className="mx-auto max-w-6xl space-y-3">
          <p className="font-serif text-xl text-ink">PlotHole — Read the small print. Before they do.</p>
          <p>Privacy Policy · Terms of Service · Contact</p>
          <p>PlotHole is not a law firm and does not provide legal advice. Reports are for informational purposes only. Always consult a qualified solicitor for legal decisions.</p>
          <p>© 2026 PlotHole Ltd. Registered in England and Wales.</p>
        </div>
      </footer>
    </main>
  );
}
