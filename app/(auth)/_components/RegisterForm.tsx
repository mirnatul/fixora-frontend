"use client"

import { useActionState, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const RegisterForm = () => {
    const router = useRouter()
    const [state, action, pending] = useActionState(registerAction, false);
    const [role, setRole] = useState("CUSTOMER")


    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Register Successful");
            router.push("/login")
        }
        if (!state.success) {
            toast.error(state.message || "Register failed");
        }

    }, [state])

    return (
        <form action={action} className="mt-4">
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Your Full Name"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="017xxxxxxxx"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter Your Address"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Enter Your City"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>

                    <Select
                        value={role}
                        onValueChange={setRole}
                    >
                        <SelectTrigger id="role" className="w-full">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="CUSTOMER">
                                Customer
                            </SelectItem>
                            <SelectItem value="TECHNICIAN">
                                Technician
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* This is submitted with FormData */}
                    <input
                        type="hidden"
                        name="role"
                        value={role}
                    />
                </div>

                <Button type="submit" className="w-full">
                    {pending ? "Creating user..." : "Create Account"}
                </Button>
            </div>
        </form>
    )
}