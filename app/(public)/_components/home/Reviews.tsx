"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Reviews = () => {
    const reviews = [
        {
            name: "Sarah Ahmed",
            location: "Gulshan, Dhaka",
            image: "/images/user/user-1.jpg",
            review:
                "Fixora made finding a reliable professional incredibly easy. The technician arrived on time and did an excellent job.",
            rating: 5,
        },
        {
            name: "Tanvir Hasan",
            location: "Dhanmondi, Dhaka",
            image: "/images/user/user-2.jpg",
            review:
                "Very smooth booking experience. The service was professional, affordable, and exactly as described.",
            rating: 5,
        },
        {
            name: "Nusrat Jahan",
            location: "Banani, Dhaka",
            image: "/images/user/user-3.jpg",
            review:
                "I was impressed with how quickly I got a trusted technician. Great service and very friendly support.",
            rating: 5,
        },
        {
            name: "Rakib Hossain",
            location: "Uttara, Dhaka",
            image: "/images/user/user-4.jpg",
            review:
                "The technician was skilled and professional. Everything was completed perfectly without any hassle.",
            rating: 5,
        },
        {
            name: "Mim Akter",
            location: "Mirpur, Dhaka",
            image: "/images/user/user-5.jpg",
            review:
                "Booking through Fixora was much easier than searching for a technician myself. Highly recommended.",
            rating: 5,
        },
        {
            name: "Fahim Rahman",
            location: "Bashundhara, Dhaka",
            image: "/images/user/user-6.jpg",
            review:
                "Excellent experience from booking to completion. The pricing was transparent and the service was great.",
            rating: 5,
        },
        {
            name: "Sadia Islam",
            location: "Mohammadpur, Dhaka",
            image: "/images/user/user-7.jpg",
            review:
                "I needed an urgent home repair and Fixora helped me find someone quickly. Very dependable platform.",
            rating: 5,
        },
        {
            name: "Arif Chowdhury",
            location: "Tejgaon, Dhaka",
            image: "/images/user/user-1.jpg",
            review:
                "The professional was punctual, polite, and knew exactly what he was doing. I'll definitely use Fixora again.",
            rating: 5,
        },
        {
            name: "Jannatul Ferdous",
            location: "Wari, Dhaka",
            image: "/images/user/user-2.jpg",
            review:
                "A genuinely convenient way to book home services. The whole process felt safe and trustworthy.",
            rating: 5,
        },
    ];

    return (
        <section className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}
                <div className="mb-10 max-w-2xl">
                    <span className="text-sm font-bold uppercase tracking-widest text-[#007A55]">
                        Customer Reviews
                    </span>

                    <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                        Loved by customers{" "}
                        <span className="text-[#007A55]">
                            across Dhaka.
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                        See what our customers have to say about their experience
                        with Fixora and our trusted professionals.
                    </p>
                </div>

                {/* ================= REVIEWS ================= */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet !h-2 !w-2",
                        bulletActiveClass:
                            "swiper-pagination-bullet-active !w-6 !rounded-full !bg-[#007A55]",
                    }}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="reviews-swiper pb-12!"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="group flex h-full min-h-61.25 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                {/* User */}
                                <div className="flex items-center gap-3">
                                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#E8FFF7]">
                                        <Image
                                            src={review.image}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">
                                            {review.name}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            {review.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="mt-5 flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]"
                                        />
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="mt-4 flex-1 text-sm leading-6 text-gray-600">
                                    "{review.review}"
                                </p>

                                {/* Verified */}
                                <p className="mt-4 text-xs font-medium text-[#007A55]">
                                    ✓ Verified customer
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default Reviews;