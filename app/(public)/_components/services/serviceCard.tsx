'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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

interface ServiceCardProps {
    service: Service
    technician?: {
        name: string
        experience: string
        specialty: string
        image?: string
    }
    userRole?: string
    isLoggedIn?: boolean
    onSeeMore: () => void
}

export default function ServiceCard({
    service,
    userRole = 'GUEST',
    isLoggedIn = false,
    onSeeMore,
}: ServiceCardProps) {
    const [showAlert, setShowAlert] = useState(false)

    // Truncate description to 250 characters
    const truncatedDescription =
        service.description.length > 80
            ? service.description.substring(0, 80) + '...'
            : service.description

    const ratingNumber = parseFloat(service.rating)

    const handleBookService = () => {
        if (!isLoggedIn || userRole !== 'CUSTOMER') {
            setShowAlert(true)
            return
        }
        // Add booking logic here
        console.log('Booking service:', service.id)
    }

    return (
        <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
            {/* Header with Title and Price */}
            <div className="p-4 border-b border-border">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground flex-1">
                        {service.title}
                    </h3>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₹{service.price}</p>
                        <p className="text-xs text-muted-foreground">{service.duration} min</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">
                            {ratingNumber}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="p-4 border-b border-border">
                <p className="text-sm text-gray-700 dark:text-muted-foreground leading-relaxed">
                    {truncatedDescription}
                </p>
                <button
                    onClick={onSeeMore}
                    className="text-sm text-primary hover:underline mt-2 font-medium"
                >
                    See more →
                </button>
            </div>

            {/* Location and Technician Info */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-muted-foreground mb-3">
                    <span>📍</span>
                    <span>{service.location}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex gap-3">
                <Link href={`/technicians/${service.technicianId}`}>
                    <Button
                        variant="outline"
                        className="flex-1"
                    >
                        Technician Details
                    </Button>
                </Link>
                {userRole === "CUSTOMER" && <Link href={`/bookings/${service.id}`}>
                    <Button
                        onClick={handleBookService}
                        className="flex-1"
                    >
                        Book Service
                    </Button>
                </Link>}

            </div>

            {/* Alert Message */}
            {showAlert && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Login Required
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Please login as a customer to book this service.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowAlert(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Close
                            </Button>
                            <Button className="flex-1">
                                Login as Customer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
