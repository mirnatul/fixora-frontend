import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TechnicianGridSkeleton({
    count = 6,
}: {
    count?: number;
}) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index}>
                    <CardContent className="space-y-4 p-6">
                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />

                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>

                        {/* Rating */}
                        <Skeleton className="h-4 w-32" />

                        {/* Experience */}
                        <Skeleton className="h-4 w-24" />

                        {/* City */}
                        <Skeleton className="h-4 w-28" />

                        {/* Button */}
                        <Skeleton className="h-10 w-full rounded-md" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}