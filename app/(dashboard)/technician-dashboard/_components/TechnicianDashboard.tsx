import {
    CalendarCheck,
    Clock3,
    CheckCircle2,
    Wrench,
    XCircle,
    Wallet,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardData = {
    totalBookings: number;
    bookings: {
        pending: number;
        accepted: number;
        inProgress: number;
        completed: number;
        cancelled: number;
    };
    totalEarnings: number;
};

export default function TechnicianDashboard({
    data,
}: {
    data: DashboardData;
}) {
    const completionRate =
        data.totalBookings === 0
            ? 0
            : Math.round((data.bookings.completed / data.totalBookings) * 100);

    const statusCards = [
        {
            title: "Pending",
            value: data.bookings.pending,
            icon: Clock3,
            color:
                "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
        },
        {
            title: "Accepted",
            value: data.bookings.accepted,
            icon: CalendarCheck,
            color:
                "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400",
        },
        {
            title: "In Progress",
            value: data.bookings.inProgress,
            icon: Wrench,
            color:
                "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
        },
        {
            title: "Completed",
            value: data.bookings.completed,
            icon: CheckCircle2,
            color:
                "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
        },
        {
            title: "Cancelled",
            value: data.bookings.cancelled,
            icon: XCircle,
            color:
                "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Technician Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Overview of your bookings and earnings.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Bookings
                            </p>

                            <h2 className="mt-2 text-4xl font-bold">
                                {data.totalBookings}
                            </h2>
                        </div>

                        <div className="rounded-2xl bg-primary/10 p-4 transition-transform duration-300 group-hover:scale-110">
                            <CalendarCheck className="size-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Earnings
                            </p>

                            <h2 className="mt-2 text-4xl font-bold">
                                ৳{data.totalEarnings.toLocaleString()}
                            </h2>
                        </div>

                        <div className="rounded-2xl bg-emerald-100 p-4 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950/30">
                            <Wallet className="size-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Completion Rate
                            </p>

                            <h2 className="mt-2 text-4xl font-bold">
                                {completionRate}%
                            </h2>
                        </div>

                        <div className="rounded-2xl bg-sky-100 p-4 transition-transform duration-300 group-hover:scale-110 dark:bg-sky-950/30">
                            <CheckCircle2 className="size-8 text-sky-600 dark:text-sky-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Booking Status</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
                        {statusCards.map((status) => {
                            const Icon = status.icon;

                            return (
                                <Card
                                    key={status.title}
                                    className="group border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className={`rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 ${status.color}`}
                                            >
                                                <Icon className="size-7" />
                                            </div>

                                            <span className="text-4xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-110">
                                                {status.value}
                                            </span>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="font-semibold">{status.title}</h3>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {data.totalBookings > 0
                                                    ? `${Math.round(
                                                        (status.value / data.totalBookings) * 100
                                                    )}% of total bookings`
                                                    : "No bookings yet"}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}