import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-1">
        {/* Nova logo mark */}
        <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
          <polygon points="18,2 34,32 2,32" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round"/>
          <polygon points="18,9 28,27 8,27" fill="#3b82f6" opacity="0.25"/>
        </svg>
        <span className="font-display text-2xl text-white tracking-widest ml-1">NOVA</span>
      </div>

      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
        <a href="#specs" className="hover:text-white transition-colors duration-200">Specs</a>
        <a href="#colors" className="hover:text-white transition-colors duration-200">Colors</a>
        <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
      </div>

      <a
        href="#order"
        className="navbar-cta text-sm font-bold px-6 py-2.5 rounded-full text-white"
      >
        Order Now
      </a>
    </nav>
  );
}
