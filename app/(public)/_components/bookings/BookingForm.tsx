"use client";

import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "../../_actions/createBooking";
import { getAvailableBookingSlot } from "../../_actions/getAvailableBookingSlot";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

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

export function BookingForm({ service }: BookingFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [bookedSlots, setBookedSlots] = useState<number[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
    const [slotLoading, setSlotLoading] = useState(false);

    const [state, action, pending] = useActionState(
        createBooking,
        null
    );


    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(
                state.message || "Booking created successfully"
            );
            setTimeout(() => {
                router.push("/customer-dashboard/my-bookings");
            }, 1000);
        } else {
            toast.error(
                state.message || "Failed to create booking"
            );
        }

    }, [state]);


    const slots = [
        { id: 1, label: "09:00 - 11:00" },
        { id: 2, label: "11:00 - 01:00" },
        { id: 3, label: "02:00 - 04:00" },
        { id: 4, label: "04:00 - 06:00" },
    ];


    const handleDateChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const date = e.target.value;

        setSelectedSlots([]);
        setSlotLoading(true);

        const params = new URLSearchParams(searchParams.toString());

        params.set("date", date);
        params.set(
            "technicianId",
            service.technicianId
        );

        router.replace(
            `${pathname}?${params.toString()}`
        );


        try {
            const res = await getAvailableBookingSlot(
                date,
                service.technicianId
            );

            setBookedSlots(res.data);

        } catch (error) {
            toast.error("Failed to load available slots");

        } finally {
            setSlotLoading(false);
        }
    };


    const handleSlotChange = (slotId: number) => {
        setSelectedSlots((prev) =>
            prev.includes(slotId)
                ? prev.filter((id) => id !== slotId)
                : [...prev, slotId]
        );
    };


    const tomorrow = new Date();
    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    const minDate =
        tomorrow.toISOString().split("T")[0];


    return (
        <div className="grid gap-8 lg:grid-cols-3">

            <Card className="lg:col-span-2">

                <CardHeader>
                    <CardTitle>
                        Booking Information
                    </CardTitle>
                </CardHeader>


                <CardContent>

                    <form
                        action={action}
                        className="space-y-6"
                    >

                        <input
                            type="hidden"
                            name="serviceId"
                            value={service.id}
                        />


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



                        <div className="space-y-2">

                            <Label>
                                Select Time Slot
                            </Label>


                            <div className="grid grid-cols-2 gap-3">

                                {slots.map((slot) => {

                                    const isBooked =
                                        bookedSlots.includes(slot.id);

                                    const isSelected =
                                        selectedSlots.includes(slot.id);


                                    return (

                                        <label
                                            key={slot.id}
                                            className={`flex items-center gap-2 rounded-md border p-3 ${isBooked || slotLoading
                                                ? "cursor-not-allowed bg-gray-100 opacity-50"
                                                : isSelected
                                                    ? "cursor-pointer border-primary bg-primary/10"
                                                    : "cursor-pointer"
                                                }`}
                                        >

                                            <input
                                                type="checkbox"
                                                value={slot.id}
                                                checked={isSelected}
                                                disabled={
                                                    isBooked ||
                                                    slotLoading
                                                }
                                                onChange={() =>
                                                    handleSlotChange(
                                                        slot.id
                                                    )
                                                }
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


                            <input
                                type="hidden"
                                name="slots"
                                value={JSON.stringify(
                                    selectedSlots
                                )}
                            />

                        </div>




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




                        <Button
                            type="submit"
                            className="w-full"
                            disabled={pending}
                        >
                            {
                                pending
                                    ? "Booking..."
                                    : "Book Now"
                            }
                        </Button>


                    </form>

                </CardContent>

            </Card>

        </div>
    );
}