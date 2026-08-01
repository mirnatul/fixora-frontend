"use server"

// export const getPublicNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
export const getAllServices = async () => {

    // const params = new URLSearchParams()
    // if (query && query.searchTerm) {
    //     params.set("searchTerm", query.searchTerm as string)
    // }


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["all-services"]
        }
    })

    const result = await res.json();

    // console.log(result.data.services);
    return result;
}