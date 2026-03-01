import mockData from "../../data/MockData.json";
import { MdPayment, MdFolder, MdCheckCircle } from "react-icons/md";

const iconConfig = {
  payment: { Icon: MdPayment,      bg: "bg-green-50",  color: "text-green-500"  },
  project: { Icon: MdFolder,       bg: "bg-orange-50", color: "text-orange-400" },
  task:    { Icon: MdCheckCircle,  bg: "bg-gray-100",  color: "text-gray-500"   },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}

export default function RecentActivity() {
  const activities = mockData.recentActivity.slice(0, 5);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
          Recent Activity
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
          Latest
        </span>
      </div>

      {/* Activity list — grows to fill available space */}
      <div className="flex flex-col flex-1">
        {activities.map((activity, index) => {
          const { Icon, bg, color } = iconConfig[activity.type];
          const isLast = index === activities.length - 1;

          return (
            <div key={activity.id} className="flex flex-col flex-1">
              <div className="flex items-center gap-4 py-3 flex-1">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 leading-snug">
                    {activity.message}
                  </p>
                  <span className="text-[11px] text-gray-400">
                    {formatDate(activity.date)}
                  </span>
                </div>
              </div>
              {!isLast && <div className="border-t border-gray-50" />}
            </div>
          );
        })}
      </div>

      {/* Footer — always at bottom */}
      <div className="pt-4 border-t border-gray-100 mt-2">
        <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-150 text-left">
          View all activity →
        </button>
      </div>
    </div>
  );
}