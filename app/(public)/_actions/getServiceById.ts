"use server"

export const getServiceById = async (serviceId: string) => {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
    })

    const result = await res.json();

    // console.log(result);
    return result;
}