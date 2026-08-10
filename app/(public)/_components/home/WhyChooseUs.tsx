import {
    ShieldCheckIcon,
    BadgeDollarSign,
    Clock3,
    Headphones,
} from "lucide-react";

const WhyChooseUs = () => {
    return (

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-32 bg-gray-50">
            <div className="mx-auto max-w-7xl">
                <div className="grid items-center gap-10 lg:grid-cols-3 lg:gap-12">

                    {/* ================= 01 — CONTENT ================= */}
                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-[#007A55]">
                            Why Choose Fixora
                        </span>

                        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                            We make home services{" "}
                            <span className="text-[#007A55]">
                                simple and reliable.
                            </span>
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                            From finding the right professional to getting the job done,
                            Fixora makes every step easy, transparent, and stress-free.
                        </p>

                        <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#007A55] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#006447]">
                            Learn More About Us
                            <span>→</span>
                        </button>
                    </div>

                    {/* ================= 02 — IMAGE ================= */}
                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl bg-[#E8FFF7]">
                            <img
                                src="/images/home/thumbsup.png"
                                alt="Fixora professional providing home service"
                                className="h-90 w-full object-cover"
                            />
                        </div>

                        {/* Small floating badge */}
                        <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-gray-100">
                            <p className="text-xs text-gray-500">
                                Trusted by
                            </p>
                            <p className="font-bold text-gray-900">
                                10,000+ Customers
                            </p>
                        </div>
                    </div>

                    {/* ================= 03 — FEATURES ================= */}
                    <div className="flex h-full flex-col justify-between">

                        {/* Verified */}
                        <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8FFF7] transition-transform duration-300 group-hover:scale-110">
                                <ShieldCheckIcon className="h-5 w-5 text-[#007A55]" />
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-900">
                                    Verified Professionals
                                </h3>
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    Trusted experts for every job.
                                </p>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8FFF7] transition-transform duration-300 group-hover:scale-110">
                                <BadgeDollarSign className="h-5 w-5 text-[#007A55]" />
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-900">
                                    Affordable Pricing
                                </h3>
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    Fair and transparent rates.
                                </p>
                            </div>
                        </div>

                        {/* On Time */}
                        <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8FFF7] transition-transform duration-300 group-hover:scale-110">
                                <Clock3 className="h-5 w-5 text-[#007A55]" />
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-900">
                                    On-Time Guarantee
                                </h3>
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    Professionals who respect your time.
                                </p>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8FFF7] transition-transform duration-300 group-hover:scale-110">
                                <Headphones className="h-5 w-5 text-[#007A55]" />
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-900">
                                    24/7 Customer Support
                                </h3>
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    We're here whenever you need us.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs