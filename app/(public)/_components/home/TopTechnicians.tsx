import Link from "next/link";

import { Button } from "@/components/ui/button";
import TechnicianCard from "./TechnicianCard";

interface ITechnician {
    id: string;
    bio: string | null;
    experience: number;
    averageRating: string;
    totalReviews: number;
    isAvailable: boolean;
    verified: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
        phone: string;
        city: string;
        imageUrl: string | null;
    };
}

interface TopTechniciansProps {
    topTechnicians: ITechnician[];
}

export default function TopTechnicians({
    topTechnicians,
}: TopTechniciansProps) {

    console.log("TopTechnicians PROP:", topTechnicians);
    console.log("Is array:", Array.isArray(topTechnicians));

    return (
        <section className="container py-16 mx-auto px-2">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">
                        Top Technicians
                    </h2>

                    <p className="text-muted-foreground">
                        Highly rated professionals
                    </p>
                </div>

                <Button
                    variant="outline"
                    asChild
                >
                    <Link href="/technicians">
                        View All
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                {topTechnicians.map((technician) => (
                    <TechnicianCard
                        key={technician.id}
                        technician={technician}
                    />
                ))}
            </div>
        </section>
    );
}