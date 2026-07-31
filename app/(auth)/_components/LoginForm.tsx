"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const LoginForm = () => {
    const router = useRouter();
    const [state, action, pending] = useActionState(loginAction, false);

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Login Successful");
            // router.push("/admin-dashboard")
        }
        if (!state.success) {
            toast.error(state.message || "Login failed");
        }

    }, [state])

    return (
        <form action={action} className="mt-4">
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter Your Email"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Enter Your Password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    {pending ? "Submitting..." : "Login"}
                </Button>
            </div>
        </form>
    )
}
