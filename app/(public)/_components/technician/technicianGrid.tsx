"use client";

import { TechnicianCard } from "./technicianCard";

interface Technician {
    id: string;
    averageRating: string;
    totalReviews: number;
    experience: number;
    verified: boolean;
    user: {
        name: string;
        email: string;
        phone: string;
        city: string;
        profileImage: string | null;
    };
}

interface TechnicianGridProps {
    technicians: Technician[];
}

export function TechnicianGrid({
    technicians,
}: TechnicianGridProps) {
    if (technicians.length === 0) {
        return (
            <p className="text-center text-muted-foreground">
                No technicians found.
            </p>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technicians.map((technician) => (
                <TechnicianCard
                    key={technician.id}
                    technician={technician}
                />
            ))}
        </div>
    );
}