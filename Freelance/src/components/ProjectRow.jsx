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

export default function ProjectRow({ project }) {
  const progress = Math.round((project.tasksComplete / project.tasksTotal) * 100);

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 group">

      {/* Name + client */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-gray-900">{project.name}</p>
          <p className="text-xs text-gray-400">{project.client}</p>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap ${statusStyles[project.status]}`}>
          {project.status}
        </span>
      </td>

      {/* Progress */}
      <td className="py-4 px-4 min-w-[140px]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">{project.tasksComplete}/{project.tasksTotal} tasks</span>
            <span className="text-[10px] font-semibold text-gray-600">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </td>

      {/* Deadline */}
      <td className="py-4 px-4">
        <span className={`text-xs font-semibold ${isDueSoon(project.deadline) ? "text-red-500" : "text-gray-700"}`}>
          {formatDate(project.deadline)}
        </span>
      </td>

      {/* Value */}
      <td className="py-4 px-4 text-right">
        <span className="text-sm font-bold text-gray-900">${project.value.toLocaleString()}</span>
      </td>

    </tr>
  );
}
