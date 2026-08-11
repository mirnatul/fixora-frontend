// "use server"

// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";

// export const updateService = async (serviceId: string, prevState: any, formData: FormData) => {
//     const payload = {
//         title: formData.get("title") as string,
//         description: formData.get("description") as string,
//         price: Number(formData.get("price")),
//         duration: Number(formData.get("duration")),
//         location: formData.get("location") as string,
//         active: formData.get("active") === "on",
//     };

//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
//         method: "PATCH",
//         headers: {
//             Cookie: `accessToken=${accessToken}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload)
//     })

//     const result = await res.json();
//     revalidatePath("/technician-dashboard/my-services")

//     console.log(result);
//     return result;
// }


"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateService = async (
    serviceId: string,
    formData: FormData
) => {
    try {
        // ============================================================
        // GET ACCESS TOKEN
        // ============================================================

        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized. Please login again.",
            };
        }

        // ============================================================
        // CREATE PAYLOAD
        // ============================================================

        const payload = {
            title: formData.get("title") as string,
            description:
                formData.get("description") as string,

            price: Number(
                formData.get("price")
            ),

            location:
                formData.get("location") as string,

            active:
                formData.get("active") === "true",

            // ========================================================
            // IMAGE
            // ========================================================

            imageUrl:
                formData.get("imageUrl") as string || null,

            imagePublicId:
                formData.get("imagePublicId") as string || null,
        };

        // console.log(payload);

        // ============================================================
        // UPDATE SERVICE
        // ============================================================

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/services/${serviceId}`,
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

        // ============================================================
        // HANDLE BACKEND ERROR
        // ============================================================

        if (!res.ok) {
            return {
                success: false,
                message:
                    result.message ||
                    "Failed to update service.",
            };
        }

        // ============================================================
        // REVALIDATE SERVICE PAGE
        // ============================================================

        revalidatePath(
            "/technician-dashboard/my-services"
        );

        console.log("Updated service:", result);

        return result;
    } catch (error) {
        console.error(
            "Update service error:",
            error
        );

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong while updating the service.",
        };
    }
};
