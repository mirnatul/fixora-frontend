import { getMe } from "@/service/getMe";
import { getTechnicianDetails } from "../../_actions/getTechnicianDetails"
import { TechnicianHeader } from "../../_components/technician/technician-header"
import { TechnicianReviews } from "../../_components/technician/technician-reviews"
import { TechnicianServices } from "../../_components/technician/technician-services"


export default async function TechnicianPage({ params }: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;
    const technicianData = await getTechnicianDetails(id as string);
    const user = await getMe()
    const userRole = user.data.profile.role;
    // console.log(technicianData);
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <TechnicianHeader technician={technicianData.data} reviews={technicianData.data.reviews} />

                {/* Services and Reviews Grid */}
                <div className="mt-12 grid gap-12 lg:grid-cols-3">
                    {/* Services Section */}
                    <div className="lg:col-span-2">
                        <TechnicianServices services={technicianData.data.service} userRole={userRole} />
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <TechnicianReviews reviews={technicianData.data.reviews} />
                    </div>
                </div>
            </div>
        </main>
    )
}
