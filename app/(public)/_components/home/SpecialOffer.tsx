import Image from "next/image";
import { ArrowRight } from "lucide-react";

const SpecialOffer = () => {
    return (
        <section className="w-full bg-[#007A55]">
            <div className="mx-auto flex min-h-[220px] w-full max-w-[1400px] flex-col items-center overflow-hidden px-5 py-8 sm:px-8 md:py-10 lg:min-h-[220px] lg:flex-row lg:px-10 lg:py-0">

                {/* LEFT — Offer Content */}
                <div className="z-10 flex w-full flex-1 flex-col justify-center text-center lg:text-left">
                    <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f52b]">
                        Special Offer
                    </p>

                    <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                        Get <span className="text-[#f8f52b]">20% OFF</span>{" "}
                        on your first booking!
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                        <p className="rounded-lg border border-dashed border-[#f8f52b]/70 bg-white/10 p-3 text-sm font-bold tracking-wider text-[#B8FFE7]">
                            Use code: FIXORA26
                        </p>

                        <button className="group flex items-center gap-2 rounded-lg bg-[#f8f52b] p-3 text-sm font-semibold text-[#007A55] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            Book Now & Save
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* CENTER — Image */}
                <div className="relative mt-6 h-[160px] w-full max-w-[360px] shrink-0 overflow-hidden sm:h-[180px] md:max-w-[420px] lg:mt-0 lg:h-[220px] lg:w-[360px]">
                    <Image
                        src="/images/home/offer.jpg"
                        alt="Fixora special offer"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover"
                    />
                </div>

                {/* RIGHT — 20% Badge */}
                <div className="relative mt-6 flex h-28 w-28 shrink-0 items-center justify-center sm:h-32 sm:w-32 lg:ml-10 lg:mt-0 lg:h-40 lg:w-40">

                    {/* Yellow Star */}
                    <div
                        className="absolute inset-0 bg-[#f8f52b]"
                        style={{
                            clipPath:
                                "polygon(50% 0%, 61% 13%, 75% 7%, 82% 22%, 97% 25%, 91% 40%, 100% 50%, 91% 60%, 97% 75%, 82% 78%, 75% 93%, 61% 87%, 50% 100%, 39% 87%, 25% 93%, 18% 78%, 3% 75%, 9% 60%, 0% 50%, 9% 40%, 3% 25%, 18% 22%, 25% 7%, 39% 13%)",
                        }}
                    />

                    <div className="relative z-10 text-center">
                        <span className="block text-3xl font-black leading-none text-[#007A55] sm:text-4xl">
                            20%
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#007A55] sm:text-xs">
                            OFF
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;