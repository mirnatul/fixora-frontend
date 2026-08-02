import { getDashboardStats } from "./_actions/getDashboardStats";
import TechnicianDashboard from "./_components/TechnicianDashboard";


const TechnicianDashboardPage = async () => {
    const { data } = await getDashboardStats();

    return (
        <div className="container mx-auto py-6">
            <TechnicianDashboard data={data} />
        </div>
    );
};

export default TechnicianDashboardPage;