"use server"

import { cookies } from "next/headers";

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const getTechnicianServices = async (userId: string) => {

    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/technician`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        }
    })

    const result = await res.json();

    // console.log(result);
    return result;
}