import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdFolder, MdManageAccounts } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import Avatar from "/Avatar.png";
const navItems = [
  { label: "Dashboard",        Icon: MdDashboard,      path: "/"                 },
  { label: "Projects",         Icon: MdFolder,         path: "/projects"         },
  { label: "Profile Settings", Icon: MdManageAccounts, path: "/profile-settings" },
];

export default function SideBar({ mobileOpen, onMobileClose }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      {/* ── Mobile backdrop ── */}
      <div
        onClick={onMobileClose}
        className="fixed inset-0 bg-black/30 z-20 md:hidden transition-opacity duration-300"
        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
      />

      {/* ── Sidebar ── */}
      <aside
        style={{
          // Desktop: animate width. Mobile: animate x position
          width: expanded ? 256 : 72,
          transition: "width 0.3s ease, transform 0.3s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
        className={`
          fixed md:relative z-30 md:z-auto
          flex flex-col bg-white border-r border-gray-100 h-screen md:min-h-screen
          shadow-sm overflow-visible flex-shrink-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* ── Logo row ── */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span
            className="text-gray-900 font-semibold text-[15px] tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? 160 : 0 }}
          >
            FreelanceCo
          </span>
        </div>

        {/* ── Divider + toggle (desktop only) ── */}
        <div className="relative flex items-center">
          <div className="flex-1 border-t border-gray-100" />
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            className="hidden md:flex absolute -right-0.5 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm text-gray-400 hover:text-gray-700 hover:border-gray-300 items-center justify-center transition-all duration-200 z-20"
          >
            <IoChevronBack
              size={14}
              style={{
                transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex flex-col gap-1 px-3 mt-4 flex-1">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-1 whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{ opacity: expanded ? 1 : 0, maxHeight: expanded ? 20 : 0 }}
          >
            Main
          </p>

          {navItems.map(({ label, Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 w-full transition-all duration-150
                ${isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              <span
                className="text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
                style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? 160 : 0 }}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* ── User card ── */}
       
      </aside>
    </>
  );
}