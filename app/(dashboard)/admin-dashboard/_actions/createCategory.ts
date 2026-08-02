"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createCategory = async (
    prevState: any,
    formData: FormData
) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        const payload = {
            name: formData.get("name"),
            description: formData.get("description"),
        };

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/category`,
            {
                method: "POST",
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message ?? "Failed to create category",
            };
        }

        revalidatePath("/admin-dashboard/all-categories");

        return {
            success: true,
            message: result.message ?? "Category created successfully",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};