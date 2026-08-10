"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateCategory = async (
    categoryId: string,
    formData: FormData
) => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        // ==========================================
        // CREATE PAYLOAD
        // ==========================================

        const payload = {
            name: formData.get("name") as string,

            description:
                formData.get("description") as string,

            imageUrl:
                formData.get("imageUrl") as string,

            imagePublicId:
                formData.get("imagePublicId") as string,
        };

        // ==========================================
        // BACKEND PATCH REQUEST
        // ==========================================

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/category/${categoryId}`,
            {
                method: "PATCH",

                headers: {
                    Cookie: `accessToken=${accessToken}`,

                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify(payload),
            }
        );

        const text = await res.text();

        let result;

        try {
            result = JSON.parse(text);
        } catch {
            result = {
                message: text,
            };
        }

        if (!res.ok) {
            return {
                success: false,

                message:
                    result.message ??
                    "Failed to update category.",
            };
        }

        revalidatePath(
            "/admin-dashboard/all-categories"
        );

        return {
            success: true,

            message:
                result.message ??
                "Category updated successfully.",
        };
    } catch (error) {
        console.error(
            "❌ Update category error:",
            error
        );

        return {
            success: false,

            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
        };
    }
};
