import { TechnicianGridSkeleton } from "../_components/loading-skeleton/TechnicianGridSkeleton";

export default function Loading() {
    return (
        <div className="container py-10 max-w-310 mx-auto">
            <h1 className="mb-8 text-3xl font-bold">
                Technicians
            </h1>

            <TechnicianGridSkeleton />
        </div>
    );
}