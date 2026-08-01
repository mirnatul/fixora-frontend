"use client";

import { Button } from "@/components/ui/button";

type Booking = {
    id: string;
    status: string;
};

export default function BookingActions({
    booking,
}: {
    booking: Booking;
}) {
    const handlePay = () => {
        console.log("Pay", booking.id);
    };

    const handleEdit = () => {
        console.log("Edit", booking.id);
    };

    const handleView = () => {
        console.log("View", booking.id);
    };

    return (
        <div className="flex justify-end gap-2">
            <Button
                size="sm"
                variant="outline"
                onClick={handleView}
            >
                View
            </Button>

            {booking.status === "PENDING" && (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            )}

            {booking.status === "ACCEPTED" && (
                <Button
                    size="sm"
                    onClick={handlePay}
                >
                    Pay
                </Button>
            )}
        </div>
    );
}