"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type BookingActionsProps = {
    bookingId: string;
    status: string;
};

export default function BookingActions({
    bookingId,
    status,
}: BookingActionsProps) {
    const handleCancelBooking = async () => {
        console.log("Cancel booking:", bookingId);

        // TODO:
        // await cancelBooking(bookingId);
    };

    const handlePayNow = async () => {
        console.log("Pay booking:", bookingId);

        // TODO:
        // await createCheckoutSession(bookingId);
    };

    const handleReview = () => {
        console.log("Leave review:", bookingId);

        // TODO:
        // router.push(`/customer-dashboard/reviews/${bookingId}`);
    };

    const renderActions = () => {
        switch (status) {
            case "PENDING":
                return (
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={handleCancelBooking}
                    >
                        ❌ Cancel Booking
                    </DropdownMenuItem>
                );

            case "ACCEPTED":
                return (
                    <DropdownMenuItem onClick={handlePayNow}>
                        💳 Pay Now
                    </DropdownMenuItem>
                );

            case "PAID":
                return (
                    <DropdownMenuItem disabled>
                        ✅ Payment Completed
                    </DropdownMenuItem>
                );

            case "IN_PROGRESS":
                return (
                    <DropdownMenuItem disabled>
                        🚧 Job In Progress
                    </DropdownMenuItem>
                );

            case "COMPLETED":
                return (
                    <DropdownMenuItem onClick={handleReview}>
                        ⭐ Leave Review
                    </DropdownMenuItem>
                );

            case "CANCELLED":
                return (
                    <DropdownMenuItem disabled>
                        🚫 Booking Cancelled
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