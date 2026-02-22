import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section px-8 py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
            <polygon points="18,2 34,32 2,32" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round"/>
            <polygon points="18,9 28,27 8,27" fill="#3b82f6" opacity="0.25"/>
          </svg>
          <span className="font-display text-xl text-white tracking-widest">NOVA</span>
        </div>

        <p className="text-slate-600 text-sm text-center">
          © 2025 Nova Technologies Inc. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-slate-500">
          {["Privacy", "Terms", "Support", "Careers"].map((link) => (
            <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
