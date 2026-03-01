import { useState, useEffect, useRef } from "react";
import { MdClose, MdCheck, MdFolder, MdPerson, MdCalendarToday, MdAttachMoney } from "react-icons/md";

const STATUS_OPTIONS = ["In Progress", "Pending", "Review", "Completed"];

const defaultForm = {
  name:          "",
  client:        "",
  status:        "In Progress",
  deadline:      "",
  value:         "",
  tasksTotal:    "",
  tasksComplete: "0",
};

// ── Field ──────────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
        {Icon && <Icon size={12} className="text-gray-300" />}
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-150";

// ── Modal ──────────────────────────────────────────────────────────────────
export default function AddProjectModal({ isOpen, onClose, onAdd }) {
  const [form,   setForm]   = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [saved,  setSaved]  = useState(false);
  const firstInputRef = useRef(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(defaultForm);
      setErrors({});
      setSaved(false);
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim())     errs.name     = "Project name is required.";
    if (!form.client.trim())   errs.client   = "Client name is required.";
    if (!form.deadline)        errs.deadline = "Deadline is required.";
    if (!form.value || isNaN(Number(form.value)) || Number(form.value) < 0)
      errs.value = "Enter a valid value.";
    if (!form.tasksTotal || isNaN(Number(form.tasksTotal)) || Number(form.tasksTotal) < 1)
      errs.tasksTotal = "Enter at least 1 task.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newProject = {
      id:            Date.now(),
      name:          form.name.trim(),
      client:        form.client.trim(),
      status:        form.status,
      deadline:      form.deadline,
      value:         Number(form.value),
      tasksTotal:    Number(form.tasksTotal),
      tasksComplete: Number(form.tasksComplete) || 0,
    };

    onAdd(newProject);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 900);
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Dimmed overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          animation: "modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
              <MdFolder size={18} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">New Project</h2>
              <p className="text-[11px] text-gray-400">Fill in the details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-all duration-150"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">

          {/* Name */}
          <Field label="Project Name" icon={MdFolder} error={errors.name}>
            <input
              ref={firstInputRef}
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Acme Corp — Website Redesign"
              className={inputClass}
            />
          </Field>

          {/* Client */}
          <Field label="Client" icon={MdPerson} error={errors.client}>
            <input
              type="text"
              value={form.client}
              onChange={set("client")}
              placeholder="e.g. Acme Corp"
              className={inputClass}
            />
          </Field>

          {/* Status + Deadline side by side */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status" error={errors.status}>
              <select
                value={form.status}
                onChange={set("status")}
                className={inputClass}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Deadline" icon={MdCalendarToday} error={errors.deadline}>
              <input
                type="date"
                value={form.deadline}
                onChange={set("deadline")}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Value */}
          <Field label="Project Value ($)" icon={MdAttachMoney} error={errors.value}>
            <input
              type="number"
              min="0"
              value={form.value}
              onChange={set("value")}
              placeholder="e.g. 3500"
              className={inputClass}
            />
          </Field>

          {/* Tasks */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total Tasks" error={errors.tasksTotal}>
              <input
                type="number"
                min="1"
                value={form.tasksTotal}
                onChange={set("tasksTotal")}
                placeholder="e.g. 8"
                className={inputClass}
              />
            </Field>

            <Field label="Tasks Complete" error={errors.tasksComplete}>
              <input
                type="number"
                min="0"
                value={form.tasksComplete}
                onChange={set("tasksComplete")}
                placeholder="0"
                className={inputClass}
              />
            </Field>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
              ${saved
                ? "bg-green-500 text-white scale-95"
                : "bg-gray-900 hover:bg-gray-700 text-white"
              }`}
          >
            {saved ? (
              <><MdCheck size={16} /> Added!</>
            ) : (
              "Add Project"
            )}
          </button>
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}
