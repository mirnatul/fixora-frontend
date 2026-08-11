// import { Navbar } from "@/components/shared/Navbar";
// import { getAllTechnicians } from "../_actions/getAllTechnicians";
// import { TechnicianGrid } from "../_components/technician/technicianGrid";
// import { getMe } from "@/service/getMe";

// export default async function TechniciansPage() {
//     const result = await getAllTechnicians()
//     const user = await getMe()

//     // console.log(result.data);

//     return (
//         <div>
//             <Navbar user={user}></Navbar>
//             <div className="container py-10 max-w-310 mx-auto">
//                 <h1 className="mb-8 text-3xl font-bold">
//                     Technicians
//                 </h1>

//                 <TechnicianGrid
//                     technicians={result.data.data ?? []}
//                 />
//             </div>
//         </div>
//     );
// }



import { Navbar } from "@/components/shared/Navbar";
import { getAllTechnicians } from "../_actions/getAllTechnicians";
import { TechnicianGrid } from "../_components/technician/technicianGrid";
import { getMe } from "@/service/getMe";

export default async function TechniciansPage() {
    const [result, user] = await Promise.all([
        getAllTechnicians(),
        getMe(),
    ]);

    const technicians = result?.data?.data ?? [];

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} />

            <main>
                {/* Header */}
                <section className="border-b border-border/60 bg-white dark:bg-background">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#007A55]" />
                                <span className="text-sm font-semibold uppercase tracking-wider text-[#007A55]">
                                    Trusted Professionals
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Find the right technician
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                Connect with skilled and trusted professionals
                                ready to help with your home service needs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technicians */}
                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    {technicians.length > 0 ? (
                        <TechnicianGrid technicians={technicians} />
                    ) : (
                        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-white dark:bg-background">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#007A55]/10">
                                    <span className="text-2xl text-[#007A55]">
                                        ?
                                    </span>
                                </div>

                                <h2 className="text-lg font-semibold text-foreground">
                                    No technicians found
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    There are currently no technicians
                                    available.
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
