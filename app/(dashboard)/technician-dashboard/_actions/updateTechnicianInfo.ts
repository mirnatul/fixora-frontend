"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateTechnicianInfo = async (
    prevState: any,
    formData: FormData
) => {
    const payload = {
        bio: formData.get("bio"),
        experience: Number(formData.get("experience")),
    };

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technician/profile`,
        {
            method: "PUT",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (res.ok) {
        revalidatePath("/technician-dashboard/profile");
    }

    return result;
};