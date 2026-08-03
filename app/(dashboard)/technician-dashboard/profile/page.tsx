import { getMe } from "@/service/getMe";
import ProfileCard from "../../_components/ProfileCard";
import TechnicianCard from "../_components/TechnicianCard";

export default async function ProfilePage() {
    const result = await getMe();

    const profile = result?.data?.profile ?? null;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <p className="text-muted-foreground">
                        Manage your account information.
                    </p>
                </div>
            </div>

            {/* <EditUserInfo profile={profile}></EditUserInfo> */}
            <ProfileCard profile={profile} />


            {profile.technicianProfile && (
                <TechnicianCard technician={profile.technicianProfile} />
            )}
        </div>
    );
}