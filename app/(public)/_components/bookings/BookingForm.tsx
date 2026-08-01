"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "../../_actions/createBooking";
import { getAvailableBookingSlot } from "../../_actions/getAvailableBookingSlot";

import { useRouter, usePathname, useSearchParams } from "next/navigation";



interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    technicianId: string;
    technician: {
        user: {
            name: string;
        };
    };
}

interface BookingFormProps {
    service: Service;
}

const initialState = {
    success: false,
    message: "",
    data: null
};

export function BookingForm({ service }: BookingFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedDate, setSelectedDate] = useState("");
    const [bookedSlots, setBookedSlots] = useState<number[]>([]);

    const [state, action, pending] = useActionState(
        createBooking,
        initialState
    );

    const slots = [
        { id: 1, label: "09:00 - 11:00" },
        { id: 2, label: "11:00 - 01:00" },
        { id: 3, label: "02:00 - 04:00" },
        { id: 4, label: "04:00 - 06:00" },
    ];

    const [slotLoading, setSlotLoading] = useState(false);

    const handleDateChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const date = e.target.value;
        console.log(date);

        setSelectedDate(date);
        setSlotLoading(true)

        const params = new URLSearchParams(searchParams.toString());

        params.set("date", date);
        params.set("technicianId", service.technicianId);

        router.replace(`${pathname}?${params.toString()}`);


        try {
            const res = await getAvailableBookingSlot(
                date,
                service.technicianId
            );

            setBookedSlots(res.data);
        } finally {
            setSlotLoading(false);
        }
    };


    // only pick date from tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDate = tomorrow.toISOString().split("T")[0];

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Booking Form */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Booking Information</CardTitle>
                </CardHeader>

                <CardContent>
                    <form action={action} className="space-y-6">
                        <input
                            type="hidden"
                            name="serviceId"
                            value={service.id}
                        />

                        {/* Booking Date */}
                        <div className="space-y-2">
                            <Label htmlFor="bookingDate">
                                Booking Date
                            </Label>

                            <Input
                                id="bookingDate"
                                name="bookingDate"
                                type="date"
                                min={minDate}
                                onChange={handleDateChange}
                                required
                            />
                        </div>

                        {/* Time Slot */}
                        <div className="space-y-2">
                            <Label>Select Time Slot</Label>

                            <div className="grid grid-cols-2 gap-3">
                                {slots.map((slot) => {
                                    const isBooked = bookedSlots?.includes(slot.id);

                                    return (
                                        <label
                                            key={slot.id}
                                            className={`flex items-center gap-2 rounded-md border p-3 ${isBooked || slotLoading
                                                    ? "cursor-not-allowed bg-gray-100 opacity-50"
                                                    : "cursor-pointer"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="slot"
                                                value={slot.id}
                                                disabled={isBooked || slotLoading}
                                                required={!isBooked}
                                            />

                                            {slot.label}
                                            {isBooked && (
                                                <span className="ml-auto text-xs text-red-500">
                                                    Booked
                                                </span>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">
                                Service Address
                            </Label>

                            <Textarea
                                id="address"
                                name="address"
                                rows={3}
                                placeholder="Enter your address..."
                                required
                            />
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes">
                                Notes (Optional)
                            </Label>

                            <Textarea
                                id="notes"
                                name="notes"
                                rows={4}
                                placeholder="Additional information..."
                            />
                        </div>

                        {state.message && (
                            <p
                                className={`text-sm ${state.success
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {state.message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={pending}
                        >
                            {pending ? "Booking..." : "Book Now"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}