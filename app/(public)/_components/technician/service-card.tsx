"use client";

import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
    service: {
        id: string;
        title: string;
        description: string;
        price: number;
        duration: number;
        location: string;
        rating: string;
        category: {
            id: string;
            name: string;
        };
    };
    userRole?: string;
}


export function ServiceCard({ service, userRole }: ServiceCardProps) {
    const ratingValue = Number(service.rating);
    const hasRating = !Number.isNaN(ratingValue) && ratingValue > 0;

    return (
        <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">
                        {service.title}
                    </h3>

                    <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {service.category.name}
                    </span>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {service.description}
                    </p>
                </div>

                <div className="text-left md:text-right">
                    <p className="text-3xl font-bold text-primary">
                        ৳{service.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Per service
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-5 border-t pt-5 text-sm">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration} min</span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{service.location}</span>
                </div>

                {hasRating && (
                    <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{ratingValue.toFixed(1)}</span>
                    </div>
                )}
            </div>


            {userRole === "CUSTOMER" && <Link href={`/bookings/${service.id}`}>
                <Button
                    className="flex-1 mt-4 w-full"
                >
                    Book Service
                </Button>
            </Link>}
        </div>
    );
}