"use server"
import { cookies } from "next/headers";

export const getTechnicianDetails = async (technicianId: string) => {

    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }


    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value || null;

    // if (!accessToken) {
    //     return {
    //         success: false,
    //         message: "User not logged in!"
    //     }
    // }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/${technicianId}`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["technician-details"]
        }
    })

    const result = await res.json();
    // console.log(result.data);
    return result;
}