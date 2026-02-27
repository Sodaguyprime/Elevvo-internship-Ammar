import { useState } from "react";

const icons = {
  Dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Projects: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
    </svg>
  ),
  "Profile Settings": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20v-1a6 6 0 0112 0v1" />
    </svg>
  ),
};

const navItems = [
  { label: "Dashboard", key: "Dashboard" },
  { label: "Projects", key: "Projects" },
  { label: "Profile Settings", key: "Profile Settings" },
];

export default function SideBar() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState("Dashboard");

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-[72px]"
      } min-h-screen`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Logo area */}
      <div
        className={`flex items-center px-5 py-5 ${
          expanded ? "justify-between" : "justify-center"
        }`}
      >
        {expanded ? (
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-placeholder.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-cover bg-gray-100"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="w-8 h-8 rounded-lg bg-gray-900 items-center justify-center hidden"
              aria-hidden="true"
            >
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <span className="text-gray-900 font-semibold text-[15px] tracking-tight">
              FreelanceCo
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
        )}
      </div>

      {/* Divider with toggle button */}
      <div className="relative flex items-center px-0">
        <div className="flex-1 border-t border-gray-100" />
        <button
          onClick={() => setExpanded((v) => !v)}
          className="absolute -right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all duration-150 z-10"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? "" : "rotate-180"}`}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 mt-4 flex-1">
        {!expanded && (
          <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-1 px-2">
            •••
          </p>
        )}
        {expanded && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1 px-2">
            Main
          </p>
        )}

        {navItems.map(({ label, key }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 w-full text-left transition-all duration-150 group
                ${isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }
                ${!expanded ? "justify-center" : ""}
              `}
            >
              <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-700"}`}>
                {icons[key]}
              </span>
              {expanded && (
                <span className={`text-sm font-medium truncate ${isActive ? "text-white" : ""}`}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-5 mt-auto">
        <div className={`rounded-xl bg-gray-50 p-3 flex items-center gap-3 ${!expanded ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0" />
          {expanded && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-800 truncate">Your Name</p>
              <p className="text-[11px] text-gray-400 truncate">Freelancer</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}