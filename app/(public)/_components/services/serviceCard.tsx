"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
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
    location: string;
    rating: string;
    active: boolean;
    technicianId: string;
    categoryId: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface ServiceCardProps {
    service: IService;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    onSeeMore?: () => void;
}

export default function ServiceCard({
    service,
    role,
    onSeeMore,
}: ServiceCardProps) {
    const imageUrl =
        service.imageUrl?.trim() ||
        "/images/service-placeholder.jpg";

    const truncatedDescription =
        service.description.length > 80
            ? service.description.substring(0, 80) + "..."
            : service.description;

    return (
        <Card
            className="
                group relative flex h-full min-h-[430px]
                flex-col overflow-hidden
                rounded-sm
                border border-border/60
                bg-background
                shadow-sm
                transition-all duration-500 ease-out
                hover:-translate-y-1.5
                hover:border-[#007A55]/30
                hover:shadow-[0_20px_45px_-18px_rgba(0,122,85,0.30)]
            "
        >
            {/* IMAGE */}
            <div className="bg-white p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-md">
                    <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        unoptimized
                        className="
                            object-cover
                            transition-transform duration-700 ease-out
                            group-hover:scale-[1.06]
                        "
                        sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1280px) 50vw,
                            25vw
                        "
                    />

                    {/* Gradient */}
                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/55
                            via-black/5
                            to-transparent
                        "
                    />

                    {/* Rating */}
                    <div
                        className="
                            absolute bottom-3 left-3
                            inline-flex items-center gap-1.5
                            rounded-full
                            border border-white/20
                            bg-black/45
                            px-3 py-1.5
                            text-xs font-semibold text-white
                            shadow-lg
                            backdrop-blur-md
                        "
                    >
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

                        <span>
                            {service.rating || "0"}
                        </span>
                    </div>

                    {/* Active Status */}
                    <div
                        className="
                            absolute right-3 top-3
                            flex items-center gap-1.5
                            rounded-full
                            border border-white/30
                            bg-white/90
                            px-2.5 py-1.5
                            text-xs font-semibold
                            text-[#007A55]
                            shadow-md
                            backdrop-blur-md
                        "
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />

                        Available
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <CardContent className="flex flex-1 flex-col p-4">

                {/* TITLE */}
                <h3
                    className="
                        line-clamp-2
                        min-h-[48px]
                        text-lg font-bold
                        leading-6 tracking-tight
                        text-foreground
                        transition-colors duration-300
                        group-hover:text-[#007A55]
                    "
                >
                    {service.title}
                </h3>

                {/* DESCRIPTION */}
                <div className="mt-2 min-h-[40px]">
                    <p
                        className="
                            line-clamp-2
                            text-sm
                            leading-5
                            text-muted-foreground
                        "
                    >
                        {truncatedDescription}
                    </p>

                    {service.description.length > 80 && (
                        <button
                            type="button"
                            onClick={onSeeMore}
                            className="
                                mt-1
                                text-sm
                                font-medium
                                text-[#007A55]
                                hover:underline
                            "
                        >
                            See more →
                        </button>
                    )}
                </div>

                {/* LOCATION */}
                <div
                    className="
                        mt-4
                        flex min-w-0
                        items-center gap-2
                        text-sm text-muted-foreground
                    "
                >
                    <div
                        className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-[#007A55]/10
                            text-[#007A55]
                        "
                    >
                        <MapPin className="h-3.5 w-3.5" />
                    </div>

                    <span className="truncate">
                        {service.location}
                    </span>
                </div>

                {/* PRICE */}
                <div
                    className="
                        mt-4
                        flex items-center justify-between
                        rounded-md
                        border border-[#007A55]/10
                        bg-[#007A55]/5
                        px-4 py-3
                    "
                >
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Starting from
                        </p>

                        <div className="mt-0.5 flex items-baseline">
                            <span className="mr-0.5 text-sm font-semibold text-[#007A55]">
                                ৳
                            </span>

                            <span className="text-xl font-bold tracking-tight">
                                {service.price}
                            </span>
                        </div>
                    </div>

                    <span className="text-xs text-muted-foreground">
                        per hour
                    </span>
                </div>

                {/* ACTIONS */}
                <div
                    className="
                        mt-auto
                        border-t border-border/70
                        pt-4
                    "
                >
                    <div className="grid grid-cols-2 gap-2">

                        {/* Technician Details */}
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="
                                h-10
                                rounded-sm
                                border-border
                                px-2
                                text-xs
                                font-semibold
                                transition-all duration-300
                                hover:border-[#007A55]/40
                                hover:bg-[#007A55]/5
                                hover:text-[#007A55]
                            "
                        >
                            <Link
                                href={`/technicians/${service.technicianId}`}
                            >
                                Technician Details
                            </Link>
                        </Button>

                        {/* Book Now */}
                        {role === "CUSTOMER" ? (
                            <Button
                                asChild
                                size="sm"
                                className="
                                    group/button
                                    h-10
                                    rounded-sm
                                    bg-[#007A55]
                                    px-2
                                    text-xs
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    shadow-[#007A55]/20
                                    transition-all duration-300
                                    hover:bg-[#006647]
                                    hover:shadow-md
                                    hover:shadow-[#007A55]/30
                                "
                            >
                                <Link
                                    href={`/bookings?serviceId=${service.id}`}
                                >
                                    Book Now

                                    <ArrowUpRight
                                        className="
                                            ml-1
                                            h-4 w-4
                                            transition-transform
                                            duration-300
                                            group-hover/button:-translate-y-0.5
                                            group-hover/button:translate-x-0.5
                                        "
                                    />
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                asChild
                                size="sm"
                                className="
                                    h-10
                                    rounded-sm
                                    bg-[#007A55]
                                    px-2
                                    text-xs
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    shadow-[#007A55]/20
                                    transition-all duration-300
                                    hover:bg-[#006647]
                                    hover:shadow-md
                                    hover:shadow-[#007A55]/30
                                "
                            >
                                <Link href="/login">
                                    Login as Customer
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}