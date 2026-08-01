"use server"

import { cookies } from "next/headers";

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const getCategories = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    })

    const result = await res.json();

    // console.log(result);
    return result;
}