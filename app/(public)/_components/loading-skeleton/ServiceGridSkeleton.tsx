import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceGridSkeletonProps {
    count?: number;
}

export default function ServiceGridSkeleton({
    count = 6,
}: ServiceGridSkeletonProps) {
    return (
        <div className="flex justify-center">
            <div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, index) => (
                    <Card key={index} className="h-full">
                        <CardContent className="space-y-4 p-6">
                            <Skeleton className="h-6 w-3/4" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-5 w-16" />
                            </div>

                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-24" />
                        </CardContent>

                        <CardFooter>
                            <Skeleton className="h-10 w-full rounded-md" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}