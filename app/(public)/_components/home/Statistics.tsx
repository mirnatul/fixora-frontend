import {
    Users,
    BriefcaseBusiness,
    UserCheck,
    Star,
} from "lucide-react";
import React from "react";

const Statistics = () => {
    const statistics = [
        {
            icon: Users,
            value: "1200+",
            label: "Happy Customers",
        },
        {
            icon: BriefcaseBusiness,
            value: "2500+",
            label: "Services Provided",
        },
        {
            icon: UserCheck,
            value: "150+",
            label: "Trusted Professionals",
        },
        {
            icon: Star,
            value: "4.8/5",
            label: "Customer Rating",
        },
    ];

    return (
        <section className="w-full">
            <div className="overflow-hidden bg-green-50 shadow-[0_20px_55px_rgba(22,127,81,0.08)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {statistics.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className={`
                                    relative flex min-h-50
                                    flex-col items-center justify-center
                                    px-10 py-12 text-center
                                    transition-all duration-300
                                    hover:bg-[#167F51]/5

                                    /* LARGE — vertical dividers */
                                    ${index < 3
                                        ? "lg:border-r-2 lg:border-dashed lg:border-[#167F51]/30"
                                        : ""
                                    }

                                    /* MEDIUM — vertical divider */
                                    ${index % 2 === 0
                                        ? "md:border-r-2 md:border-dashed md:border-[#167F51]/30"
                                        : ""
                                    }

                                    /* MEDIUM — horizontal divider between rows */
                                    ${index < 2
                                        ? "md:max-lg:border-b-2 md:max-lg:border-dashed md:max-lg:border-[#167F51]/30"
                                        : ""
                                    }

                                    /* SMALL — horizontal dividers */
                                    ${index < 3
                                        ? "max-md:border-b-2 max-md:border-dashed max-md:border-[#167F51]/30"
                                        : ""
                                    }

                                    /* Remove medium border-right from last column */
                                    md:max-lg:nth-[2n]:border-r-0

                                    /* Remove large border-right from last item */
                                    lg:last:border-r-0
                                `}
                            >
                                {/* Icon */}
                                <div className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#167F51]/10 ring-1 ring-[#167F51]/15">
                                    <Icon className="h-7 w-7 text-[#167F51]" />
                                </div>

                                {/* Number */}
                                <h3 className="text-3xl font-extrabold tracking-tight text-[#167F51] sm:text-4xl">
                                    {stat.value}
                                </h3>

                                {/* Label */}
                                <p className="mt-2 text-sm font-semibold tracking-wide text-gray-600">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Statistics;