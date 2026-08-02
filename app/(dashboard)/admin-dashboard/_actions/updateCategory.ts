"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateCategory = async (
    categoryId: string,
    prevState: any,
    formData: FormData
) => {
    const payload = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
    };

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/category/${categoryId}`,
        {
            method: "PATCH",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    revalidatePath("/admin-dashboard/categories");

    console.log(result);
    return result;
};