"use server"



export const getCategories = async () => {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    })

    const result = await res.json();
    return result;
}