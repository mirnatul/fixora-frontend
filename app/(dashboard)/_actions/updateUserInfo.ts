"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateUserInfo = async (
    prevState: any,
    formData: FormData
) => {

    const payload = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        profileImage: formData.get("profileImage"),
    };

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/me/update`,
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
        revalidatePath("/admin-dashboard/profile");
        revalidatePath("/customer-dashboard/profile");
        revalidatePath("/technician-dashboard/profile");
    }

    return result;
};