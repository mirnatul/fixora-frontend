import Link from "next/link";

import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";

export interface IService {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    rating: string;
    active: boolean;
    technicianId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

interface TopServicesProps {
    topServices: IService[];
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN"
}

export default function TopServices({
    topServices, role
}: TopServicesProps) {
    return (
        <section className="container py-16 mx-auto px-2">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">
                        Top Services
                    </h2>

                    <p className="text-muted-foreground">
                        Most popular services chosen by customers
                    </p>
                </div>

                <Button
                    variant="outline"
                    asChild
                >
                    <Link href="/services">
                        View All
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {topServices.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        role={role}
                    />
                ))}
            </div>
        </section>
    );
}