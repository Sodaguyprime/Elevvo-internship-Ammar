import mockData from '../data/MockData.json';
import EarningsGoalsChart from '../components/DashboardComponents/EarningsGoalsChart';
import OngoingProjects    from '../components/DashboardComponents/OngoingProjects';
import Quotes             from '../components/DashboardComponents/Quotes';
import RecentActivity     from '../components/DashboardComponents/RecentActivity';
import Growth             from '../components/DashboardComponents/Growth';

/* ── Tiny stat card ─────────────────────────────────────────────────────── */
function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col gap-1 min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
      {sub && (
        <p className={`text-[11px] font-semibold ${accent ? "text-orange-500" : "text-gray-400"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function MainDashboard() {
  const { user, stats } = mockData;

  return (
    <div
      className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Welcome banner ─────────────────────────────────────────── */}
      {/* Desktop: quote sits inline top-right. Mobile: quote below. */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Dashboard</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-gray-400">Here's what's happening with your freelance business today.</p>
        </div>

        {/* Quote: desktop inline top-right, hidden on mobile */}
        <div className="hidden sm:block w-72 flex-shrink-0">
          <Quotes />
        </div>
      </div>

      {/* Quote: mobile only, appears right under the welcome text */}
      <div className="block sm:hidden">
        <Quotes />
      </div>

      {/* ── Stat pills ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Projects" value={stats.totalProjects} sub="All time" />
        <StatCard label="Active Clients"  value={stats.activeClients} sub="This month" accent />
        <StatCard label="Earnings"        value={`$${stats.earnings.toLocaleString()}`} sub="Month to date" accent />
        <StatCard
          label="Monthly Goal"
          value={`$${stats.MonthlyGoal.toLocaleString()}`}
          sub={`${Math.round((stats.earnings / stats.MonthlyGoal) * 100)}% reached`}
          accent
        />
      </div>

      {/* ── Charts row: Earnings gauge + Growth chart ──────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <EarningsGoalsChart />
        <Growth />
      </div>

      {/* ── Projects + Activity row ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <OngoingProjects />
        <RecentActivity />
      </div>

    </div>
  );
}
