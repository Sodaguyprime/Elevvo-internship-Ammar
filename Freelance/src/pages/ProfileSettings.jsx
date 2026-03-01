import { useState, useRef } from "react";
import mockData from "../data/MockData.json";
import {
  MdEdit, MdCheck, MdClose, MdCameraAlt,
  MdLock, MdPerson, MdEmail, MdBadge,
} from "react-icons/md";
import { useAvatar } from "../context/AvatarContext";

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white text-sm font-medium px-5 py-3.5 rounded-2xl shadow-xl"
      style={{ animation: "fadeUp 0.2s ease both" }}>
      <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
        <MdCheck size={13} className="text-white" />
      </span>
      {message}
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white transition-colors">
        <MdClose size={16} />
      </button>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

// ── Section card ───────────────────────────────────────────────────────────
function Section({ title, icon: Icon, children, onSave, onCancel, dirty }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2.5 pb-1 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
          <Icon size={17} className="text-orange-400" />
        </div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h2>
      </div>

      {children}

      <div className={`flex items-center gap-2 pt-1 transition-opacity duration-200 ${dirty ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          onClick={onSave}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150"
        >
          <MdCheck size={14} /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150"
        >
          <MdClose size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, textarea, readOnly }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-150 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full rounded-xl border px-4 py-3 text-sm transition-all duration-150
            ${readOnly
              ? "border-gray-100 bg-gray-50 text-gray-400 cursor-default"
              : "border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            }`}
        />
      )}
    </div>
  );
}

