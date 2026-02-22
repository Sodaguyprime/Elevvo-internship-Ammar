import "./Hero.css";
import Phone from './blue.png'
export default function Hero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="hero-grid" />

      {/* Glow orb behind phone */}
      <div className="hero-orb" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center min-h-screen py-20">

        {/* LEFT — copy */}
        <div className="hero-left flex flex-col justify-center">
          <div className="hero-eyebrow flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Introducing</span>
          </div>

          <h1 className="font-display text-[clamp(5rem,12vw,9rem)] leading-none text-white mb-2">
            NOVA
          </h1>
          <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none hero-phantom-text mb-8">
            PHANTOM X
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10 font-light">
            Engineered at the edge of what's possible. The Phantom X doesn't follow the rules —
            it rewrites them. Titanium frame. Quantum camera. <span className="text-white font-medium">Yours.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#order"
              className="hero-order-btn font-bold text-base px-10 py-4 rounded-full text-white"
            >
              Order Now →
            </a>
            <a
              href="#specs"
              className="hero-specs-btn font-medium text-base px-10 py-4 rounded-full text-slate-300"
            >
              View Specs
            </a>
          </div>

          {/* Stat strip */}
          <div className="hero-stats flex gap-10 mt-16 pt-10 border-t border-white/10">
            {[["6.8", "Super AMOLED"], ["200MP", "AI Camera"], ["5800mAh", "Battery"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-white font-bold text-xl">{val}</p>
                <p className="text-slate-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — blue phone image */}
        <div className="hero-right flex items-center justify-center relative">
          <div className="hero-phone-glow" />
          <div className="hero-phone-ring hero-ring-1" />
          <div className="hero-phone-ring hero-ring-2" />

          <img
            src={Phone}
            alt="Nova Phantom X in Glacial Blue"
            className="hero-phone-img relative z-10"
          />

          {/* Floating badge */}
          <div className="hero-badge absolute bottom-16 right-0 md:-right-4">
            <span className="text-2xl font-black text-white block">NEW</span>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">2026</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
