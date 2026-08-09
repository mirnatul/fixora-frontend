import {
    Award,
    CalendarCheck,
    CreditCard,
    ShieldCheckIcon,
} from "lucide-react";
import React from "react";

const FeatureTop = () => {
    const features = [
        {
            icon: ShieldCheckIcon,
            title: "100% Safe & Secure",
            description:
                "Your personal information and payments are protected, so you can book with complete confidence.",
        },
        {
            icon: Award,
            title: "Best Price Guarantee",
            description:
                "Enjoy reliable, high-quality home services at fair and transparent prices.",
        },
        {
            icon: CalendarCheck,
            title: "Quick & Easy Booking",
            description:
                "Find the right professional and schedule your service in just a few simple clicks.",
        },
        {
            icon: CreditCard,
            title: "Secure Payment",
            description:
                "Pay conveniently through trusted payment methods with secure transactions.",
        },
    ];

    return (
        <section className="w-full">
            <div className="overflow-hidden bg-[#167F51] shadow-[0_20px_55px_rgba(22,127,81,0.28)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className={`
                                    relative flex min-h-[245px] flex-col
                                    justify-center
                                    px-10 py-14
                                    transition-all duration-300
                                    hover:bg-[#126B45]

                                    /* LARGE — vertical dividers */
                                    ${index < 3
                                        ? "lg:border-r-2 lg:border-dashed lg:border-white/30"
                                        : ""
                                    }

                                    /* MEDIUM — vertical divider */
                                    ${index % 2 === 0
                                        ? "md:border-r-2 md:border-dashed md:border-white/30"
                                        : ""
                                    }

                                    /* MEDIUM — horizontal divider between rows */
                                    ${index < 2
                                        ? "md:max-lg:border-b-2 md:max-lg:border-dashed md:max-lg:border-white/30"
                                        : ""
                                    }

                                    /* SMALL — horizontal dividers */
                                    ${index < 3
                                        ? "max-md:border-b-2 max-md:border-dashed max-md:border-white/30"
                                        : ""
                                    }

                                    /* Remove medium border-right from last column */
                                    md:max-lg:[&:nth-child(2n)]:border-r-0

                                    /* Remove large border-right from last item */
                                    lg:last:border-r-0
                                `}
                            >
                                {/* Icon */}
                                <div className="mb-7 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-sm ring-1 ring-white/20">
                                    <Icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold tracking-tight text-white">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 max-w-[285px] text-[14px] leading-6 text-white/75">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeatureTop;