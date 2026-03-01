import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdMenu, MdNotificationsNone, MdAdd } from "react-icons/md";
import { useAvatar } from "../context/AvatarContext";
import { useProjects } from "../context/ProjectsContext";
import { useNotifications } from "../context/NotificationsContext";
import AddProjectModal from "./AddProjectModal";
import NotificationsDropdown from "./NotificationsDropdown";

const pageTitles = {
  "/":                 "Dashboard",
  "/projects":         "Projects",
  "/profile-settings": "Profile Settings",
};

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { avatarUrl }   = useAvatar();
  const { addProject }  = useProjects();
  const { unreadCount } = useNotifications();

  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <>
      <header
        className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Left: hamburger + page title ── */}
        <div className="flex items-center gap-3">
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

          {/* New Project — full on desktop */}
          <button
            onClick={() => setModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150"
          >
            <MdAdd size={18} />
            New Project
          </button>

          {/* New Project — icon only on mobile */}
          <button
            onClick={() => setModalOpen(true)}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-gray-900 text-white hover:bg-gray-700 transition-all duration-150"
            aria-label="New Project"
          >
            <MdAdd size={18} />
          </button>

          {/* ── Notification bell ── */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150
                ${notifOpen
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              aria-label="Notifications"
            >
              <MdNotificationsNone size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            {notifOpen && (
              <NotificationsDropdown onClose={() => setNotifOpen(false)} />
            )}
          </div>

          {/* Avatar */}
          <button
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 hover:ring-2 hover:ring-gray-200 transition-all duration-150 flex-shrink-0"
            aria-label="Profile"
          >
            <img src={avatarUrl} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
          </button>

        </div>
      </header>

      {/* ── Add Project Modal ── */}
      <AddProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(project) => {
          addProject(project);
          setModalOpen(false);
        }}
      />
    </>
  );
}
