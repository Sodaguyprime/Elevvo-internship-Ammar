import "./PhoneShowcase.css";
import Front from './front.png'
const specs = [
  {
    category: "Display",
    icon: "▣",
    items: [
      ["Size", "6.8\" Super AMOLED"],
      ["Resolution", "3088 × 1440 QHD+"],
      ["Refresh Rate", "1–144Hz Adaptive"],
      ["Brightness", "2600 nits peak"],
    ],
  },
  {
    category: "Camera",
    icon: "◉",
    items: [
      ["Main", "200MP, f/1.7, OIS"],
      ["Ultra-wide", "50MP, 120° FOV"],
      ["Telephoto", "10MP, 10× optical"],
      ["Front", "32MP, 4K video"],
    ],
  },
  {
    category: "Performance",
    icon: "◈",
    items: [
      ["Chip", "Phantom X1 Octa-core"],
      ["RAM", "12 / 16 GB LPDDR5X"],
      ["Storage", "256GB / 512GB / 1TB"],
      ["OS", "NovaOS 3.0 (Android 15)"],
    ],
  },
  {
    category: "Battery",
    icon: "◐",
    items: [
      ["Capacity", "5800 mAh"],
      ["Wired", "100W SuperCharge"],
      ["Wireless", "50W MagCharge"],
      ["Reverse", "10W wireless share"],
    ],
  },
];

export default function PhoneShowcase() {
  return (
    <section id="specs" className="showcase-section relative px-8 py-32 overflow-hidden">
      <div className="showcase-bg-line showcase-line-1" />
      <div className="showcase-bg-line showcase-line-2" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT — front phone image */}
        <div className="showcase-left flex items-center justify-center relative">
          <div className="showcase-phone-shadow" />
          <img
            src={Front}
            alt="Nova Phantom X – Front View"
            className="showcase-phone-img"
          />
          
        </div>

        {/* RIGHT — specs */}
        <div className="showcase-right">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Full Specifications</span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-white mb-3 leading-none">WHAT'S</h2>
          <h2 className="font-display text-6xl md:text-7xl mb-10 leading-none showcase-gradient-text">INSIDE</h2>

          <div className="grid grid-cols-1 gap-5">
            {specs.map((group) => (
              <div key={group.category} className="spec-group">
                <div className="spec-group-header flex items-center gap-3 mb-3">
                  <span className="text-blue-400 text-lg">{group.icon}</span>
                  <span className="text-white font-bold text-sm uppercase tracking-wider">{group.category}</span>
                </div>
                <div className="spec-rows grid grid-cols-2 gap-2">
                  {group.items.map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="text-slate-500 text-xs block mb-0.5">{key}</span>
                      <span className="text-slate-200 text-sm font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
