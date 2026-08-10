import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const articles = [
    {
        title: "10 Simple Tips to Keep Your Home Spotless",
        description:
            "Easy cleaning habits that can help you maintain a fresh, organized, and comfortable home every day.",
        category: "Home Cleaning",
        date: "Aug 05, 2026",
        image: "/images/articles/home-cleaning.jpg",
        href: "/articles/keep-home-spotless",
    },
    {
        title: "How Often Should You Deep Clean Your Home?",
        description:
            "Discover a simple cleaning schedule that keeps every corner of your home clean without the stress.",
        category: "Cleaning Tips",
        date: "Jul 28, 2026",
        image: "/images/articles/deep-cleaning.jpg",
        href: "/articles/deep-clean-your-home",
    },
    {
        title: "5 Things to Check Before Booking a Home Service",
        description:
            "A quick checklist to help you choose the right professional and get the best results from your booking.",
        category: "Home Care",
        date: "Jul 20, 2026",
        image: "/images/articles/home-service.jpg",
        href: "/articles/before-booking",
    },
];

const TipsAndUpdates = () => {
    return (
        <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#007A55]">
                            Tips & Updates
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Helpful ideas for a{" "}
                            <span className="text-[#007A55]">
                                happier home
                            </span>
                        </h2>

                        <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                            Get practical home-care tips, cleaning advice, and
                            helpful updates from the Fixora team.
                        </p>
                    </div>

                    {/* Desktop button */}
                    <Link
                        href="/articles"
                        className="group hidden shrink-0 items-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-[#007A55] hover:bg-[#007A55] hover:text-white sm:flex"
                    >
                        View All Articles
                        <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Articles */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <Link
                            key={article.title}
                            href={article.href}
                            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative aspect-16/10 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Category */}
                                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#007A55] shadow-sm backdrop-blur-sm">
                                    {article.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 sm:p-6">
                                {/* Date */}
                                <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                    <CalendarDays size={14} />
                                    {article.date}
                                </div>

                                <h3 className="text-xl font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[#007A55]">
                                    {article.title}
                                </h3>

                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                                    {article.description}
                                </p>

                                {/* Read more */}
                                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#007A55]">
                                    Read Article
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile button */}
                <div className="mt-8 flex justify-center sm:hidden">
                    <Link
                        href="/articles"
                        className="group flex items-center gap-2 rounded-full bg-[#007A55] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#006548]"
                    >
                        View All Articles
                        <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TipsAndUpdates;