import ServiceGridSkeleton from "../_components/loading-skeleton/ServiceGridSkeleton";

export default function Loading() {
    return (
        <div className="container py-10">
            <ServiceGridSkeleton />
        </div>
    );
}