import { Navbar } from "@/components/shared/Navbar";
import { getAllTechnicians } from "../_actions/getAllTechnicians";
import { TechnicianGrid } from "../_components/technician/technicianGrid";
import { getMe } from "@/service/getMe";

export default async function TechniciansPage() {
    const result = await getAllTechnicians()
    const user = await getMe()

    // console.log(result.data);

    return (
        <div>
            <Navbar user={user}></Navbar>
            <div className="container py-10 max-w-310 mx-auto">
                <h1 className="mb-8 text-3xl font-bold">
                    Technicians
                </h1>

                <TechnicianGrid
                    technicians={result.data.data ?? []}
                />
            </div>
        </div>
    );
}