import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    ShieldCheck,
    Sparkles,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TechnicianCard from "./TechnicianCard";

interface ITechnician {
    id: string;
    bio: string | null;
    experience: number;
    averageRating: string;
    totalReviews: number;
    isAvailable: boolean;
    verified: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
        phone: string;
        city: string;
        imageUrl: string | null;
    };
}

interface TopTechniciansProps {
    topTechnicians: ITechnician[];
}

export default function TopTechnicians({
    topTechnicians,
}: TopTechniciansProps) {
    return (
        <section className="relative overflow-hidden bg-muted/30 py-20">
            {/* Background decorations */}
            <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

            <div className="container relative mx-auto px-4">
                {/* Header */}
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                            <Sparkles className="h-4 w-4" />
                            Trusted Professionals
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Meet our top{" "}
                            <span className="text-primary">
                                technicians
                            </span>
                        </h2>

                        <p className="mt-4 text-base leading-7 text-muted-foreground">
                            Connect with highly-rated, verified professionals
                            who are ready to provide reliable service at your
                            doorstep.
                        </p>
                    </div>

                    {/* CTA */}
                    <Button
                        size="lg"
                        asChild
                        className="group w-fit bg-[#007A55] px-6 text-white shadow-lg shadow-[#007A55]/20 transition-all duration-300 hover:bg-[#006647] hover:shadow-xl hover:shadow-[#007A55]/30"
                    >
                        <Link href="/technicians">
                            Explore All Technicians
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                {/* Trust indicators */}
                <div className="mb-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Star className="h-4 w-4 fill-current" />
                        </div>

                        <span>
                            <span className="font-semibold text-foreground">
                                Top-rated
                            </span>{" "}
                            professionals
                        </span>
                    </div>

                    <div className="hidden h-5 w-px bg-border sm:block" />

                    <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />

                        <span>
                            <strong className="text-foreground">
                                Verified
                            </strong>{" "}
                            technicians
                        </span>
                    </div>

                    <div className="hidden h-5 w-px bg-border sm:block" />

                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />

                        <span>
                            <strong className="text-foreground">
                                Reliable & secure
                            </strong>{" "}
                            service
                        </span>
                    </div>
                </div>

                {/* Technicians */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {topTechnicians?.slice(0, 8).map((technician, index) => (
                        <div
                            key={technician.id}
                            className="animate-in fade-in slide-in-from-bottom-4"
                            style={{
                                animationDelay: `${index * 70}ms`,
                                animationFillMode: "both",
                            }}
                        >
                            <TechnicianCard technician={technician} />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 flex justify-center">
                    <Button
                        variant="ghost"
                        asChild
                        className="group text-primary hover:bg-primary/5 hover:text-primary"
                    >
                        <Link href="/technicians">
                            View all technicians
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}