"use client";

import { Star } from "lucide-react";

interface ReviewCardProps {
    review: {
        id: string;
        rating: number;
        comment: string;
        customer: {
            id: string;
            name: string;
            profileImage: string;
        };
    };
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {review.customer.profileImage ? (
                            <img
                                src={review.customer.profileImage}
                                alt={review.customer.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            review.customer.name.charAt(0).toUpperCase()
                        )}
                    </div>

                    <div>
                        <p className="font-medium text-foreground">
                            {review.customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Customer
                        </p>
                    </div>
                </div>

                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {review.comment || "No comment provided."}
            </p>
        </div>
    );
}