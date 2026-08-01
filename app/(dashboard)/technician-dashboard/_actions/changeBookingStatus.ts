"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const changeBookingStatus = async (
    bookingId: string,
    status: string
) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings/update-status/${bookingId}`,
        {
            method: "PATCH",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }
    );

    const result = await res.json();

    if (res.ok) {
        revalidatePath("/technician-dashboard/bookings-i-get");
    }

    return result;
};