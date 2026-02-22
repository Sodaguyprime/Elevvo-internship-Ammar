import { useState } from "react";
import "./Pricing.css";

const tiers = [
  {
    name: "Phantom X",
    tagline: "The Essential",
    ram: "8GB RAM",
    storage: "128GB",
    price: 799,
    color: "blue",
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
    features: [
      "6.8\" Super AMOLED 120Hz",
      "200MP AI Triple Camera",
      "5800mAh / 65W Charge",
      "Phantom X1 Chip",
      "NovaOS 3.0",
      "IP68 Water Resistance",
    ],
    highlight: false,
  },
  {
    name: "Phantom X Pro",
    tagline: "The Power Move",
    ram: "12GB RAM",
    storage: "256GB",
    price: 999,
    color: "cyan",
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    features: [
      "Everything in Phantom X",
      "12GB LPDDR5X RAM",
      "256GB UFS 4.0 Storage",
      "100W SuperCharge",
      "50W Wireless Charging",
      "Nova AI Pro Suite",
    ],
    highlight: true,
    badge: "Best Value",
  },
  {
    name: "Phantom X Ultra",
    tagline: "The Apex",
    ram: "16GB RAM",
    storage: "512GB / 1TB",
    price: 1299,
    color: "purple",
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.35)",
    features: [
      "Everything in Pro",
      "16GB RAM + up to 1TB",
      "Titanium Frame",
      "10× Periscope Zoom",
      "Satellite Connectivity",
      "Priority Nova Support",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const [selected, setSelected] = useState(1);

  return (
    <section id="pricing" className="pricing-section relative px-8 py-32 overflow-hidden">
      <div className="pricing-bg-orb" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] pricing-eyebrow">Pricing</span>
            <div className="w-8 h-px bg-blue-500" />
          </div>
          <h2 className="font-display text-7xl md:text-8xl leading-none pricing-title">YOUR</h2>
          <h2 className="font-display text-7xl md:text-8xl pricing-gradient-text leading-none">PHANTOM</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              onClick={() => setSelected(i)}
              className={`pricing-card relative rounded-3xl p-8 cursor-pointer transition-all duration-400 ${
                selected === i ? "pricing-card-active" : ""
              }`}
              style={selected === i ? {
                borderColor: tier.accent,
                boxShadow: `0 0 60px ${tier.glow}, inset 0 0 60px rgba(0,0,0,0.1)`,
                background: `linear-gradient(160deg, ${tier.glow.replace('0.35','0.06')}, var(--bg-card))`,
              } : {}}
            >
              {tier.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black px-5 py-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${tier.accent}, ${tier.glow})`,
                    color: "#fff",
                    boxShadow: `0 4px 16px ${tier.glow}`,
                  }}
                >
                  {tier.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: tier.accent }}>
                  {tier.tagline}
                </p>
                <h3 className="font-display text-3xl pricing-card-name">{tier.name.toUpperCase()}</h3>
                <p className="text-sm mt-1 pricing-card-sub">{tier.ram} · {tier.storage}</p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-end gap-1">
                <span className="text-xl mb-1 pricing-price-sym">$</span>
                <span className="text-5xl font-black pricing-price">{tier.price}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none">
                      <circle cx="8" cy="8" r="7" stroke={tier.accent} strokeWidth="1.5" />
                      <polyline points="5,8 7,10 11,6" stroke={tier.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm leading-snug pricing-feature">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#order"
                className="pricing-cta-btn w-full block text-center font-bold py-4 rounded-2xl text-sm transition-all duration-300"
                style={selected === i ? {
                  background: `linear-gradient(135deg, ${tier.accent}, ${tier.glow})`,
                  color: "#fff",
                  boxShadow: `0 0 24px ${tier.glow}`,
                } : {}}
              >
                Order Now
              </a>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-sm mt-10 pricing-fine-print">
          Prices shown before taxes. Free shipping on all orders. 14-day returns.
        </p>
      </div>
    </section>
  );
}
