"use client"

// 
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";


import {
    User,
    Wrench,
    UserRound,
    Mail,
    Lock,
    Phone,
    MapPin,
    MapPinned,
    UserPlus,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";


import { useActionState, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { FieldGroup } from "@/components/ui/field"

interface RegisterFormProps
    extends React.ComponentPropsWithoutRef<"form"> { }

export const RegisterForm = ({
    className,
    ...props
}: RegisterFormProps) => {

    const initialState = {
        success: false,
        message: "",
        data: null
    };

    const router = useRouter()
    const [state, action, pending] = useActionState(registerAction, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("CUSTOMER")



    useEffect(() => {
        if (!state.message) return;

        if (!state.success) {
            toast.error(state.message);
        }
    }, [state]);

    return (

        <form action={action}
            className={cn("flex flex-col gap-5", className)}
            {...props}
        >
            <FieldGroup className="gap-5">

                {/* ================= Heading ================= */}
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600">
                        WELCOME TO FIXORA
                    </p>

                    <h1 className="text-2xl font-bold">
                        Create your account
                    </h1>

                    <p className="text-xs text-muted-foreground">
                        Choose your role and start your journey with Fixora.
                    </p>
                </div>

                {/* ================= Role ================= */}

                <Field>
                    <FieldLabel>
                        Account Type{" "}
                        <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="grid gap-2 md:grid-cols-2">
                        {/* Customer */}
                        <button
                            type="button"
                            onClick={() => setRole("CUSTOMER")}
                            className={cn(
                                "relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
                                role === "CUSTOMER"
                                    ? "border-teal-600 bg-teal-50 shadow-sm dark:bg-teal-950/20"
                                    : "hover:border-teal-400 hover:bg-muted/40"
                            )}
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30">
                                <User className="h-4 w-4" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-sm font-semibold">
                                    Customer
                                </h3>

                                <p className="text-[10px] text-muted-foreground">
                                    Book home services.
                                </p>
                            </div>

                            {role === "CUSTOMER" && (
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                                    ✓
                                </div>
                            )}
                        </button>

                        {/* Technician */}
                        <button
                            type="button"
                            onClick={() => setRole("TECHNICIAN")}
                            className={cn(
                                "relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
                                role === "TECHNICIAN"
                                    ? "border-teal-600 bg-teal-50 shadow-sm dark:bg-teal-950/20"
                                    : "hover:border-teal-400 hover:bg-muted/40"
                            )}
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30">
                                <Wrench className="h-4 w-4" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-sm font-semibold">
                                    Technician
                                </h3>

                                <p className="text-[10px] text-muted-foreground">
                                    Offer your services.
                                </p>
                            </div>

                            {role === "TECHNICIAN" && (
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                                    ✓
                                </div>
                            )}
                        </button>
                    </div>
                    <input
                        type="hidden"
                        name="role"
                        value={role}
                    />
                </Field>

                {/* ================= Name & Email ================= */}

                <div className="grid gap-2.5 md:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="name">
                            Full Name
                            <span className="text-destructive">*</span>
                        </FieldLabel>

                        <div className="relative">
                            <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="h-10 rounded-xl pl-9"
                            />
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">
                            Email Address{" "}
                            <span className="text-destructive">*</span>
                        </FieldLabel>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="h-10 rounded-xl pl-9"
                            />
                        </div>
                    </Field>
                </div>

                {/* ================= Password ================= */}

                <Field>
                    <FieldLabel htmlFor="password">
                        Password{" "}
                        <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-10 rounded-xl pl-9 pr-10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </Field>

                {/* ================= Phone & City ================= */}

                <div className="grid gap-2.5 md:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="phone">
                            Phone Number{" "}
                            <span className="text-destructive">*</span>
                        </FieldLabel>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="+8801XXXXXXXXX"
                                className="h-10 rounded-xl pl-9"
                            />
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="city">
                            City{" "}
                            <span className="text-destructive">*</span>
                        </FieldLabel>

                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Dhaka"
                                className="h-10 rounded-xl pl-9"
                            />
                        </div>
                    </Field>
                </div>

                {/* ================= Address ================= */}

                <Field>
                    <FieldLabel htmlFor="address">
                        Address{" "}
                        <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                        <MapPinned className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="House, Road, Area"
                            className="h-10 rounded-xl pl-9"
                        />
                    </div>
                </Field>

                {/* ================= Button ================= */}

                <Field>
                    <Button
                        type="submit"
                        disabled={pending}
                        className="h-10 w-full rounded-xl text-sm font-medium"
                    >
                        {pending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create Account
                            </>
                        )}
                    </Button>
                </Field>

                {/* ================= Footer ================= */}

                <Field>
                    <FieldDescription className="text-center text-[13px]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-teal-600 transition-colors hover:text-teal-700"
                        >
                            Sign In
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>


        // <form action={action} className="mt-4">
        //     <div className="flex flex-col gap-6">
        //         <div className="grid gap-2">
        //             <Label htmlFor="name">Full Name</Label>
        //             <Input
        //                 id="name"
        //                 name="name"
        //                 type="text"
        //                 placeholder="Enter Your Full Name"
        //                 required
        //             />
        //         </div>

        //         <div className="grid gap-2">
        //             <Label htmlFor="email">Email</Label>
        //             <Input
        //                 id="email"
        //                 name="email"
        //                 type="email"
        //                 placeholder="Enter Your Email"
        //                 required
        //             />
        //         </div>

        //         <div className="grid gap-2">
        //             <Label htmlFor="password">Password</Label>
        //             <Input
        //                 id="password"
        //                 name="password"
        //                 type="password"
        //                 placeholder="Enter Your Password"
        //                 required
        //             />
        //         </div>

        //         <div className="grid gap-2">
        //             <Label htmlFor="phone">Phone Number</Label>
        //             <Input
        //                 id="phone"
        //                 name="phone"
        //                 type="tel"
        //                 placeholder="017xxxxxxxx"
        //                 required
        //             />
        //         </div>

        //         <div className="grid gap-2">
        //             <Label htmlFor="address">Address</Label>
        //             <Input
        //                 id="address"
        //                 name="address"
        //                 type="text"
        //                 placeholder="Enter Your Address"
        //                 required
        //             />
        //         </div>

        //         <div className="grid gap-2">
        //             <Label htmlFor="city">City</Label>
        //             <Input
        //                 id="city"
        //                 name="city"
        //                 type="text"
        //                 placeholder="Enter Your City"
        //                 required
        //             />
        //         </div>

        //         <div className="grid gap-2">
        //             <Label htmlFor="role">Role</Label>

        //             <Select
        //                 value={role}
        //                 onValueChange={setRole}
        //             >
        //                 <SelectTrigger id="role" className="w-full">
        //                     <SelectValue placeholder="Select a role" />
        //                 </SelectTrigger>

        //                 <SelectContent>
        //                     <SelectItem value="CUSTOMER">
        //                         Customer
        //                     </SelectItem>
        //                     <SelectItem value="TECHNICIAN">
        //                         Technician
        //                     </SelectItem>
        //                 </SelectContent>
        //             </Select>

        //             {/* This is submitted with FormData */}
        //             <input
        //                 type="hidden"
        //                 name="role"
        //                 value={role}
        //             />
        //         </div>

        //         <Button type="submit" className="w-full">
        //             {pending ? "Creating user..." : "Create Account"}
        //         </Button>
        //     </div>
        // </form>
    )
}