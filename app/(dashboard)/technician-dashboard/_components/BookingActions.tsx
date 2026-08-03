"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { changeBookingStatus } from "../_actions/changeBookingStatus";

type Booking = {
    id: string;
    status: "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    payment: {
        status: "COMPLETED";
    } | null;
};

type BookingActionsProps = {
    booking: Booking;
};

export default function BookingActions({
    booking,
}: BookingActionsProps) {
    const [pendingStatus, setPendingStatus] =
        useState<Booking["status"] | null>(null);

    const handleStatusChange = async (
        bookingId: string,
        status: Booking["status"]
    ) => {
        const toastId = toast.loading("Updating booking status...");

        try {
            setPendingStatus(status);

            const result = await changeBookingStatus(bookingId, status);

            if (result.success) {
                toast.success(
                    result.message || "Booking status updated successfully",
                    {
                        id: toastId,
                    }
                );
            } else {
                toast.error(
                    result.message || "Failed to update booking status",
                    {
                        id: toastId,
                    }
                );
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
            });
        } finally {
            setPendingStatus(null);
        }
    };

    const renderActions = () => {
        switch (booking.status) {
            case "PENDING":
                return (
                    <>
                        <DropdownMenuItem
                            disabled={!!pendingStatus}
                            onClick={() =>
                                handleStatusChange(
                                    booking.id,
                                    "ACCEPTED"
                                )
                            }
                        >
                            {pendingStatus === "ACCEPTED"
                                ? "Accepting..."
                                : "✅ Accept Booking"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-600"
                            disabled={!!pendingStatus}
                            onClick={() =>
                                handleStatusChange(
                                    booking.id,
                                    "CANCELLED"
                                )
                            }
                        >
                            {pendingStatus === "CANCELLED"
                                ? "Cancelling..."
                                : "❌ Cancel Booking"}
                        </DropdownMenuItem>
                    </>
                );

            case "ACCEPTED":
                if (booking.payment?.status === "COMPLETED") {
                    return (
                        <DropdownMenuItem
                            disabled={!!pendingStatus}
                            onClick={() =>
                                handleStatusChange(
                                    booking.id,
                                    "IN_PROGRESS"
                                )
                            }
                        >
                            {pendingStatus === "IN_PROGRESS"
                                ? "Starting..."
                                : "🚀 Start Job"}
                        </DropdownMenuItem>
                    );
                }

                return (
                    <DropdownMenuItem disabled>
                        Waiting for Customer Payment
                    </DropdownMenuItem>
                );

            case "IN_PROGRESS":
                return (
                    <DropdownMenuItem
                        disabled={!!pendingStatus}
                        onClick={() =>
                            handleStatusChange(
                                booking.id,
                                "COMPLETED"
                            )
                        }
                    >
                        {pendingStatus === "COMPLETED"
                            ? "Completing..."
                            : "✔ Mark Completed"}
                    </DropdownMenuItem>
                );

            case "COMPLETED":
                return (
                    <DropdownMenuItem disabled>
                        ✅ Booking Completed
                    </DropdownMenuItem>
                );

            case "CANCELLED":
                return (
                    <DropdownMenuItem disabled>
                        ❌ Booking Cancelled
                    </DropdownMenuItem>
                );

            default:
                return (
                    <DropdownMenuItem disabled>
                        No Actions Available
                    </DropdownMenuItem>
                );
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={!!pendingStatus}>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {renderActions()}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}