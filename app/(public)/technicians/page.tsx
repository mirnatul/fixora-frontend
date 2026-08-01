import { getAllTechnicians } from "../_actions/getAllTechnicians";
import { TechnicianGrid } from "../_components/technician/technicianGrid";

export default async function TechniciansPage() {
    const result = await getAllTechnicians()

    // console.log(result.data);

    return (
        <div className="container py-10 max-w-310 mx-auto">
            <h1 className="mb-8 text-3xl font-bold">
                Technicians
            </h1>

            <TechnicianGrid
                technicians={result.data.data ?? []}
            />
        </div>
    );
}