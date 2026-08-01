"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cancelBooking, doPayment, leaveReview } from "../_actions/userActionOnBooking";
import { getMe } from "@/service/getMe";
import { useActionState, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


type Booking = {
    id: string;
    status: string;
    payment: { status: "COMPLETED" } | null;
    review: { id: string } | null;
};

type BookingActionsProps = {
    booking: Booking;
};

export default function BookingActions({
    booking,
}: BookingActionsProps) {

    const [pending, setPending] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState("");

    const { id, status, payment, review } = booking;

    const handleCancelBooking = async () => {
        const user = await getMe();
        const userId = user.data.profile.id;

        await cancelBooking(id, userId);
    };

    const handlePayNow = async () => {
        const user = await getMe();
        const userId = user.data.profile.id;

        const result = await doPayment(id, userId);

        if (result.success) {
            window.location.href = result.data.paymentUrl;
        }
    };


    const handleReview = () => {
        setReviewOpen(true);
    };

    const handleSubmitReview = async () => {
        setPending(true);

        try {
            const user = await getMe();
            const userId = user.data.profile.id;

            const payload = {
                rating,
                comment,
            };

            const result = await leaveReview(id, payload, userId);

            if (result.success) {
                setReviewOpen(false);
                setComment("");
                setRating(5);
            }
        } finally {
            setPending(false);
        }
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
                if (payment?.status === "COMPLETED") {
                    return (
                        <DropdownMenuItem disabled>
                            ✅ Payment Completed
                        </DropdownMenuItem>
                    );
                }

                return (
                    <DropdownMenuItem onClick={handlePayNow}>
                        💳 Pay Now
                    </DropdownMenuItem>
                );

            case "IN_PROGRESS":
                return (
                    <DropdownMenuItem disabled>
                        🚧 Job In Progress
                    </DropdownMenuItem>
                );

            case "COMPLETED":
                if (review) {
                    return (
                        <DropdownMenuItem disabled>
                            ⭐ Already Reviewed
                        </DropdownMenuItem>
                    );
                }

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
        <>
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

            <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Leave a Review
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">
                                Rating
                            </label>

                            <Input
                                type="number"
                                min={1}
                                max={5}
                                value={rating}
                                onChange={(e) =>
                                    setRating(Number(e.target.value))
                                }
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Comment
                            </label>

                            <Textarea
                                placeholder="Write your experience..."
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                            />
                        </div>

                        <Button
                            onClick={handleSubmitReview}
                            disabled={pending}
                        >
                            {pending ? "Submitting..." : "Submit Review"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}