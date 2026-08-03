"use server";

type QueryParams = {
    [key: string]: string | string[] | undefined;
};

export const getAllServices = async (query?: QueryParams) => {
    console.log("get all service called", query);
    const params = new URLSearchParams();

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (!value) return;

            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else {
                params.set(key, value);
            }
        });
    }
    // console.log(query);

    // console.log(params.toString());

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/services?${params.toString()}`,
        {
            cache: "no-cache",
        }
    );

    const result = await res.json();

    console.log("API URL:", `${process.env.BACKEND_API_URL}/api/services?${params.toString()}`);
    console.log("Backend response:", result);
    return result;
};