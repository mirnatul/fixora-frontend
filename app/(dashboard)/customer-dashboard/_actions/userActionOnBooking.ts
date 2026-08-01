"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from 'next/cache';

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const cancelBooking = async (bookingId: string, userId: string) => {

    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/cancel-booking/${bookingId}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        // revalidateTag(`user-bookings-${userId}`)
    })

    const result = await res.json();
    if (result.success) {
        revalidateTag(`user-bookings-${userId}`, { expire: 0 })
    }

    console.log(result);
    return result;
}


// payment
export const doPayment = async (bookingId: string, userId: string) => {
    console.log("Hit do payment");
    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/checkout/${bookingId}`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        // revalidateTag(`user-bookings-${userId}`)
    })

    const result = await res.json();
    return await result;
}


interface IPayload {
    rating: number,
    comment: string
}


export const leaveReview = async (bookingId: string, payload: IPayload, userId: string) => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/review/${bookingId}`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();

    // console.log(result);
    if (result.success) {
        revalidateTag(`user-bookings-${userId}`, { expire: 0 })
    }

    return result;
}