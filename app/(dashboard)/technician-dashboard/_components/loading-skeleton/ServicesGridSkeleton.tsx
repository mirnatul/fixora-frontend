import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ServicesGridSkeletonProps {
    count?: number;
}

export default function ServicesGridSkeleton({
    count = 6,
}: ServicesGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} className="flex h-full flex-col">
                    <CardContent className="space-y-4 p-6">

                        <Skeleton className="h-6 w-3/4" />

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-8/12" />
                        </div>

                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </CardContent>

                    <CardFooter className="mt-auto flex justify-between p-6 pt-0">
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-28 rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}