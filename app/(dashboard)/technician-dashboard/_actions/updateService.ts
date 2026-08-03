"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const updateService = async (serviceId: string, prevState: any, formData: FormData) => {
    const payload = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        duration: Number(formData.get("duration")),
        location: formData.get("location") as string,
        active: formData.get("active") === "on",
    };

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();
    revalidatePath("/technician-dashboard/my-services")

    console.log(result);
    return result;
}