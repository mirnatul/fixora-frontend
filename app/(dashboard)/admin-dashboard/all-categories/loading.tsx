import CategoriesGridSkeleton from "../_components/loading-skeleton/CategoriesGridSkeleton";

export default function Loading() {
    return (
        <div className="h-[calc(100vh-64px)] p-6 lg:p-8">
            <div className="flex h-full flex-col rounded-2xl border bg-background shadow-sm">
                <div className="border-b px-8 py-6">
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="mt-1 text-muted-foreground">
                        Manage all service categories.
                    </p>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                    <CategoriesGridSkeleton count={6} />
                </div>
            </div>
        </div>
    );
}