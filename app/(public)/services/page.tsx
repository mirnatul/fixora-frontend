import { getMe } from "@/service/getMe";
import { getAllServices } from "../_actions/getAllServices";
import ServicesGrid from "../_components/services/serviceGrid";
import ServiceFilters from "../_components/services/ServiceFilters";

type HomeProps = {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        searchTerm?: string;
        categoryId?: string;
        minPrice?: string;
        maxPrice?: string;
        rating?: string;
        sort?: string;
    }>;
};

export default async function Home({ searchParams }: HomeProps) {
    const query = await searchParams;

    // console.log(query);

    const [SERVICES_DATA, me] = await Promise.all([
        getAllServices(query),
        getMe(),
    ]);

    const { role } = me.data.profile;

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-foreground">
                        Service Directory
                    </h1>
                    <p className="text-gray-700 dark:text-muted-foreground mt-2">
                        Browse professional services in your area
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Filters */}
                <ServiceFilters />

                {/* Services */}
                <ServicesGrid
                    services={SERVICES_DATA.data.services}
                    meta={SERVICES_DATA.data.meta}
                    userRole={role}
                    isLoggedIn
                />
            </div>
        </main>
    );
}