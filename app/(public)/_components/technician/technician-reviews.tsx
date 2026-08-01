import { Star } from "lucide-react";
import { ReviewCard } from "./review-card";

interface Review {
    id: string;
    rating: number;
    comment: string;
    customer: {
        id: string;
        name: string;
        profileImage: string;
    };
}

interface TechnicianReviewsProps {
    reviews?: Review[] | null;
    averageRating?: string | null;
}

export function TechnicianReviews({
    reviews
}: TechnicianReviewsProps) {
    const reviewList = reviews ?? [];
    const avgRating =
        reviewList.length > 0
            ? reviewList.reduce((sum, review) => sum + review.rating, 0) / reviewList.length
            : 0;

    const ratingDistribution = {
        5: reviewList.filter((r) => r.rating === 5).length,
        4: reviewList.filter((r) => r.rating === 4).length,
        3: reviewList.filter((r) => r.rating === 3).length,
        2: reviewList.filter((r) => r.rating === 2).length,
        1: reviewList.filter((r) => r.rating === 1).length,
    };


    return (
        <div className="space-y-6">
            {/* Rating Summary */}
            <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-bold text-foreground">
                    Reviews
                </h2>

                <div className="mt-5 flex items-center gap-4">
                    <div>
                        <div className="text-4xl font-bold text-foreground">
                            {avgRating.toFixed(1)}
                        </div>

                        <div className="mt-2 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(avgRating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <div
                            key={stars}
                            className="flex items-center gap-3"
                        >
                            <span className="w-12 text-xs text-muted-foreground">
                                {stars}★
                            </span>

                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-yellow-400"
                                    style={{
                                        width:
                                            reviewList.length > 0
                                                ? `${(ratingDistribution[
                                                    stars as keyof typeof ratingDistribution
                                                ] /
                                                    reviewList.length) *
                                                100
                                                }%`
                                                : "0%",
                                    }}
                                />
                            </div>

                            <span className="w-6 text-right text-xs text-muted-foreground">
                                {
                                    ratingDistribution[
                                    stars as keyof typeof ratingDistribution
                                    ]
                                }
                            </span>
                        </div>
                    ))}
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                    Based on {reviewList.length} review
                    {reviewList.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                    Latest Reviews
                </h3>

                {reviewList.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                        <h4 className="text-lg font-semibold text-foreground">
                            No reviews yet
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            This technician hasn't received any customer reviews
                            yet.
                        </p>
                    </div>
                ) : (
                    reviewList.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                        />
                    ))
                )}
            </div>
        </div>
    );
}