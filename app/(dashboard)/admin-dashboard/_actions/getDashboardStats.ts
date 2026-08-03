"use server";

import { cookies } from "next/headers";

export const getDashboardStats = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/users/admin/stats`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return await res.json();
};