"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteService(serviceId: string) {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        }
    }
    );
    const result = await res.json();
    console.log("Delete response:", res.status, result);

    if (!res.ok) {
        throw new Error("Failed to delete service");
    }

    revalidatePath("/technician/services");
}