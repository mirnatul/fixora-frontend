import {
    ArrowRight,
    CalendarCheck,
    CheckCircle2,
    Search,
} from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            icon: Search,
            title: "Choose a service",
            description:
                "Explore trusted services and choose exactly what you need for your home.",
        },
        {
            number: "02",
            icon: CalendarCheck,
            title: "Book & pay securely",
            description:
                "Select your preferred time, confirm your details, and pay securely online.",
        },
        {
            number: "03",
            icon: CheckCircle2,
            title: "Get it done",
            description:
                "Your verified professional arrives on time and completes your job perfectly.",
        },
    ];

    return (
        <section className="w-full bg-green-50 py-20 md:py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* ================= HEADER ================= */}
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007A55]">
                        Simple process
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                        How it works
                    </h2>

                    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
                        Simple, fast and reliable process from booking to completion.
                    </p>
                </div>

                {/* ================= STEPS ================= */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="group relative"
                            >
                                {/* ================= CARD ================= */}
                                <div
                                    className="
                                        relative h-full overflow-hidden
                                        rounded-3xl border border-[#D5F0E5]
                                        bg-white
                                        px-7 py-8
                                        shadow-[0_8px_30px_rgba(0,122,85,0.06)]
                                        transition-all duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_15px_40px_rgba(0,122,85,0.10)]
                                        sm:px-8 sm:py-9
                                    "
                                >
                                    {/* Decorative background */}
                                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8FFF7] opacity-70 transition-transform duration-500 group-hover:scale-125" />

                                    {/* Step Number */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className="text-sm font-extrabold tracking-[0.15em] text-[#007A55]">
                                            STEP {step.number}
                                        </span>

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8FFF7] text-xs font-bold text-[#007A55]">
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* ================= ICON ================= */}
                                    <div className="relative z-10 mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#C8F2E2] bg-[#F5FFFB] shadow-sm">

                                        {/* Outer ring */}
                                        <div className="flex h-19 w-19 items-center justify-center rounded-full border border-[#D5F5EA] bg-white">

                                            {/* Inner circle */}
                                            <div className="flex h-14.5 w-14.5 items-center justify-center rounded-full bg-[#E8FFF7] transition-transform duration-300 group-hover:scale-105">
                                                <Icon
                                                    className="h-7 w-7 text-[#007A55]"
                                                    strokeWidth={1.8}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================= CONTENT ================= */}
                                    <div className="relative z-10 mt-8">

                                        <h3 className="min-h-7.5 text-xl font-bold tracking-tight text-gray-900">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 max-w-sm text-sm leading-7 text-gray-500">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="relative z-10 mt-8 h-1 w-12 overflow-hidden rounded-full bg-[#D5F5EA]">
                                        <div className="h-full w-0 rounded-full bg-[#007A55] transition-all duration-300 group-hover:w-full" />
                                    </div>
                                </div>

                                {/* ================= CONNECTOR ================= */}
                                {index < steps.length - 1 && (
                                    <div className="pointer-events-none absolute -right-5 top-1/2 z-20 hidden -translate-y-1/2 lg:flex items-center">

                                        {/* Dashed connector */}
                                        <div className="relative flex w-10 items-center">
                                            <div className="w-full border-t-2 border-dashed border-[#A8DDCA]" />

                                            {/* Arrow head */}
                                            <div className="absolute right-0 h-2.5 w-2.5 rotate-45 border-r-2 border-t-2 border-[#007A55] bg-green-50" />
                                        </div>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ================= BOTTOM TRUST TEXT ================= */}
                <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D5F0E5] bg-white px-5 py-2.5 text-xs font-medium text-gray-500 shadow-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#007A55]" />
                        Simple booking · Secure payment · Trusted professionals
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;