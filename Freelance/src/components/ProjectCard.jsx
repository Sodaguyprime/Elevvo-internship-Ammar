const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-600",
  "Review":      "bg-orange-50 text-orange-500",
  "Completed":   "bg-green-50 text-green-600",
  "Pending":     "bg-gray-100 text-gray-500",
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

export default function ProjectCard({ project }) {
  const progress = Math.round((project.tasksComplete / project.tasksTotal) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-all duration-200">

      {/* Top: dot + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
            {project.client}
          </span>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${statusStyles[project.status]}`}>
          {project.status}
        </span>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-bold text-gray-900 leading-snug">{project.name}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Progress</span>
          <span className="text-[11px] font-semibold text-gray-700">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-400">
          {project.tasksComplete} / {project.tasksTotal} tasks
        </span>
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
          <span className="text-xs font-bold text-gray-900">${project.value.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
