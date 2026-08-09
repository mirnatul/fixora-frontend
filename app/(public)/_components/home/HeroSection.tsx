"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";
import Feature from "./Feature";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Award, LayoutDashboard, LocateIcon, MapPin, ShieldCheck, ShieldCheckIcon, UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";



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

        <div className="relative min-h-screen bg-green-50">
            <div
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 shadow-md backdrop-blur-md"
                    : "bg-transparent"
                    }`}
            >
                <Navbar user={user} />
            </div>

            {/* Hero */}
            <section className="min-h-screen">
                <div className="grid min-h-screen lg:grid-cols-[60%_40%] overflow-visible">
                    <div className="
                        min-h-[calc(100vh-80px)]
                        flex
                        items-center
                        pl-5
                        lg:pl-8
                        xl:pl-36
                    ">
                        <div className="max-w-full space-y-8">
                            <div>
                                {/* Trust badge */}
                                <div>
                                    <span
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-sm
                                            border
                                            shadow-sm
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-[#007A55]
                                            mb-6
                                    ">
                                        <ShieldCheck></ShieldCheck> Trusted Home Services, Just a Click Away
                                    </span>
                                </div>


                                {/* Heading */}
                                <div className="space-y-4">

                                    <h1
                                        className="text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 lg:text-6xl mb-4">
                                        Find Trusted Experts.
                                        <br />

                                        <span className="text-[#007A55]">
                                            Get Things Done.
                                        </span>
                                    </h1>
                                    <p
                                        className="max-w-xl text-md leading-8 text-muted-foreground mb-6">
                                        From home repairs to cleaning, Fixora connects you with
                                        verified professionals who get the job done right.
                                    </p>
                                </div>

                                {/* Search Booking Box */}
                                <div
                                    className="
                                        flex
                                        items-center
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
                                        max-w-3xl
                                        space-x-20
                                ">

                                    {/* Location */}
                                    <div className="flex items-center gap-4">
                                        <MapPin color="green" size={24}></MapPin>
                                        <div>
                                            <p className="text-sm text-muted-foreground pl-1">

                                                Your Location
                                            </p>
                                            <select
                                                className=" mt-1 w-full bg-transparent text-md font-medium outline-none">
                                                <option>
                                                    Dhanmondi, Dhaka
                                                </option>
                                                <option>
                                                    Dhaka
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div className="flex items-center gap-4">
                                        <LayoutDashboard color="green" size={24}></LayoutDashboard>
                                        <div>
                                            <p className="text-sm text-muted-foreground pl-1">
                                                Select Service
                                            </p>
                                            <select
                                                className=" mt-1 w-full bg-transparent text-md font-medium outline-none">
                                                <option>
                                                    Plumbing, ...
                                                </option>
                                                <option>
                                                    Plumbing
                                                </option>
                                                <option>
                                                    Cleaning
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <Button
                                        size="lg"
                                        className=" rounded-lg bg-[#007A55] p-8 hover:bg-[#006044] cursor-pointer">
                                        Book Now
                                        <ArrowRight></ArrowRight>
                                    </Button>

                                </div>

                                {/* Features */}
                                <div
                                    className="grid grid-cols-4 gap-x-5 gap-y-5 my-12">
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

                                {/* Customer Trust */}
                                {/* <div
                                    className="flex items-center gap-6 rounded-2xl bg-white/50 p-3 backdrop-blur-sm">

                                    <div className="flex -space-x-3">

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-4.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-5.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-6.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-7.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                flex-col
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#05a071]
                                                text-white
                                                shadow-md
                                        ">
                                            <span className="font-bold">
                                                4.8
                                            </span>
                                            <span className="text-xs">
                                                ⭐
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                4.8/5 from 1200+ customers
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Your satisfaction is our priority
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* Left: Content */}




                    {/* Right: Image */}
                    <div className="relative min-h-screen overflow-visible">
                        <Image
                            src="/images/banner-images/hero-image-2.png"
                            alt="Home service professionals"
                            fill
                            className="object-contain object-right"
                            unoptimized
                            priority
                        />
                        <div>
                            {/* <Image
                                src="/images/banner-images/ac-repair.png"
                                alt="Home service professionals"
                                width={24}
                                height={24}
                                className="w-34 absolute left-[-3%] top-[10%]"
                                unoptimized
                                priority
                            /> */}
                            <div className="absolute left-[14%] top-[13%] bg-white shadow-md rounded-xl flex flex-col px-4 py-2">
                                <div
                                    className="flex items-center gap-2 rounded-2xl bg-white/50 p-3 backdrop-blur-sm">

                                    {/* avatars */}
                                    <div className="flex -space-x-3">
                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-1.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-2.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>

                                        <Avatar className="h-11 w-11 border-2 border-white">
                                            <AvatarImage src="/images/user/user-3.jpg" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    {/* Rating */}
                                    <div className="">
                                        <span className="font-bold">
                                            4.8 ⭐
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground ml-5">
                                        1200+ Happy Customers
                                    </p>
                                </div>
                            </div>
                            <Image
                                src="/images/banner-images/plumbing.png"
                                alt="Home service professionals"
                                width={24}
                                height={24}
                                className="w-58 absolute left-[-13%] top-[25%]"
                                unoptimized
                                priority
                            />
                            <Image
                                src="/images/banner-images/home-cleaning.png"
                                alt="Home service professionals"
                                width={24}
                                height={24}
                                className="w-52 absolute left-[0%] top-[55%]"
                                unoptimized
                                priority
                            />

                            <div className="absolute left-[10%] top-[85%] flex items-center gap-4 rounded-xl bg-white px-8 py-6 shadow-lg">

                                <div className="flex gap-2 max-w-54">
                                    {/* Man icon */}
                                    <div
                                        className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8FFF7] text-[#007A55] text-2xl">

                                        <ShieldCheckIcon className="h-5 w-5 text-[#007A55]" />
                                    </div>
                                    {/* Text */}
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            100% Safe & Secure
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Your data and payments are always protected.
                                        </p>
                                    </div>
                                </div>

                                <div className="h-20 border-l border-dashed border-gray-300" />

                                <div className="flex gap-2 max-w-54">
                                    {/* Man icon */}
                                    <div
                                        className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8FFF7] text-[#007A55] text-2xl">

                                        <Award className="h-5 w-5 text-[#007A55]" />
                                    </div>
                                    {/* Text */}
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            Best Price Guranted
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Get the best qualilty service at the best price.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}