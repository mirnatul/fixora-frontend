import {
    CalendarCheck,
    DollarSign,
    Users,
    Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsProps {
    stats: {
        totalUsers: number;
        totalBookings: number;
        totalTechnicians: number;
        revenue: number;
    };
}

export default function DashboardStats({
    stats,
}: DashboardStatsProps) {

    // console.log(stats.totalBookings);
    const cards = [
        {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
        },
        {
            title: "Total Bookings",
            value: stats.totalBookings.toLocaleString(),
            icon: CalendarCheck,
        },
        {
            title: "Revenue",
            value: `৳${stats.revenue.toLocaleString()}`,
            icon: DollarSign,
        },
        {
            title: "Technicians",
            value: stats.totalTechnicians.toLocaleString(),
            icon: Wrench,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Card
                            key={card.title}
                            className="group overflow-hidden border bg-linear-to-br from-background to-muted/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <CardContent className="relative flex items-center justify-between p-6">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />

                                <div className="relative">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </p>

                                    <h2 className="mt-3 text-4xl font-bold tracking-tight">
                                        {card.value}
                                    </h2>
                                </div>

                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary">
                                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}