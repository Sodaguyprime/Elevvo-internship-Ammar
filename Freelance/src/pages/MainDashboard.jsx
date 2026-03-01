import mockData from '../data/MockData.json';
import EarningsGoalsChart  from '../components/DashboardComponents/EarningsGoalsChart';
import OngoingProjects     from '../components/DashboardComponents/OngoingProjects';
import Quotes              from '../components/DashboardComponents/Quotes';
import RecentActivity      from '../components/DashboardComponents/RecentActivity';
import Growth              from '../components/DashboardComponents/Growth';

const MainDashboard = () => {
  const { user } = mockData;

  return (
    <div
      className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Welcome ── */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          Dashboard
        </p>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-gray-400">
          Here's what's happening with your freelance business today.
        </p>
      </div>

      {/* ── Row 1: Earnings | Client Growth | Quote ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        <EarningsGoalsChart />
        <Growth />
        <Quotes />
      </div>

      {/* ── Row 2: Ongoing Projects | Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col h-full">
          <OngoingProjects />
        </div>
        <div className="flex flex-col h-full">
          <RecentActivity />
        </div>
      </div>

    </div>
  );
};

export default MainDashboard;