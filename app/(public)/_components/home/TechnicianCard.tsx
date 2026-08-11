import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TechnicianCardProps {
    technician: {
        id: string;
        experience: number;
        averageRating: string;
        totalReviews: number;
        isAvailable: boolean;
        verified: boolean;
        user: {
            name: string;
            city: string;
            imageUrl: string | null;
        };
    };
}

export default function TechnicianCard({
    technician,
}: TechnicianCardProps) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">

                    <Image
                        src={technician.user.imageUrl || "/dummy.jpg"}
                        alt={technician.user.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover"
                        unoptimized
                    />

                    <div className="mb-2 flex items-center gap-1">
                        <h3 className="text-lg font-semibold">
                            {technician.user.name}
                        </h3>

                        {technician.verified && (
                            <BadgeCheck className="h-4 w-4 text-blue-500" />
                        )}
                    </div>

                    <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {technician.user.city}
                    </p>

                    <div className="mb-4 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                            {technician.averageRating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            ({technician.totalReviews})
                        </span>
                    </div>

                    <p className="mb-5 text-sm text-muted-foreground">
                        {technician.experience} years experience
                    </p>

                    <Button
                        asChild
                        className="w-full"
                    >
                        <Link href={`/technicians/${technician.id}`}>
                            View Profile
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}