"use server"

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const getServiceById = async (serviceId: string) => {

    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["services"]
        }
    })

    const result = await res.json();

    // console.log(result);
    return result;
}