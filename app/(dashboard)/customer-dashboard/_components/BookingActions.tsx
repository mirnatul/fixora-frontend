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
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";


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
        const toastId = toast.loading("Cancelling booking...");

        try {
            const user = await getMe();
            const userId = user.data.profile.id;

            const result = await cancelBooking(id, userId);

            if (result.success) {
                toast.success("Booking cancelled successfully", {
                    id: toastId,
                });
            } else {
                toast.error(result.message || "Failed to cancel booking", {
                    id: toastId,
                });
            }

        } catch (error) {
            toast.error("Something went wrong while cancelling booking", {
                id: toastId,
            });
        }
    };


    const handlePayNow = async () => {
        const toastId = toast.loading("Creating payment...");

        try {
            const user = await getMe();
            const userId = user.data.profile.id;

            const result = await doPayment(id, userId);

            if (result.success) {
                toast.success("Redirecting to payment...", {
                    id: toastId,
                });

                window.location.href = result.data.paymentUrl;
            } else {
                toast.error(result.message || "Payment failed", {
                    id: toastId,
                });
            }

        } catch (error) {
            toast.error("Something went wrong while creating payment", {
                id: toastId,
            });
        }
    };


    const handleReview = () => {
        setReviewOpen(true);
    };


    const handleSubmitReview = async () => {
        setPending(true);

        const toastId = toast.loading("Submitting review...");

        try {
            const user = await getMe();
            const userId = user.data.profile.id;

            const payload = {
                rating,
                comment,
            };

            const result = await leaveReview(id, payload, userId);

            if (result.success) {
                toast.success("Review submitted successfully", {
                    id: toastId,
                });

                setReviewOpen(false);
                setComment("");
                setRating(5);
            } else {
                toast.error(result.message || "Failed to submit review", {
                    id: toastId,
                });
            }

        } catch (error) {
            toast.error("Something went wrong while submitting review", {
                id: toastId,
            });
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
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    {renderActions()}
                </DropdownMenuContent>
            </DropdownMenu>


            <Dialog
                open={reviewOpen}
                onOpenChange={setReviewOpen}
            >
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