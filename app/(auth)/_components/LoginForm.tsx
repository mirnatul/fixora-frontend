// "use client"

// import { cn } from "@/lib/utils"
// import {
//     Field,
//     FieldDescription,
//     FieldGroup,
//     FieldLabel,
// } from "@/components/ui/field"

// import {
//     Eye,
//     EyeOff,
//     Lock,
//     LogIn,
//     Mail,
// } from "lucide-react"

// import { useState, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { loginAction } from "../_actions/authActions"
// import { Button } from "@/components/ui/button"
// import { useActionState } from "react"
// import { toast } from "sonner"
// import Link from "next/link"
// import GoogleButton from "./GoogleButton"

// export const LoginForm = ({
//     className,
//     ...props
// }: React.ComponentProps<"form">) => {
//     const [state, action, pending] = useActionState(loginAction, false)
//     const [showPassword, setShowPassword] = useState(false)

//     useEffect(() => {
//         if (!state) return

//         if (state.success) {
//             toast.success(state.message || "Login Successful")
//         }

//         if (!state.success) {
//             toast.error(state.message || "Login failed")
//         }
//     }, [state])


//     return (
//         <form
//             action={action}
//             className={cn("flex flex-col gap-6", className)}
//             {...props}
//         >
//             <FieldGroup>

//                 {/* Header */}
//                 <div className="flex flex-col gap-1">
//                     <p className="text-teal-600">
//                         WELCOME BACK
//                     </p>

//                     <h1 className="my-2 text-xl font-bold md:text-4xl">
//                         Sign In
//                     </h1>

//                     <p className="text-sm text-balance text-muted-foreground">
//                         Sign in to continue renting and managing home services.
//                     </p>
//                 </div>

//                 {/* Email field */}
//                 <Field>
//                     <FieldLabel htmlFor="email">
//                         Email Address
//                         <span className="text-destructive">*</span>
//                     </FieldLabel>

//                     <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             placeholder="m@example.com"
//                             className="rounded-xl py-6 pl-10 pr-2"
//                             required
//                         />
//                     </div>
//                 </Field>

//                 {/* Password field */}
//                 <Field>
//                     <FieldLabel htmlFor="password">
//                         Password
//                         <span className="text-destructive">*</span>
//                     </FieldLabel>

//                     <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

//                         <Input
//                             id="password"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="••••••••"
//                             className="rounded-xl py-6 pl-10 pr-11"
//                             required
//                         />

//                         {/* Password show button */}
//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowPassword((prev) => !prev)
//                             }
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
//                             aria-label={
//                                 showPassword
//                                     ? "Hide password"
//                                     : "Show password"
//                             }
//                         >
//                             {showPassword ? (
//                                 <EyeOff className="h-5 w-5" />
//                             ) : (
//                                 <Eye className="h-5 w-5" />
//                             )}
//                         </button>
//                     </div>
//                 </Field>

//                 {/* Login + Google */}
//                 <div className="flex flex-col gap-3">
//                     {/* Normal login button */}
//                     <Button
//                         type="submit"
//                         className="h-12 w-full rounded-xl text-sm font-medium md:text-base"
//                         disabled={pending}
//                     >
//                         <LogIn className="mr-2 h-5 w-5" />

//                         {pending ? "Signing In..." : "Sign In"}
//                     </Button>

//                     {/* Divider */}
//                     <div className="relative my-1">
//                         <div className="absolute inset-0 flex items-center">
//                             <span className="w-full border-t" />
//                         </div>

//                         <div className="relative flex justify-center text-xs uppercase">
//                             <span className="bg-card px-2 text-muted-foreground">
//                                 Or continue with
//                             </span>
//                         </div>
//                     </div>

//                     {/* Google Login */}
//                     <GoogleButton></GoogleButton>
//                 </div>

//                 {/* Register */}
//                 <Field>
//                     <FieldDescription className="text-center">
//                         Don&apos;t have an account?{" "}

//                         <Link
//                             href="/register"
//                             className="text-teal-600 underline underline-offset-4"
//                         >
//                             Register
//                         </Link>
//                     </FieldDescription>
//                 </Field>

//             </FieldGroup>
//         </form>
//     )
// }









"use client"

import { cn } from "@/lib/utils"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    Eye,
    EyeOff,
    Lock,
    LogIn,
    Mail,
} from "lucide-react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import GoogleButton from "./GoogleButton"

export const LoginForm = ({
    className,
    ...props
}: React.ComponentProps<"form">) => {
    const [state, action, pending] = useActionState(loginAction, false)

    const [showPassword, setShowPassword] = useState(false)
    const [showDemoLogin, setShowDemoLogin] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message || "Login Successful")
        }

        if (!state.success) {
            toast.error(state.message || "Login failed")
        }
    }, [state])

    const demoAccounts = {
        customer: {
            email: "customer@fixora.demo",
            password: "123456",
        },
        technician: {
            email: "technician@fixora.demo",
            password: "123456",
        },
        admin: {
            email: "admin@fixora.demo",
            password: "123456",
        },
    }

    const handleDemoLogin = (
        role: keyof typeof demoAccounts
    ) => {
        const account = demoAccounts[role]

        setEmail(account.email)
        setPassword(account.password)
        setShowDemoLogin(false)
    }

    return (
        <form
            action={action}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <FieldGroup>

                {/* Header */}
                <div className="flex flex-col gap-1">
                    <p className="text-teal-600">
                        WELCOME BACK
                    </p>

                    <h1 className="my-2 text-xl font-bold md:text-4xl">
                        Sign In
                    </h1>

                    <p className="text-sm text-balance text-muted-foreground">
                        Sign in to continue renting and managing home services.
                    </p>
                </div>

                {/* Email field */}
                <Field>
                    <FieldLabel htmlFor="email">
                        Email Address
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </Field>

                {/* Password field */}
                <Field>
                    <FieldLabel htmlFor="password">
                        Password
                        <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="rounded-xl py-6 pl-10 pr-11"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* Password show button */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </Field>

                {/* Login + Demo Login */}
                <div className="flex flex-col gap-3">

                    <div className="flex gap-2">

                        {/* Normal login */}
                        <Button
                            type="submit"
                            className="h-12 flex-1 rounded-md text-sm font-medium md:text-base"
                            disabled={pending}
                        >
                            <LogIn className="mr-2 h-5 w-5" />

                            {pending
                                ? "Signing In..."
                                : "Sign In"}
                        </Button>

                        {/* Demo login */}
                        <div className="relative flex-1">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 w-full rounded-md text-sm font-medium md:text-base border-green-600"
                                onClick={() =>
                                    setShowDemoLogin(
                                        (prev) => !prev
                                    )
                                }
                                disabled={pending}
                            >
                                Demo Login
                            </Button>

                            {/* Demo options */}
                            {showDemoLogin && (
                                <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border bg-card p-2 shadow-lg">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDemoLogin(
                                                "customer"
                                            )
                                        }
                                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                                    >
                                        Login as Customer
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDemoLogin(
                                                "technician"
                                            )
                                        }
                                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                                    >
                                        Login as Technician
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDemoLogin(
                                                "admin"
                                            )
                                        }
                                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                                    >
                                        Login as Admin
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-1">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <GoogleButton />
                </div>

                {/* Register */}
                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}

                        <Link
                            href="/register"
                            className="text-teal-600 underline underline-offset-4"
                        >
                            Register
                        </Link>
                    </FieldDescription>
                </Field>

            </FieldGroup>
        </form>
    )
}