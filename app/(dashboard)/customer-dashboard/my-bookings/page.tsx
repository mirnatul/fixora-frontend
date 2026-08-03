import { getMe } from "@/service/getMe";
import { getMyBookings } from "../_actions/getMyBookings";
import BookingTable from "../_components/BookingTable";
import { Suspense } from "react";
import BookingTableSkeleton from "../_components/loading-skeleton/MyBookingSkeleton";

export default async function MyBookingsPage() {
    const user = await getMe();
    const userId = user?.data?.profile?.id ?? null;
    // console.log(userId);
    const result = await getMyBookings(userId);



    return (
        <div className="h-[calc(100vh-64px)] p-6 lg:p-8">
            <div className="flex h-full flex-col rounded-2xl border bg-background shadow-sm">
                <div className="border-b px-8 py-6">
                    <h1 className="text-3xl font-bold">My Bookings</h1>
                    <p className="mt-1 text-muted-foreground">
                        View and manage all your service bookings.
                    </p>
                </div>

                <div className="min-h-0 flex-1">
                    <BookingTable bookings={result.data ?? []} />
                </div>
            </div>
        </div>
    );
}