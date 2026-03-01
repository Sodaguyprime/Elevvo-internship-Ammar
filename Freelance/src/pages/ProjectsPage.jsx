import { useState } from "react";
import mockData from "../data/MockData.json";
import ProjectCard from "../components/ProjectCard";
import ProjectRow  from "../components/ProjectRow";
import { MdGridView, MdTableRows } from "react-icons/md";

const ALL_STATUSES = ["All", "In Progress", "Review", "Pending", "Completed"];

const statusCounts = (projects) =>
  ALL_STATUSES.reduce((acc, s) => {
    acc[s] = s === "All" ? projects.length : projects.filter((p) => p.status === s).length;
    return acc;
  }, {});

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [view, setView]                 = useState("grid"); // "grid" | "table"

  const counts   = statusCounts(mockData.projects);
  const filtered = activeFilter === "All"
    ? mockData.projects
    : mockData.projects.filter((p) => p.status === activeFilter);

  return (
    <div
      className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Page header ── */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">Projects</p>
        <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
        <p className="text-sm text-gray-400">Track and manage all your client work in one place.</p>
      </div>

      {/* ── Controls: filter pills + view toggle ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {ALL_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all duration-150
                ${activeFilter === status
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
                }`}
            >
              {status}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  activeFilter === status ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {counts[status]}
              </span>
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
              ${view === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <MdGridView size={15} />
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
              ${view === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <MdTableRows size={15} />
            Table
          </button>
        </div>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-3">
            <MdGridView size={22} className="text-orange-400" />
          </div>
          <p className="text-sm font-semibold text-gray-900">No projects found</p>
          <p className="text-xs text-gray-400 mt-1">Try selecting a different filter.</p>
        </div>
      )}

      {/* ── Grid view ── */}
      {view === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* ── Table view ── */}
      {view === "table" && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Project", "Status", "Progress", "Deadline", "Value"].map((h) => (
                    <th
                      key={h}
                      className={`py-3.5 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 ${h === "Value" ? "text-right" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Footer summary ── */}
      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 text-right">
          Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of{" "}
          <span className="font-semibold text-gray-600">{mockData.projects.length}</span> projects
        </p>
      )}

    </div>
  );
}