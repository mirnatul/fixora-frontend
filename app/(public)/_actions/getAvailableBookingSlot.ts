"use server"

export const getAvailableBookingSlot = async (
    date: string,
    technicianId: string
) => {
    const params = new URLSearchParams({
        date,
        technicianId,
    });

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings/availability?${params.toString()}`
    );

    const data = await res.json();

    return data;
};