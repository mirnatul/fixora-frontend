"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";
import DescriptionModal from "./DescriptionModel";

interface Service {
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

    imageUrl: string | null;
    imagePublicId: string | null;

    createdAt: string;
    updatedAt: string;
}

interface ServicesGridProps {
    services: Service[];
}

export default function ServicesGrid({
    services,
}: ServicesGridProps) {
    const [selectedDescription, setSelectedDescription] =
        useState<{
            id: string;
            title: string;
            description: string;
        } | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onSeeMore={() =>
                            setSelectedDescription({
                                id: service.id,
                                title: service.title,
                                description: service.description,
                            })
                        }
                    />
                ))}
            </div>

            {selectedDescription && (
                <DescriptionModal
                    title={selectedDescription.title}
                    description={selectedDescription.description}
                    onClose={() =>
                        setSelectedDescription(null)
                    }
                />
            )}
        </>
    );
}