import { Skeleton } from "@/components/ui/skeleton";
import ServicesGridSkeleton from "../_components/loading-skeleton/ServicesGridSkeleton";

export default function Loading() {
    return (
        <div className="container py-8">
            <div className="mb-8">
                <Skeleton className="mb-3 h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>

            <ServicesGridSkeleton count={6} />
        </div>
    );
}