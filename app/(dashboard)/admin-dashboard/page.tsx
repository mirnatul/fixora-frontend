import { getDashboardStats } from "./_actions/getDashboardStats";
import DashboardStats from "./_components/DashboardStats";

export default async function AdminDashboardPage() {
    const dashboardStats = await getDashboardStats();

    return (
        <div className="space-y-8 p-6">

            <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Global overview of platform health and activity.
                </p>
            </div>

            <DashboardStats stats={dashboardStats.data} />

        </div>
    );
}