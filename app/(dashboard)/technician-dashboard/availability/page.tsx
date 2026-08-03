import { getMe } from "@/service/getMe";
import AvailabilityForm from "../_components/AvailabilityForm";

export default async function AvailabilityPage() {
    const user = await getMe();
    const technicianId = user.data.profile.technicianProfile.id;

    return (
        <div className="container mx-auto flex justify-center pt-10">
            <AvailabilityForm technicianId={technicianId} />
        </div>
    );
}