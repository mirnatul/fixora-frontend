import { notFound } from "next/navigation";

import { BookingForm } from "../../_components/bookings/BookingForm";
import { getServiceById } from "../../_actions/getServiceById";


export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // console.log(id);


    const result = await getServiceById(id)
    // console.log(result);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-6xl py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Book a Service
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Complete the form below to confirm your booking.
                </p>
            </div>

            <BookingForm service={result.data} />
        </div>
    );
}