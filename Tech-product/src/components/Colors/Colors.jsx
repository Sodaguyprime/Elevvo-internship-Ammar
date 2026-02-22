import { useState } from "react";
import "./Colors.css";
import blueImg from './blue.png';
import pinkImg from './pink.png';
import greenImg from './green.png';

const colorOptions = [
  {
    name: "Glacial Blue",
    slug: "blue",
    file: blueImg,
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.45)",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.4)",
    description: "Cold, electric, unstoppable. Glacial Blue is built for those who stand out.",
    tag: "Popular",
  },
  {
    name: "Sakura Pink",
    slug: "pink",
    file: pinkImg,
    accent: "#ec4899",
    glow: "rgba(236,72,153,0.45)",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.4)",
    description: "Bold and unapologetic. Sakura Pink turns heads in every room you walk into.",
    tag: "New",
  },
  {
    name: "Aurora Green",
    slug: "green",
    file: greenImg,
    accent: "#10b981",
    glow: "rgba(16,185,129,0.45)",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.4)",
    description: "Grounded, rare, alive. Aurora Green is for those who move with nature's energy.",
    tag: "Limited",
  },
];

export default function Colors() {
  const [active, setActive] = useState(0);
  const color = colorOptions[active];

  return (
    <section id="colors" className="colors-section relative px-5 md:px-8 py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Finishes</span>
            <div className="w-8 h-px bg-blue-500" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">CHOOSE</h2>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none colors-gradient-text">YOUR COLOR</h2>
        </div>

        {/* Color tabs — pill buttons on mobile */}
        <div className="flex justify-center gap-2 md:gap-4 mb-10 md:mb-14 flex-wrap">
          {colorOptions.map((c, i) => (
            <button
              key={c.slug}
              onClick={() => setActive(i)}
              className={`color-tab relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-xs md:text-sm transition-all duration-300 ${
                active === i ? "color-tab-active text-white" : "text-slate-400 hover:text-white"
              }`}
              style={active === i ? {
                background: c.bg,
                borderColor: c.border,
                boxShadow: `0 0 20px ${c.glow}`,
              } : {}}
            >
              {/* Color dot */}
              <span
                className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                style={{ background: c.accent, boxShadow: `0 0 8px ${c.glow}` }}
              />
              {c.name}
              {c.tag && (
                <span
                  className="hidden sm:inline text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: c.bg, color: c.accent, border: `1px solid ${c.border}` }}
                >
                  {c.tag}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Phone display + description — stacked on mobile */}
        <div className="colors-display flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Phone image */}
          <div className="flex items-center justify-center relative w-full">
            <div
              className="colors-phone-glow"
              style={{ background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)` }}
            />
            <img
              key={color.slug}
              src={color.file}
              alt={`Nova Phantom X in ${color.name}`}
              className="colors-phone-img"
              style={{ filter: `drop-shadow(0 30px 60px ${color.glow})` }}
            />
          </div>

          {/* Info */}
          <div className="colors-info text-center md:text-left w-full">
            <div
              className="colors-color-chip w-16 h-2 rounded-full mb-4 md:mb-6 mx-auto md:mx-0"
              style={{ background: `linear-gradient(90deg, ${color.accent}, ${color.glow})` }}
            />
            <h3
              className="font-display text-4xl md:text-5xl mb-3 md:mb-4 leading-none"
              style={{ color: color.accent }}
            >
              {color.name.toUpperCase()}
            </h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md mx-auto md:mx-0 font-light">
              {color.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8 md:mb-10 justify-center md:justify-start">
              {["256GB", "512GB", "1TB"].map((s) => (
                <span
                  key={s}
                  className="storage-chip text-sm font-semibold px-4 py-2 rounded-full"
                  style={{ borderColor: color.border, color: color.accent, background: color.bg }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex justify-center md:justify-start">
              <a
                href="#order"
                className="inline-flex items-center gap-2 text-white font-bold px-8 md:px-10 py-3.5 md:py-4 rounded-full transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color.accent}, ${color.glow})`,
                  boxShadow: `0 0 30px ${color.glow}`,
                }}
              >
                Order in {color.name} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
