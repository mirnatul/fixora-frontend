"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/customer-dashboard/my-bookings");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 border">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-green-100 p-4">
                        <CheckCircle
                            className="h-16 w-16 text-green-600"
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-3">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment has been completed successfully.
                    Your booking is now confirmed.
                </p>

                <Button
                    className="w-full"
                    onClick={() =>
                        router.push(
                            "/customer-dashboard/my-bookings"
                        )
                    }
                >
                    View My Bookings
                </Button>

                <p className="text-sm text-gray-500 mt-4">
                    Redirecting to your bookings in 5 seconds...
                </p>
            </div>
        </div>
    );
}