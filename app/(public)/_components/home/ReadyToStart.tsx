import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ReadyToStart = () => {
    return (
        <section className="px-5 py-12 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-3xl bg-[#007A55] px-6 py-8 sm:px-10 lg:flex-row lg:px-12 lg:py-10">

                {/* LEFT — Emoji + Content */}
                <div className="z-10 flex flex-1 items-center gap-5 text-center lg:text-left">
                    {/* Emoji */}
                    <div className="hidden shrink-0 text-5xl sm:block lg:text-6xl">
                        🚀
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                            Ready to get started?
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
                            Book trusted professionals and get things done today.
                        </p>

                        <button className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-[#f8f52b] px-5 py-3 text-sm font-bold text-[#007A55] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            Book Now
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* RIGHT — Image */}
                <div className="relative mt-7 h-42.5 w-full max-w-105 shrink-0 overflow-hidden rounded-2xl sm:h-50 lg:mt-0 lg:h-55 lg:w-100">
                    <Image
                        src="/images/home/offer.jpg"
                        alt="Book a trusted Fixora professional"
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default ReadyToStart;