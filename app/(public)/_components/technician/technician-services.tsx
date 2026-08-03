import { ServiceCard } from "./service-card";

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    rating: string;
    active: boolean;
    category: {
        id: string;
        name: string;
    };
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    customer: {
        id: string;
        name: string;
        profileImage: string;
    };
}

interface TechnicianReviewsProps {
    services?: Service[] | null;
    reviews?: Review[] | null;
    userRole?: string
}

export function TechnicianServices({ services, userRole }: TechnicianReviewsProps) {
    const serviceList = services ?? [];

    const activeServices = serviceList.filter((service) => service.active);
    const inactiveCount = serviceList.filter((service) => !service.active).length;



    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Services</h2>
                <p className="mt-2 text-muted-foreground">
                    {activeServices.length} active service
                    {activeServices.length !== 1 ? "s" : ""} available
                </p>
            </div>

            {activeServices.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                    <h3 className="text-lg font-semibold text-foreground">
                        No services available
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        This technician hasn't added any active services yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {activeServices.map((service) => (
                        <ServiceCard key={service.id} service={service} userRole={userRole} />
                    ))}
                </div>
            )}

            {inactiveCount > 0 && (
                <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                        {inactiveCount} inactive service
                        {inactiveCount !== 1 ? "s are" : " is"} hidden from customers.
                    </p>
                </div>
            )}
        </section>
    );
}