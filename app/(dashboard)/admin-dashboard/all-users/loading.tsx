import UserTableSkeleton from "../_components/loading-skeleton/UserTableSkeleton";

export default function Loading() {
    return (
        <div className="h-[calc(100vh-64px)] p-6 lg:p-8">
            <div className="flex h-full flex-col rounded-2xl border bg-background shadow-sm">
                <div className="border-b px-8 py-6">
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="mt-1 text-muted-foreground">
                        View and manage all registered users.
                    </p>
                </div>

                <div className="min-h-0 flex-1 p-6">
                    <UserTableSkeleton rows={8} />
                </div>
            </div>
        </div>
    );
}