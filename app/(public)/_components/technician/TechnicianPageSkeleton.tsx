export default function TechnicianPageSkeleton() {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header Skeleton */}
                <div className="rounded-lg border p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        {/* Profile image */}
                        <div className="h-32 w-32 animate-pulse rounded-full bg-muted" />

                        <div className="flex-1 space-y-4">
                            {/* Name */}
                            <div className="h-8 w-64 animate-pulse rounded bg-muted" />

                            {/* Role / rating */}
                            <div className="h-5 w-40 animate-pulse rounded bg-muted" />

                            {/* Bio */}
                            <div className="space-y-2">
                                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Services and Reviews */}
                <div className="mt-12 grid gap-12 lg:grid-cols-3">

                    {/* Services */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="h-8 w-48 animate-pulse rounded bg-muted" />

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-lg border p-5 space-y-4"
                            >
                                <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />

                                <div className="space-y-2">
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                                </div>

                                <div className="flex justify-between">
                                    <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                                    <div className="h-9 w-28 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                        ))}

                    </div>


                    {/* Reviews */}
                    <div className="space-y-6">

                        <div className="h-8 w-40 animate-pulse rounded bg-muted" />

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-lg border p-5 space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                                        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </main>
    )
}