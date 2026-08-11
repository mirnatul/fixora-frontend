"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";
import Feature from "./Feature";
import {
    ArrowRight,
    LayoutDashboard,
    MapPin,
    ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export default function HeroSection({ user }: any) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative overflow-hidden bg-green-50">
            {/* Navbar */}
            <div
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 shadow-md backdrop-blur-md"
                    : "bg-transparent"
                    }`}
            >
                <Navbar user={user} />
            </div>

            {/* Hero */}
            <section className="relative">
                <div
                    className="
                        grid
                        min-h-[90vh]
                        xl:min-h-[650px]
                        xl:grid-cols-[60%_40%]
                        2xl:min-h-[750px]
                    "
                >
                    {/* ================= LEFT: CONTENT ================= */}
                    <div
                        className="
        flex
        min-h-[78vh]
        items-center
        px-5
        pt-28
        pb-10

        sm:px-8
        md:px-10

        lg:pl-8
        lg:pt-20

        xl:min-h-[650px]
        xl:pl-20

        2xl:min-h-[750px]
        2xl:pl-36

        3xl:min-h-[850px]
        3xl:pl-44
    "
                    >
                        <div className="w-full max-w-full">
                            {/* Trust badge */}
                            <div className="mb-5">
                                <span
                                    className="
                                        inline-flex
                                        max-w-full
                                        items-center
                                        gap-2
                                        rounded-sm
                                        border
                                        px-3
                                        py-2
                                        text-xs
                                        font-medium
                                        text-[#007A55]
                                        shadow-sm

                                        sm:px-4
                                        sm:text-sm
                                    "
                                >
                                    <ShieldCheck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

                                    <span>
                                        Trusted Home Services, Just a Click
                                        Away
                                    </span>
                                </span>
                            </div>

                            {/* Heading */}
                            <div>
                                <h1
                                    className="
                                        mb-4
                                        text-4xl
                                        font-bold
                                        leading-[1.1]
                                        tracking-tight
                                        text-gray-900

                                        sm:text-5xl
                                        md:text-6xl
                                        lg:text-5xl
                                        xl:text-6xl
                                    "
                                >
                                    Find Trusted Experts.
                                    <br />

                                    <span className="text-[#007A55]">
                                        Get Things Done.
                                    </span>
                                </h1>

                                <p
                                    className="
                                        mb-6
                                        max-w-xl
                                        text-sm
                                        leading-7
                                        text-muted-foreground

                                        sm:text-base
                                        sm:leading-8
                                    "
                                >
                                    From home repairs to cleaning, Fixora
                                    connects you with verified professionals
                                    who get the job done right.
                                </p>
                            </div>

                            {/* Search Booking Box */}
                            <div
                                className="
                                    flex
                                    w-full
                                    max-w-3xl
                                    flex-col
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-gray-100
                                    bg-white
                                    p-4
                                    shadow-xl
                                    shadow-gray-200/40
                                    transition
                                    hover:shadow-2xl

                                    sm:p-5

                                    lg:flex-row
                                    lg:items-center
                                "
                            >
                                {/* Location */}
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        flex-1
                                        items-center
                                        gap-3
                                        border-b
                                        border-gray-100
                                        pb-3

                                        lg:border-b-0
                                        lg:border-r
                                        lg:pb-0
                                        lg:pr-4
                                    "
                                >
                                    <MapPin
                                        className="shrink-0 text-[#007A55]"
                                        size={24}
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="pl-1 text-xs text-muted-foreground sm:text-sm">
                                            Your Location
                                        </p>

                                        <select
                                            className="
                                                mt-1
                                                w-full
                                                truncate
                                                bg-transparent
                                                text-sm
                                                font-medium
                                                outline-none

                                                sm:text-base
                                            "
                                        >
                                            <option>
                                                Dhanmondi, Dhaka
                                            </option>
                                            <option>Dhaka</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Services */}
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        flex-1
                                        items-center
                                        gap-3
                                        border-b
                                        border-gray-100
                                        pb-3

                                        lg:border-b-0
                                        lg:border-r
                                        lg:pb-0
                                        lg:pr-4
                                    "
                                >
                                    <LayoutDashboard
                                        className="shrink-0 text-[#007A55]"
                                        size={24}
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="pl-1 text-xs text-muted-foreground sm:text-sm">
                                            Select Service
                                        </p>

                                        <select
                                            className="
                                                mt-1
                                                w-full
                                                truncate
                                                bg-transparent
                                                text-sm
                                                font-medium
                                                outline-none

                                                sm:text-base
                                            "
                                        >
                                            <option>Plumbing, ...</option>
                                            <option>Plumbing</option>
                                            <option>Cleaning</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Button */}
                                <Button
                                    size="lg"
                                    className="
                                        h-12
                                        w-full
                                        shrink-0
                                        rounded-lg
                                        bg-[#007A55]
                                        px-6
                                        hover:bg-[#006044]

                                        sm:h-14

                                        lg:w-auto
                                        lg:px-8
                                    "
                                >
                                    Book Now
                                    <ArrowRight className="ml-2" />
                                </Button>
                            </div>

                            {/* Features */}
                            <div
                                className="
                                    my-8
                                    grid
                                    grid-cols-2
                                    gap-x-4
                                    gap-y-6

                                    sm:my-10
                                    sm:grid-cols-4
                                    sm:gap-x-5
                                "
                            >
                                <Feature
                                    icon="✓"
                                    title="Verified Professionals"
                                    description="Background checked"
                                />

                                <Feature
                                    icon="★"
                                    title="Quality Service"
                                    description="Satisfaction guaranteed"
                                />

                                <Feature
                                    icon="⏱"
                                    title="On-time Service"
                                    description="Punctual & reliable"
                                />

                                <Feature
                                    icon="☎"
                                    title="24/7 Support"
                                    description="We're here to help"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT: IMAGE ================= */}
                    <div
                        className="
        relative
        hidden
        min-h-[650px]
        w-full
        xl:block

        2xl:min-h-[750px]
    "
                    >
                        {/* Main Image Container */}
                        <div
                            className="
        relative
        h-full
        min-h-[650px]
        w-full
        2xl:min-h-[750px]

    "
                        >
                            {/* Main Hero Image */}
                            <Image
                                src="/images/banner-images/hero-image-2.png"
                                alt="Home service professionals"
                                fill
                                className="object-contain object-right-top"
                                unoptimized
                                priority
                            />

                            {/* ================= RATING CARD ================= */}
                            <div
                                className="
                                    absolute
                                    left-[10%]
                                    top-[20%]
                                    rounded-xl
                                    bg-white
                                    px-4
                                    py-2
                                    shadow-md
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-3">
                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-1.jpg" />
                                            <AvatarFallback>
                                                U
                                            </AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-2.jpg" />
                                            <AvatarFallback>
                                                U
                                            </AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-3.jpg" />
                                            <AvatarFallback>
                                                U
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <span className="text-base font-bold">
                                        4.8 ⭐
                                    </span>
                                </div>

                                <p className="ml-2 mt-1 text-sm text-muted-foreground">
                                    1200+ Happy Customers
                                </p>
                            </div>

                            {/* ================= PLUMBING ================= */}
                            <Image
                                src="/images/banner-images/plumbing.png"
                                alt="Plumbing service"
                                width={230}
                                height={230}
                                className="
                                    absolute
                                    left-[-2%]
                                    top-[38%]
                                    w-44

                                    2xl:left-[-5%]
                                    2xl:top-[35%]
                                    2xl:w-50
                                "
                                unoptimized
                            />

                            {/* ================= CLEANING ================= */}
                            <Image
                                src="/images/banner-images/home-cleaning.png"
                                alt="Home cleaning service"
                                width={230}
                                height={230}
                                className="
                                    absolute
                                    left-[6%]
                                    top-[70%]
                                    w-40

                                    2xl:left-[2%]
                                    2xl:top-[67%]
                                    2xl:w-48
                                "
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}