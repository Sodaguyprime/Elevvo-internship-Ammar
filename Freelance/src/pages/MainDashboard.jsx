import MockData from '../data/MockData';
import EarningsGoalsChart from '../components/DashboardComponents/EarningsGoalsChart';
import OngoingProjects from '../components/DashboardComponents/OngoingProjects';
const MainDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Main Dashboard</h1>
            <p className="text-gray-600 mt-2"> Total Projects: {MockData.stats.totalProjects}</p>
            <p className="text-gray-600 mt-1"> Monthly Goal: ${MockData.stats.MonthlyGoal}</p>
            <p className="text-gray-600 mt-1"> Active Clients: {MockData.stats.activeClients}</p>
            <p className="text-gray-600 mt-1"> Earnings This Month: ${MockData.stats.earnings}</p>
            <EarningsGoalsChart />
            <OngoingProjects />
        </div>
    )
}   
export default MainDashboard;