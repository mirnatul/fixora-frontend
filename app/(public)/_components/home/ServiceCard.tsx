import Link from "next/link";
import {
    Clock3,
    MapPin,
    Star,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IService {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    rating: string;
}

interface ServiceCardProps {
    service: IService;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN"
}

export default function ServiceCard({
    service, role
}: ServiceCardProps) {
    return (
        <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        Service
                    </span>

                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{service.rating}</span>
                    </div>
                </div>

                <h3 className="mb-3 line-clamp-2 text-xl font-semibold">
                    {service.title}
                </h3>

                <p className="mb-6 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {service.description}
                </p>

                <div className="mb-6 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        <span>{service.duration} mins</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{service.location}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Starting from
                        </p>

                        <p className="text-2xl font-bold text-primary">
                            ৳{service.price}
                        </p>
                    </div>

                    {role === "CUSTOMER" ? (
                        <Button asChild>
                            <Link href={`/booking?serviceId=${service.id}`}>
                                Book Now
                            </Link>
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>
                            Login as Customer
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}