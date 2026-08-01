"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import BookingActions from "./BookingActions";
// import BookingActions from "./BookingActions";

type Booking = {
    id: string;
    bookingDate: string;
    slot: number[];
    address: string;
    totalAmount: number;
    status: "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    payment: {
        status: "COMPLETED";
    } | null;
};

const SLOT_TIME: Record<number, string> = {
    1: "09:00 - 11:00",
    2: "11:00 - 13:00",
    3: "14:00 - 16:00",
    4: "16:00 - 18:00",
};

const statusStyles: Record<string, string> = {
    PENDING:
        "bg-amber-100 text-amber-700 border border-amber-300",
    PAID:
        "bg-violet-100 text-violet-700 border border-violet-300",
    IN_PROGRESS:
        "bg-blue-100 text-blue-700 border border-blue-300",
    COMPLETED:
        "bg-green-100 text-green-700 border border-green-300",
    CANCELLED:
        "bg-red-100 text-red-700 border border-red-300",
};

export default function BookingTable({
    bookings,
}: {
    bookings: Booking[];
}) {
    const sortedBookings = [...bookings].sort(
        (a, b) =>
            new Date(b.bookingDate).getTime() -
            new Date(a.bookingDate).getTime()
    );

    if (!sortedBookings.length) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                No bookings found.
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-background">
                    <TableRow>
                        <TableHead className="w-14 px-6">#</TableHead>
                        <TableHead className="px-6">Date</TableHead>
                        <TableHead className="px-6">Time Slot</TableHead>
                        <TableHead className="min-w-[260px] px-6">
                            Address
                        </TableHead>
                        <TableHead className="px-6">Total</TableHead>
                        <TableHead className="px-6">Status</TableHead>
                        <TableHead className="px-6 text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sortedBookings.map((booking, index) => (
                        <TableRow
                            key={booking.id}
                            className="hover:bg-muted/40 transition-colors"
                        >
                            <TableCell className="px-6 py-6 font-semibold">
                                {index + 1}
                            </TableCell>

                            <TableCell className="px-6 py-6 whitespace-nowrap font-medium">
                                {new Date(
                                    booking.bookingDate
                                ).toLocaleDateString("en-GB")}
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <div className="flex flex-wrap gap-2">
                                    {booking.slot.map((slot) => (
                                        <Badge
                                            key={slot}
                                            variant="outline"
                                            className="rounded-full"
                                        >
                                            {SLOT_TIME[slot]}
                                        </Badge>
                                    ))}
                                </div>
                            </TableCell>

                            <TableCell className="max-w-sm truncate px-6 py-6 text-muted-foreground">
                                {booking.address}
                            </TableCell>

                            <TableCell className="px-6 py-6 font-semibold whitespace-nowrap">
                                ৳{booking.totalAmount}
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <Badge
                                    className={`rounded-full px-3 py-1 ${statusStyles[booking.status]
                                        }`}
                                >
                                    {booking.status
                                        .replaceAll("_", " ")
                                        .toLowerCase()
                                        .replace(/\b\w/g, (c) =>
                                            c.toUpperCase()
                                        )}
                                </Badge>
                            </TableCell>

                            <TableCell className="px-6 py-6 text-right">
                                <BookingActions
                                    booking={booking}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}