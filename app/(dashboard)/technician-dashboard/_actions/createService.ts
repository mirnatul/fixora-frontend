// "use server";

// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";

// export const createService = async (
//     prevState: any,
//     formData: FormData
// ) => {
//     try {
//         const cookieStore = await cookies();
//         const accessToken = cookieStore.get("accessToken")?.value;

//         const payload = {
//             title: formData.get("title"),
//             description: formData.get("description"),
//             price: Number(formData.get("price")),
//             duration: Number(formData.get("duration")),
//             location: formData.get("location"),
//             categoryId: formData.get("categoryId"),
//         };

//         const res = await fetch(
//             `${process.env.BACKEND_API_URL}/api/services`,
//             {
//                 method: "POST",
//                 headers: {
//                     Cookie: `accessToken=${accessToken}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             }
//         );

//         const result = await res.json();

//         if (!res.ok) {
//             return {
//                 success: false,
//                 message:
//                     result.message ?? "Failed to create service",
//             };
//         }

//         revalidatePath("/technician-dashboard/my-services");

//         return {
//             success: true,
//             message:
//                 result.message ?? "Service created successfully",
//         };
//     } catch (error) {
//         console.error(error);

//         return {
//             success: false,
//             message: "Something went wrong.",
//         };
//     }
// };

"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createService = async (
    formData: FormData
) => {
    try {
        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        const payload = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: Number(formData.get("price")),
            location: formData.get("location"),
            categoryId: formData.get("categoryId"),
            imageUrl: formData.get("imageUrl"),
            imagePublicId:
                formData.get("imagePublicId"),
            technicianId:
                formData.get("technicianId"),
        };

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/services`,
            {
                method: "POST",
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
                    "Failed to create service.",
            };
        }

        revalidatePath(
            "/technician-dashboard/my-services"
        );

        return {
            success: true,
            message:
                result.message ??
                "Service created successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
        };
    }
};
