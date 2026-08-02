"use client";

import {
    MoreHorizontal,
    Ban,
    CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { updateUserStatus } from "../../_actions/getAllUsers";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function UserRowActions({
    user,
}: {
    user: User;
}) {
    const isActive = user.status === "ACTIVE";

    const handleStatusChange = async () => {
        try {
            await updateUserStatus({
                userId: user.id,
                status: isActive ? "BANNED" : "ACTIVE",
            });
        } catch (error) {
            console.error("Failed to update user status:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={handleStatusChange}
                    className={isActive ? "text-red-600" : "text-green-600"}
                >
                    {isActive ? (
                        <>
                            <Ban className="mr-2 h-4 w-4" />
                            Ban User
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate User
                        </>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}