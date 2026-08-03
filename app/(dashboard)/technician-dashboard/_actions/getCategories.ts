"use server"

import { cookies } from "next/headers";

export const getCategories = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    })

    const result = await res.json();

    // console.log(result);
    return result;
}