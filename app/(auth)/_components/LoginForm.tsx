"use client"

import { cn } from "@/lib/utils"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"

export const LoginForm = ({
    className,
    ...props
}: React.ComponentProps<"form">) => {
    const [state, action, pending] = useActionState(loginAction, false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Login Successful");
        }
        if (!state.success) {
            toast.error(state.message || "Login failed");
        }
    }, [state])

    return (
        <form action={action}
            className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col gap-1">
                    <p className="text-teal-600">WELCOME BACK</p>
                    <h1 className="text-xl md:text-4xl font-bold my-2">Sign In</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Sign in to continue renting and managing home services.
                    </p>
                </div>
                {/* Email field */}
                <Field>
                    <FieldLabel htmlFor="email">Email Address
                        <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            className="rounded-xl py-6 pl-10 pr-2"
                            required
                        />
                    </div>
                </Field>

                {/* Password field */}
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password
                            <span className="text-destructive">*</span>
                        </FieldLabel>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="rounded-xl py-6 pl-10 pr-11"
                            required
                        />
                        {/* Password show button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </Field>

                {/* submit button */}
                <Field>
                    <Button
                        type="submit"
                        className="h-12 w-full rounded-xl text-sm md:text-base font-medium"
                        disabled={pending}
                    >
                        <LogIn className="mr-2 h-5 w-5" />
                        {pending ? "Signing In..." : "Sign In"}
                    </Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline underline-offset-4 text-teal-600">
                            Register
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
