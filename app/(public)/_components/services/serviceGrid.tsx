'use client'

import { useState } from 'react'
import ServiceCard from './serviceCard'
import DescriptionModal from './descriptionModel'
import Pagination from './Pagination'

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

interface Meta {
    page: number
    limit: number
    total: number
    totalPage: number
}

interface ServicesGridProps {
    services: Service[]
    meta: Meta
    userRole: string
    isLoggedIn: boolean
}

export default function ServicesGrid({
    services,
    meta,
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services
                    .filter((service) => service.active)
                    .map((service) => (
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
                    ))}
            </div>

            {selectedDescription && (
                <DescriptionModal
                    title={selectedDescription.title}
                    description={selectedDescription.description}
                    onClose={() => setSelectedDescription(null)}
                />
            )}

            {meta.totalPage > 1 && (
                <div className="mt-10 flex justify-center">
                    <Pagination
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                    />
                </div>
            )}
        </>
    )
}