"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type BookingActionsProps = {
    bookingId: string;
    status: string;
};

export default function BookingActions({
    bookingId,
    status,
}: BookingActionsProps) {
    const handleStatusChange = async (
        bookingId: string,
        status: string
    ) => {
        console.log({
            bookingId,
            status,
        });

        // TODO:
        // await updateBookingStatus({
        //     bookingId,
        //     status,
        // });
    };

    const renderActions = () => {
        switch (status) {
            case "PENDING":
                return (
                    <>
                        <DropdownMenuItem
                            onClick={() =>
                                handleStatusChange(
                                    bookingId,
                                    "ACCEPTED"
                                )
                            }
                        >
                            ✅ Accept Booking
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                                handleStatusChange(
                                    bookingId,
                                    "CANCELLED"
                                )
                            }
                        >
                            ❌ Cancel Booking
                        </DropdownMenuItem>
                    </>
                );

            case "PAID":
                return (
                    <DropdownMenuItem
                        onClick={() =>
                            handleStatusChange(
                                bookingId,
                                "IN_PROGRESS"
                            )
                        }
                    >
                        🚀 Start Job
                    </DropdownMenuItem>
                );

            case "IN_PROGRESS":
                return (
                    <DropdownMenuItem
                        onClick={() =>
                            handleStatusChange(
                                bookingId,
                                "COMPLETED"
                            )
                        }
                    >
                        ✔ Mark Completed
                    </DropdownMenuItem>
                );

            case "COMPLETED":
                return (
                    <DropdownMenuItem disabled>
                        Booking Completed
                    </DropdownMenuItem>
                );

            case "CANCELLED":
                return (
                    <DropdownMenuItem disabled>
                        Booking Cancelled
                    </DropdownMenuItem>
                );

            case "ACCEPTED":
                return (
                    <DropdownMenuItem disabled>
                        Waiting for Customer Payment
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
            <DropdownMenuTrigger asChild>
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