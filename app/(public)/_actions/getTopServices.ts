"use server";

export const getTopServices = async () => {

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/services/top-services`
    );

    const result = await res.json();
    return result;
};