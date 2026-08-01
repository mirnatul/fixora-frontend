'use client'

import { useState } from 'react'
import ServiceCard from './serviceCard'
import DescriptionModal from './descriptionModel'

interface Service {
    id: string
    title: string
    description: string
    price: number
    duration: number
    location: string
    rating: string
    active: boolean
    technicianId: string
    categoryId: string
    createdAt: string
    updatedAt: string
}

interface ServicesGridProps {
    services: Service[]
    userRole: string
    isLoggedIn: boolean
}

export default function ServicesGrid({
    services,
    userRole,
    isLoggedIn,
}: ServicesGridProps) {
    const [selectedDescription, setSelectedDescription] = useState<{
        id: string
        title: string
        description: string
    } | null>(null)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.filter(s => s.active).map((service) => {

                    return (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            userRole={userRole}
                            isLoggedIn={isLoggedIn}
                            onSeeMore={() =>
                                setSelectedDescription({
                                    id: service.id,
                                    title: service.title,
                                    description: service.description,
                                })
                            }
                        />
                    )
                })}
            </div>

            {/* Modals */}
            {selectedDescription && (
                <DescriptionModal
                    title={selectedDescription.title}
                    description={selectedDescription.description}
                    onClose={() => setSelectedDescription(null)}
                />
            )}

        </>
    )
}
