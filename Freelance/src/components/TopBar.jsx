import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdMenu, MdNotificationsNone, MdAdd } from "react-icons/md";

const pageTitles = {
  "/":                 "Dashboard",
  "/projects":         "Projects",
  "/profile-settings": "Profile Settings",
};

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation();
  const [hasNotif] = useState(true); // placeholder — flip to false when cleared

  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left: hamburger (mobile) + page title ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger — only visible on mobile */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150"
        >
          <MdMenu size={22} />
        </button>

        <div>
          <h1 className="text-[17px] font-semibold text-gray-900 leading-tight">{title}</h1>
          <p className="text-[11px] text-gray-400 hidden sm:block">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-2">

        {/* New Project button */}
        <button
          className="hidden sm:flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150"
        >
          <MdAdd size={18} />
          New Project
        </button>

        {/* New Project — icon only on mobile */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-gray-900 text-white hover:bg-gray-700 transition-all duration-150"
          aria-label="New Project"
        >
          <MdAdd size={18} />
        </button>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150"
          aria-label="Notifications"
        >
          <MdNotificationsNone size={22} />
          {hasNotif && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>

        {/* Avatar */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 hover:ring-2 hover:ring-gray-200 transition-all duration-150 flex-shrink-0"
          aria-label="Profile"
        >
          {/* Empty — will hold initials or image later */}
        </button>

      </div>
    </header>
  );
}