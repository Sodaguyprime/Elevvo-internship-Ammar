import "./Hero.css";
import Phone from './blue.png'

export default function Hero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="hero-grid" />

      {/* Glow orb behind phone */}
      <div className="hero-orb" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col md:grid md:grid-cols-2 md:gap-12 items-center min-h-screen">

        {/* Phone image — shows FIRST on mobile, above copy */}
        <div className="hero-right flex items-center justify-center relative w-full mb-12 md:mb-0 md:order-2">
          <div className="hero-phone-glow" />
          <div className="hero-phone-ring hero-ring-1" />
          <div className="hero-phone-ring hero-ring-2" />

          <img
            src={Phone}
            alt="Nova Phantom X in Glacial Blue"
            className="hero-phone-img relative z-10"
          />

          {/* Floating badge */}
          <div className="hero-badge absolute bottom-4 right-4 md:bottom-16 md:-right-4">
            <span className="text-xl md:text-2xl font-black block hero-badge-new">NEW</span>
            <span className="text-xs font-bold uppercase tracking-widest hero-badge-year">2026</span>
          </div>
        </div>

        {/* LEFT — copy */}
        <div className="hero-left flex flex-col justify-center md:order-1 w-full">
          <div className="hero-eyebrow flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-px hero-eyebrow-line" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] hero-eyebrow-label">Introducing</span>
          </div>

          <h1 className="font-display text-[clamp(3.5rem,15vw,9rem)] leading-none mb-1 md:mb-2 hero-title">
            NOVA
          </h1>
          <h2 className="font-display text-[clamp(2rem,9vw,5.5rem)] leading-none hero-phantom-text mb-6 md:mb-8">
            PHANTOM X
          </h2>

          <p className="text-base md:text-lg leading-relaxed max-w-md mb-8 md:mb-10 font-light hero-body">
            Engineered at the edge of what's possible. The Phantom X doesn't follow the rules —
            it rewrites them. Titanium frame. Quantum camera. <span className="font-medium hero-title">Yours.</span>
          </p>

          <div className="flex flex-row gap-3 items-start">
            <a
              href="#order"
              className="hero-order-btn font-bold text-sm md:text-base px-7 md:px-10 py-3.5 md:py-4 rounded-full text-white whitespace-nowrap"
            >
              Order Now →
            </a>
            <a
              href="#specs"
              className="hero-specs-btn font-medium text-sm md:text-base px-7 md:px-10 py-3.5 md:py-4 rounded-full whitespace-nowrap"
            >
              View Specs
            </a>
          </div>

          {/* Stat strip */}
          <div className="hero-stats flex gap-6 md:gap-10 mt-10 md:mt-16 pt-8 md:pt-10 border-t hero-stats-divider">
            {[['6.8"', "Super AMOLED"], ["200MP", "AI Camera"], ["5800mAh", "Battery"]].map(([val, label]) => (
              <div key={label}>
                <p className="font-bold text-lg md:text-xl hero-stat-val">{val}</p>
                <p className="text-xs mt-1 hero-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
