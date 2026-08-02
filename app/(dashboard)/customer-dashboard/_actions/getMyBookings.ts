"use server"

import { cookies } from "next/headers";

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const getMyBookings = async (userId: string) => {

    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/user/${userId}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        next: {
            tags: [`user-bookings`]
        }
    })

    const result = await res.json();

    // console.log(result);
    return result;
}