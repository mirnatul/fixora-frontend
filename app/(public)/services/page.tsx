import { getMe } from "@/service/getMe";
import { getAllServices } from "../_actions/getAllServices"
import ServicesGrid from "../_components/services/serviceGrid"

export default async function Home() {
    const SERVICES_DATA = await getAllServices();
    const result = await getMe();
    const { role } = result.data.profile;
    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-foreground">Service Directory</h1>
                    <p className="text-gray-700 dark:text-muted-foreground mt-2">
                        Browse professional services in your area
                    </p>
                </div>
            </div>

            {/* Grid Container */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <ServicesGrid
                    services={SERVICES_DATA.data.services}
                    userRole={role}
                    isLoggedIn={true}
                />
            </div>
        </main>
    )
}
