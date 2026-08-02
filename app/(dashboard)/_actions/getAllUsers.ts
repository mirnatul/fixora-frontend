"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const getAllUsers = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/admin/users`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        }
    })

    const result = await res.json();

    // console.log(result);
    return result;
}

interface IUpdateStatusPayload {
    userId: string;
    status: string;
}
export const updateUserStatus = async (payload: IUpdateStatusPayload) => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/admin/userStatus`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();

    console.log(result);
    if (result.success) {
        revalidatePath('/admin-dashboard/all-users')
    }

    return result;
}