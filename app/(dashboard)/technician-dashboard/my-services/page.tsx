import { getMe } from "@/service/getMe";
import { getTechnicianServices } from "../_actions/getTechnicianServices";
import ServicesGrid from "../_components/services/serviceGrid";
import { getCategories } from "../_actions/getCategories";
import CreateServiceDialog from "../_components/services/CreateServiceDialog";

export default async function MyServicePage() {
    const me = await getMe();
    const userId = me?.data?.profile?.id ?? null;

    const services = await getTechnicianServices(userId);
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-background">

            {/* Header */}
            <div className="bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-foreground">
                            My Services
                        </h1>

                        <p className="text-gray-700 dark:text-muted-foreground mt-2">
                            Browse professional services in your area
                        </p>
                    </div>
                    <CreateServiceDialog
                        userId={userId}
                        categories={categories.data}
                    />

                </div>
            </div>




            {/* Services */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <ServicesGrid services={services.data} />
            </div>
        </main>
    );
}