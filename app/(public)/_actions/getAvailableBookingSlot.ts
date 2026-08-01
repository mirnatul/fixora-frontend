"use server"

export const getAvailableBookingSlot = async (
    date: string,
    technicianId: string
) => {
    const params = new URLSearchParams({
        date,
        technicianId,
    });

    console.log(date, technicianId);

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings/availability?${params.toString()}`
    );

    console.log(res);
    return res.json();
};