"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createAvailability(
    prevState: unknown,
    formData: FormData
) {
    const payload = {
        date: formData.get("date"),
        slot: JSON.parse(formData.get("slot") as string),
    };

    console.log(payload);

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technician/availability`,
        {
            method: "PUT",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    revalidatePath("/technician/availability");

    return result;
}