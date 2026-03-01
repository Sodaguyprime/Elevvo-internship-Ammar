import { useState, useRef } from "react";
import mockData from "../data/MockData.json";
import { MdEdit, MdCheck, MdClose, MdCameraAlt, MdLock, MdPerson, MdEmail } from "react-icons/md";
import { useAvatar } from "../context/AvatarContext";
// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white text-sm font-medium px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in">
      <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
        <MdCheck size={13} className="text-white" />
      </span>
      {message}
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white transition-colors">
        <MdClose size={16} />
      </button>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
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

      {/* Per-section save/cancel */}
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
function Field({ label, type = "text", value, onChange, placeholder, textarea }) {
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
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-150"
        />
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ProfileSettings() {
  const { user } = mockData;
  const fileRef  = useRef(null);
const { avatarUrl, updateAvatar } = useAvatar();
  // Avatar
  const [avatar,    setAvatar]    = useState(null);

  // Profile section
  const initProfile = { name: user.name, summary: "" };
  const [profile,   setProfile]   = useState(initProfile);
  const [savedProfile, setSavedProfile] = useState(initProfile);
  const profileDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);

  // Email section
  const initEmail = { email: user.email };
  const [emailData,   setEmailData]   = useState(initEmail);
  const [savedEmail,  setSavedEmail]  = useState(initEmail);
  const emailDirty = JSON.stringify(emailData) !== JSON.stringify(savedEmail);

  // Password section
  const initPwd = { current: "", next: "", confirm: "" };
  const [pwd,       setPwd]       = useState(initPwd);
  const [pwdError,  setPwdError]  = useState("");
  const pwdDirty = pwd.current || pwd.next || pwd.confirm;

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Handlers ──
 const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  updateAvatar(file);         // updates context → all components re-render
  showToast("Profile picture updated");
};

  const saveProfile = () => {
    setSavedProfile(profile);
    showToast("Profile info saved");
  };

  const saveEmail = () => {
    setSavedEmail(emailData);
    showToast("Email address saved");
  };

  const savePassword = () => {
    if (pwd.next !== pwd.confirm) {
      setPwdError("New passwords don't match.");
      return;
    }
    if (pwd.next.length < 8) {
      setPwdError("Password must be at least 8 characters.");
      return;
    }
    setPwdError("");
    setPwd(initPwd);
    showToast("Password updated successfully");
  };

  // ── Global save ──
  const saveAll = () => {
    setSavedProfile(profile);
    setSavedEmail(emailData);
    showToast("All changes saved");
  };

  const anyDirty = profileDirty || emailDirty || !!(pwd.current || pwd.next || pwd.confirm);

  return (
    <div
      className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[760px] mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Page header ── */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">Account</p>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-400">Manage your personal info and account security.</p>
      </div>

      {/* ── Avatar ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex items-center justify-center">
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-2xl font-bold text-gray-500">
                  {user.name.split(" ").map((n) => n[0]).join("")}
                </span>
            }
          </div>
          <button
            onClick={() => fileRef.current.click()}
            className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center shadow-md transition-all duration-150"
            aria-label="Change avatar"
          >
            <MdCameraAlt size={14} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-gray-900">{profile.name || "Your Name"}</p>
          <p className="text-xs text-gray-400">{emailData.email || "your@email.com"}</p>
          <button
            onClick={() => fileRef.current.click()}
            className="mt-2 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors text-left"
          >
            Upload new photo →
          </button>
        </div>
      </div>

      {/* ── Profile info ── */}
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
            placeholder="Your role"
            onChange={() => {}}
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

      {/* ── Email ── */}
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

      {/* ── Password ── */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
        {pwdError && (
          <p className="text-xs font-medium text-red-500">{pwdError}</p>
        )}
      </Section>

      {/* ── Global save ── */}
      <div className={`flex justify-end transition-opacity duration-200 ${anyDirty ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          onClick={saveAll}
          className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-sm transition-all duration-150"
        >
          Save all changes
        </button>
      </div>

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}