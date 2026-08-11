
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";

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

interface TopServicesProps {
    topServices: IService[];
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
}

export default function TopServices({
    topServices,
    role,
}: TopServicesProps) {
    return (
        <section className="relative overflow-hidden bg-muted/30 py-20">
            {/* Background decorations */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

            <div className="container relative mx-auto px-4">
                {/* Header */}
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                            <Sparkles className="h-4 w-4" />
                            Popular Services
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Services people{" "}
                            <span className="text-primary">love</span>
                        </h2>

                        <p className="mt-4 text-base leading-7 text-muted-foreground">
                            Discover highly-rated services from trusted
                            technicians and get the help you need.
                        </p>
                    </div>

                    {/* Green CTA */}
                    <Button
                        size="lg"
                        asChild
                        className="group w-fit bg-[#007A55] px-6 text-white shadow-lg shadow-[#007A55]/20 transition-all duration-300 hover:bg-[#006647] hover:shadow-xl hover:shadow-[#007A55]/30"
                    >
                        <Link href="/services">
                            Explore All Services
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                {/* Trust indicators */}
                <div className="mb-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <TrendingUp className="h-4 w-4" />
                        </div>

                        <span>
                            <span className="font-semibold text-foreground">
                                Trending
                            </span>{" "}
                            services
                        </span>
                    </div>

                    <div className="hidden h-5 w-px bg-border sm:block" />

                    <span>
                        <strong className="text-foreground">
                            Top-rated
                        </strong>{" "}
                        technicians
                    </span>

                    <div className="hidden h-5 w-px bg-border sm:block" />

                    <span>
                        <strong className="text-foreground">
                            Easy & secure
                        </strong>{" "}
                        booking
                    </span>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {topServices.slice(0, 8).map((service, index) => (
                        <div
                            key={service.id}
                            className="animate-in fade-in slide-in-from-bottom-4"
                            style={{
                                animationDelay: `${index * 70}ms`,
                                animationFillMode: "both",
                            }}
                        >
                            <ServiceCard
                                service={service}
                                role={role}
                            />
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
                        <Link href="/services">
                            View all available services
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
