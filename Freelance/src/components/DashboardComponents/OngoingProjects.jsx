import mockData from "../../data/MockData.json";

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-600",
  "Review":      "bg-orange-50 text-orange-500",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}

function isDueSoon(dateStr) {
  const diff = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24);
  return diff <= 7 && diff >= 0;
}

export default function OngoingProjects() {
  const projects = mockData.projects
    .filter((p) => p.status === "In Progress" || p.status === "Review")
    .slice(0, 4);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
          Ongoing Projects
        </h2>
        <span className="text-xs text-gray-400 font-medium">
          {projects.length} active
        </span>
      </div>

      {/* Cards — grow to fill space */}
      <div className="flex flex-col gap-3 flex-1">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-all duration-150 flex-1"
          >
            {/* Top: dot + status badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
                  Project
                </span>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${statusStyles[project.status]}`}>
                {project.status}
              </span>
            </div>

            {/* Middle: name + client */}
            <div className="flex flex-col gap-0.5 flex-1">
              <p className="text-sm font-bold text-gray-900 leading-snug">
                {project.name}
              </p>
              <p className="text-xs text-gray-400">{project.client}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Bottom: deadline + value */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Due</span>
                <span className={`text-xs font-semibold ${isDueSoon(project.deadline) ? "text-red-500" : "text-gray-700"}`}>
                  {formatDate(project.deadline)}
                </span>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Value</span>
                <span className="text-xs font-bold text-gray-900">
                  ${project.value.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer — always at bottom */}
      <div className="pt-4 border-t border-gray-100 mt-2">
        <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-150 text-left">
          View all projects →
        </button>
      </div>
    </div>
  );
}