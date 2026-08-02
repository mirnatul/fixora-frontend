"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const createBooking = async (prevState: any, formData: FormData) => {
    const payload = {
        serviceId: formData.get("serviceId") as string,
        bookingDate: formData.get("bookingDate") as string,
        address: formData.get("address") as string,
        notes: formData.get("notes") as string,
        slot: JSON.parse(formData.get("slots") as string) as number[],
    };

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    console.log(payload);

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/bookings`,
        {
            method: "POST",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    revalidatePath("/customer-dashboard/my-bookings")
    redirect("/customer-dashboard/my-bookings")
    // const result = await res.json();
};