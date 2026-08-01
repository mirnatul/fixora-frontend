import { getMe } from "@/service/getMe";
import BookingTable from "../_components/BookingsTable";
import { getBookingsIGet } from "../_actions/getBookingsIGet";

export default async function BookingsIGet() {
    const user = await getMe();
    const technicianId = user.data.profile.technicianProfile.id;
    console.log(technicianId);
    // const result = await getMyBookings(userId);
    const result = await getBookingsIGet(technicianId)



    return (
        <div className="h-[calc(100vh-64px)] p-6 lg:p-8">
            <div className="flex h-full flex-col rounded-2xl border bg-background shadow-sm">
                <div className="border-b px-8 py-6">
                    <h1 className="text-3xl font-bold">Bookings I Get</h1>
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