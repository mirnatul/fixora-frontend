"use server";

export const getTopTechnicians = async () => {

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technician/top-technicians`
    );

    const result = await res.json();
    return result;
};