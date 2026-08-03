"use server"

export const getTechnicianDetails = async (technicianId: string) => {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/${technicianId}`, {
    })

    const result = await res.json();
    // console.log(result.data);
    return result;
}