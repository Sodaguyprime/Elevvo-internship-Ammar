import "./OrderCTA.css";

export default function OrderCTA() {
  return (
    <section id="order" className="order-section relative px-8 py-32 overflow-hidden">
      {/* Background */}
      <div className="order-bg" />
      <div className="order-grid" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-blue-400" />
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Limited Availability</span>
          <div className="w-8 h-px bg-blue-400" />
        </div>

        <h2 className="font-display text-[clamp(4rem,11vw,8rem)] leading-none text-white mb-4">
          DON'T<br />
          <span className="order-cta-text">WAIT.</span>
        </h2>

        <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          The Nova Phantom X ships in 3–5 business days. Reserve yours now before the first batch sells out.
        </p>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#pricing" className="order-btn-main font-black text-xl px-14 py-5 rounded-full text-white">
            ORDER NOW
          </a>
          <a href="#specs" className="order-btn-ghost font-medium text-base px-10 py-5 rounded-full text-slate-300">
            Compare Models
          </a>
        </div>

        {/* Reassurance row */}
        <div className="order-trust flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          {[
            ["🚚", "Free Shipping"],
            ["↩️", "14-Day Returns"],
            ["🔒", "Secure Checkout"],
            ["⭐", "2-Year Warranty"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