// ── Stat pill ──────────────────────────────────────────────────────────────
function StatPill({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5 bg-gray-50 rounded-xl px-4 py-3 flex-1">
      <span className="text-base font-bold text-gray-900">{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{label}</span>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ProfileSettings() {
  const { user }   = mockData;
  const fileRef    = useRef(null);
  const { avatarUrl, updateAvatar } = useAvatar();

  // Profile section
  const initProfile = { name: user.name, summary: "" };
  const [profile,      setProfile]      = useState(initProfile);
  const [savedProfile, setSavedProfile] = useState(initProfile);
  const profileDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);

  // Email section
  const initEmail = { email: user.email };
  const [emailData,  setEmailData]  = useState(initEmail);
  const [savedEmail, setSavedEmail] = useState(initEmail);
  const emailDirty = JSON.stringify(emailData) !== JSON.stringify(savedEmail);

  // Password section
  const initPwd = { current: "", next: "", confirm: "" };
  const [pwd,      setPwd]      = useState(initPwd);
  const [pwdError, setPwdError] = useState("");
  const pwdDirty = pwd.current || pwd.next || pwd.confirm;

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // ── Handlers ──
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    updateAvatar(file);
    showToast("Profile picture updated");
  };

  const saveProfile = () => { setSavedProfile(profile); showToast("Profile info saved"); };
  const saveEmail   = () => { setSavedEmail(emailData);  showToast("Email address saved"); };

  const savePassword = () => {
    if (pwd.next !== pwd.confirm) { setPwdError("New passwords don't match."); return; }
    if (pwd.next.length < 8)      { setPwdError("Password must be at least 8 characters."); return; }
    setPwdError("");
    setPwd(initPwd);
    showToast("Password updated successfully");
  };

  const saveAll = () => {
    setSavedProfile(profile);
    setSavedEmail(emailData);
    showToast("All changes saved");
  };

  const anyDirty = profileDirty || emailDirty || !!pwdDirty;

  // Initials fallback
  const initials = user.name.split(" ").map((n) => n[0]).join("");

  return (
    <div
      className="p-4 md:p-6 lg:p-8 max-w-[1100px] mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Page header ── */}
      <div className="flex flex-col gap-0.5 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">Account</p>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-400">Manage your personal info and account security.</p>
      </div>

      {/* ── Two-column layout on lg+ ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ════════════════════════════════════════
            LEFT COLUMN — avatar card (sticky)
        ════════════════════════════════════════ */}
        <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 flex flex-col gap-4">

          {/* Avatar card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4">

            {/* Avatar with edit button */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex items-center justify-center">
                {avatarUrl
                  ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-3xl font-bold text-gray-500">{initials}</span>
                }
              </div>
              <button
                onClick={() => fileRef.current.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center shadow-md transition-all duration-150"
                aria-label="Change avatar"
              >
                <MdCameraAlt size={15} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>

            {/* Name + role */}
            <div className="flex flex-col items-center gap-0.5 text-center">
              <p className="text-base font-bold text-gray-900">{profile.name || "Your Name"}</p>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-500">
                {user.role}
              </span>
            </div>

            {/* Email */}
            <p className="text-xs text-gray-400 text-center break-all">{emailData.email}</p>

            {/* Upload CTA */}
            <button
              onClick={() => fileRef.current.click()}
              className="w-full text-xs font-semibold text-center text-gray-500 hover:text-orange-500 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl py-2.5 transition-all duration-150 flex items-center justify-center gap-1.5"
            >
              <MdEdit size={13} /> Change photo
            </button>
          </div>

          {/* Stats card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-1">Overview</p>
            <div className="flex gap-2">
              <StatPill label="Projects" value={mockData.stats.totalProjects} />
              <StatPill label="Clients"  value={mockData.stats.activeClients} />
            </div>
            <div className="flex gap-2">
              <StatPill label="Earnings" value={`$${(mockData.stats.earnings / 1000).toFixed(1)}k`} />
              <StatPill label="Goal"     value={`$${(mockData.stats.MonthlyGoal / 1000).toFixed(0)}k`} />
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════
            RIGHT COLUMN — form sections
        ════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* Personal Info */}
          <Section
            title="Personal Info"
            icon={MdPerson}
            dirty={profileDirty}
            onSave={saveProfile}
            onCancel={() => setProfile(savedProfile)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                value={profile.name}
                placeholder="Your full name"
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
              <Field
                label="Role"
                value="Freelancer"
                readOnly
              />
            </div>
            <Field
              label="Profile Summary"
              textarea
              value={profile.summary}
              placeholder="Write a short bio about yourself..."
              onChange={(e) => setProfile((p) => ({ ...p, summary: e.target.value }))}
            />
          </Section>

          {/* Email + Password side by side on wide screens */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Email */}
            <Section
              title="Email Address"
              icon={MdEmail}
              dirty={emailDirty}
              onSave={saveEmail}
              onCancel={() => setEmailData(savedEmail)}
            >
              <Field
                label="Email"
                type="email"
                value={emailData.email}
                placeholder="your@email.com"
                onChange={(e) => setEmailData({ email: e.target.value })}
              />
              <p className="text-[11px] text-gray-400">
                Changing your email will update how you log in.
              </p>
            </Section>

            {/* Password */}
            <Section
              title="Change Password"
              icon={MdLock}
              dirty={!!pwdDirty}
              onSave={savePassword}
              onCancel={() => { setPwd(initPwd); setPwdError(""); }}
            >
              <Field
                label="Current Password"
                type="password"
                value={pwd.current}
                placeholder="Enter current password"
                onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
              />
              <Field
                label="New Password"
                type="password"
                value={pwd.next}
                placeholder="Min. 8 characters"
                onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
              />
              <Field
                label="Confirm New Password"
                type="password"
                value={pwd.confirm}
                placeholder="Repeat new password"
                onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
              />
              {pwdError && (
                <p className="text-xs font-medium text-red-500">{pwdError}</p>
              )}
            </Section>

          </div>

          {/* Global save */}
          <div className={`flex justify-end transition-opacity duration-200 ${anyDirty ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <button
              onClick={saveAll}
              className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-sm transition-all duration-150"
            >
              Save all changes
            </button>
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}