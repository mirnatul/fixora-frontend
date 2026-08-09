"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";

import { logout } from "@/service/logout";
import {
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Technicians", href: "/technicians" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Articles", href: "/articles" },
];

const userMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
    { label: "Profile", icon: User, action: "profile" },
    { label: "Settings", icon: Settings, action: "settings" },
];

type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        profile: {
            id: string;
            name: string;
            email: string;
            phone: string;
            profileImage: string;
            address: string;
            city: string;
            stripeCustomerId: string;
            role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
            status: "ACTIVE" | "BANNED";
            createdAt: string;
            updatedAt: string;
            technicianProfile: null | Record<string, unknown>;
        };
    };
};

type NavbarProps = {
    user: IUser;
};

export function Navbar({ user }: NavbarProps) {
    const router = useRouter();

    const handleUserMenuAction = async (action: string) => {
        if (action === "dashboard") {
            const role = user?.data?.profile?.role ?? null;

            if (role === "CUSTOMER") {
                router.push("/customer-dashboard");
            } else if (role === "TECHNICIAN") {
                router.push("/technician-dashboard");
            } else if (role === "ADMIN") {
                router.push("/admin-dashboard");
            }

            return;
        }

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };

    return (
        <nav className="">
            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Fixora Logo"
                            width={60}
                            height={66}
                            className=""
                            unoptimized
                        />

                        <span className="hidden sm:block text-4xl font-bold ml-1">
                            Fixora
                        </span>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>


                    {/* Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-full"
                                    >
                                        <Menu className="h-6! w-6!" />
                                    </Button>
                                </SheetTrigger>

                                <SheetContent
                                    side="left"
                                    className="w-70 px-6"
                                >
                                    {/* Mobile Menu Header */}
                                    <div className="mt-8 mb-8">
                                        <h2 className="text-xl font-bold text-[#007A55]">
                                            Fixora
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Home services, made simple.
                                        </p>
                                    </div>

                                    {/* Navigation */}
                                    <nav className="flex flex-col gap-2">
                                        {navItems.map((item) => (
                                            <SheetClose
                                                asChild
                                                key={item.href}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                                                >
                                                    {item.label}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* User Menu */}
                        {user?.success ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className="cursor-pointer rounded-full p-1 transition-colors hover:bg-muted focus:outline-none"
                                        aria-label="Open user menu"
                                    >
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-64 rounded-xl p-2"
                                >
                                    {/* User Information */}
                                    <DropdownMenuLabel className="px-3 py-3 font-normal">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold">
                                                    {user.data.profile.name}
                                                </p>

                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user.data.profile.email}
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator className="my-1" />

                                    {/* User Menu Items */}
                                    <div className="space-y-1">
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <DropdownMenuItem
                                                    key={item.action}
                                                    onClick={() =>
                                                        handleUserMenuAction(item.action)
                                                    }
                                                    className="cursor-pointer rounded-lg px-3 py-2.5"
                                                >
                                                    <Icon className="mr-3 h-4 w-4" />
                                                    <span>{item.label}</span>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </div>

                                    <DropdownMenuSeparator className="my-1" />

                                    {/* Logout */}
                                    <DropdownMenuItem
                                        onClick={() =>
                                            handleUserMenuAction("logout")
                                        }
                                        className="cursor-pointer rounded-lg px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            // <Link href="/login">
                            //     <Button
                            //         className="login-cta relative overflow-hidden rounded-lg bg-white! hover:bg-white! text-[#007A55]! hover:text-[#007A55]! px-5 cursor-pointer hover:scale-105">
                            //         <span className="snake-line" />
                            //         <span className="relative z-10 font-semibold">
                            //             Log in
                            //         </span>
                            //     </Button>
                            // </Link>
                            <Link href="/login">
                                <Button
                                    className="
            login-cta
            relative
            overflow-hidden
            rounded-lg
            border-2
            border-[#007A55]!
            bg-white!
            px-5
            text-[#007A55]!
            hover:bg-white!
            hover:text-[#007A55]!
            cursor-pointer
            hover:scale-105
        "
                                >
                                    <span className="snake-line" />

                                    <span className="relative z-10 font-semibold">
                                        Log in
                                    </span>
                                </Button>
                            </Link>
                        )}
                    </div>



                </div>
            </div>
        </nav>
    );
}