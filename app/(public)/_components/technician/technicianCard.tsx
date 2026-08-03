"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";

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

interface TechnicianCardProps {
    technician: Technician;
}

export function TechnicianCard({
    technician,
}: TechnicianCardProps) {
    return (
        <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-4">
                {technician.user.profileImage ? (
                    <Image
                        src={technician.user.profileImage || "/dummy.jpg"}
                        alt={technician.user.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                        {technician.user.name.charAt(0).toUpperCase()}
                    </div>
                )}

                <div>
                    <h3 className="font-semibold">
                        {technician.user.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {technician.user.city}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {technician.experience} years experience
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                <span>
                    {Number(technician.averageRating).toFixed(1)}
                </span>

                <span className="text-sm text-muted-foreground">
                    ({technician.totalReviews} reviews)
                </span>
            </div>

            <Link
                href={`/technicians/${technician.id}`}
                className="mt-6 inline-flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
                View Details
            </Link>
        </div>
    );
}