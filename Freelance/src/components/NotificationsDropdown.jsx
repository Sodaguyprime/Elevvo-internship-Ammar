import { useEffect, useRef } from "react";
import { MdPayment, MdFolder, MdCheckCircle, MdNotificationsNone, MdDoneAll } from "react-icons/md";
import { useNotifications } from "../context/NotificationsContext";

const iconConfig = {
  payment: { Icon: MdPayment,     bg: "bg-green-50",  color: "text-green-500"  },
  project: { Icon: MdFolder,      bg: "bg-orange-50", color: "text-orange-400" },
  task:    { Icon: MdCheckCircle, bg: "bg-gray-100",  color: "text-gray-500"   },
};

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)          return "just now";
  if (diff < 3600)        return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)       return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days === 1)         return "yesterday";
  if (days < 7)           return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotificationsDropdown({ onClose }) {
  const { notifications, unreadCount, markAllRead, markOneRead } = useNotifications();
  const panelRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    // slight delay so the toggle click doesn't immediately close
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const recent = notifications.slice(0, 3);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        animation: "dropIn 0.18s cubic-bezier(0.34,1.4,0.64,1) both",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold bg-orange-400 text-white px-1.5 py-0.5 rounded-full leading-none">
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-orange-500 transition-colors duration-150"
          >
            <MdDoneAll size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* ── List ── */}
      <div className="flex flex-col">
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-center px-4">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center">
              <MdNotificationsNone size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-400">All caught up!</p>
            <p className="text-[11px] text-gray-300">No recent notifications.</p>
          </div>
        ) : (
          recent.map((notif, index) => {
            const cfg = iconConfig[notif.type] ?? iconConfig.task;
            const { Icon, bg, color } = cfg;
            const isLast = index === recent.length - 1;

            return (
              <button
                key={notif.id}
                onClick={() => markOneRead(notif.id)}
                className={`flex items-start gap-3 px-4 py-3.5 text-left w-full transition-colors duration-150
                  ${notif.read ? "hover:bg-gray-50" : "bg-orange-50/40 hover:bg-orange-50/70"}
                  ${!isLast ? "border-b border-gray-50" : ""}
                `}
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${bg}`}>
                  <Icon size={17} className={color} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <p className={`text-[13px] leading-snug ${notif.read ? "text-gray-500 font-normal" : "text-gray-900 font-semibold"}`}>
                    {notif.message}
                  </p>
                  <span className="text-[11px] text-gray-400">{timeAgo(notif.date)}</span>
                </div>

                {/* Unread dot */}
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                )}
              </button>
            );
          })
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/60">
        <button
          onClick={onClose}
          className="text-[11px] font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-150"
        >
          View all activity →
        </button>
      </div>

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);     }
        }
      `}</style>
    </div>
  );
}
