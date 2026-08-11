import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";

import { getServiceById } from "../_actions/getServiceById";
import { BookingForm } from "../_components/bookings/BookingForm";

interface PageProps {
    searchParams: Promise<{
        serviceId?: string;
    }>;
}

export default async function BookingPage({
    searchParams,
}: PageProps) {
    const { serviceId } = await searchParams;

    const me = await getMe();

    if (!serviceId) {
        return (
            <div>
                <Navbar user={me} />

                <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                    <p className="text-muted-foreground">
                        Service ID is missing.
                    </p>
                </main>
            </div>
        );
    }

    const service = await getServiceById(serviceId);

    if (!service) {
        return (
            <div>
                <Navbar user={me} />

                <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                    <p className="text-muted-foreground">
                        Service not found.
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Navbar user={me} />

            <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-3xl">
                    <BookingForm service={service} />
                </div>
            </main>
        </div>
    );
}