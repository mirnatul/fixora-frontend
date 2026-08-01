"use server";

import { revalidateTag } from "next/cache";


export const createBooking = async (prevState: any, formData: FormData) => {
    const payload = {
        serviceId: formData.get("serviceId") as string,
        bookingDate: formData.get("bookingDate") as string,
        address: formData.get("address") as string,
        slot: JSON.parse(formData.get("slot") as string),
    };

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );
    revalidateTag("my-bookings", "max");

    const result = await res.json();

    return {
        success: true,
        message: result.message || "Booking created successfully.",
        data: result.data,
    };
};