"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createAvailability } from "../_actions/createAvailability";
import { getAvailableBookingSlot } from "@/app/(public)/_actions/getAvailableBookingSlot";

const slots = [
    { id: 1, label: "09:00 - 11:00" },
    { id: 2, label: "11:00 - 01:00" },
    { id: 3, label: "02:00 - 04:00" },
    { id: 4, label: "04:00 - 06:00" },
];

interface AvailabilityFormProps {
    technicianId: string;
}

export default function AvailabilityForm({
    technicianId,
}: AvailabilityFormProps) {
    const [bookedSlots, setBookedSlots] = useState<number[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [slotLoading, setSlotLoading] = useState(false);

    const [state, action, pending] = useActionState(
        createAvailability,
        null
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDate = tomorrow.toISOString().split("T")[0];

    const fetchBookedSlots = async (date: string) => {
        if (!date) return;

        setSlotLoading(true);

        try {
            const res = await getAvailableBookingSlot(date, technicianId);
            setBookedSlots(res.data ?? []);
        } catch (error) {
            console.error(error);
            setBookedSlots([]);
        } finally {
            setSlotLoading(false);
        }
    };

    const handleDateChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const date = e.target.value;

        setSelectedDate(date);
        setSelectedSlots([]);

        await fetchBookedSlots(date);
    };

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(
                state.message || "Availability created successfully."
            );

            if (selectedDate) {
                fetchBookedSlots(selectedDate);
            }

            setSelectedSlots([]);
        } else {
            toast.error(state.message || "Something went wrong.");
        }
    }, [state, selectedDate]);

    const handleSlotChange = (slotId: number) => {
        setSelectedSlots((prev) =>
            prev.includes(slotId)
                ? prev.filter((id) => id !== slotId)
                : [...prev, slotId]
        );
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Block Time Slots</CardTitle>
            </CardHeader>

            <CardContent>
                <form action={action} className="space-y-6">
                    <input
                        type="hidden"
                        name="technicianId"
                        value={technicianId}
                    />

                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>

                        <Input
                            id="date"
                            type="date"
                            name="date"
                            min={minDate}
                            value={selectedDate}
                            onChange={handleDateChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Select Time Slots</Label>

                        <div className="grid grid-cols-2 gap-3">
                            {slots.map((slot) => {
                                const isBooked = bookedSlots.includes(slot.id);
                                const isSelected =
                                    selectedSlots.includes(slot.id);

                                return (
                                    <label
                                        key={slot.id}
                                        className={`flex items-center gap-2 rounded-md border p-3 transition-colors ${isBooked || slotLoading
                                            ? "cursor-not-allowed bg-gray-100 opacity-50"
                                            : isSelected
                                                ? "cursor-pointer border-primary bg-primary/10"
                                                : "cursor-pointer hover:border-primary"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            disabled={
                                                isBooked || slotLoading
                                            }
                                            onChange={() =>
                                                handleSlotChange(slot.id)
                                            }
                                        />

                                        <span>{slot.label}</span>

                                        {isBooked && (
                                            <span className="ml-auto text-xs font-medium text-red-500">
                                                Booked
                                            </span>
                                        )}
                                    </label>
                                );
                            })}
                        </div>

                        <input
                            type="hidden"
                            name="slot"
                            value={JSON.stringify(selectedSlots)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={
                            pending ||
                            slotLoading ||
                            selectedSlots.length === 0
                        }
                    >
                        {pending ? "Saving..." : "Save Availability"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}