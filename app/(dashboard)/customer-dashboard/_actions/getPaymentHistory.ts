"use server"

import { cookies } from "next/headers";

export const getPaymentHistory = async (userId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        }
    })

    const result = await res.json();

    return result;
}