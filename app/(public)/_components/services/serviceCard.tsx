// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowUpRight, MapPin, Star } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface IService {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	location: string;
// 	rating: string;
// 	active: boolean;
// 	technicianId: string;
// 	categoryId: string;
// 	category: {
// 		name: string;
// 	};
// 	imageUrl: string;
// 	createdAt: string;
// 	updatedAt: string;
// }

// interface ServiceCardProps {
// 	service: IService;
// 	role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
// 	onSeeMore?: () => void;
// }

// export default function ServiceCard({
// 	service,
// 	role,
// 	onSeeMore,
// }: ServiceCardProps) {
// 	const imageUrl =
// 		service.imageUrl?.trim() || "/images/service-placeholder.jpg";

// 	const ratingNumber = parseFloat(service.rating || "0");

// 	const truncatedDescription =
// 		service.description.length > 100
// 			? `${service.description.substring(0, 100)}...`
// 			: service.description;

// 	return (
// 		<div className="group relative h-full">
// 			{/* Ambient glow */}
// 			<div
// 				className="
//                     pointer-events-none
//                     absolute -inset-px
//                     rounded-[26px]
//                     bg-gradient-to-br
//                     from-[#007A55]/0
//                     via-[#007A55]/0
//                     to-[#007A55]/20
//                     opacity-0
//                     blur-xl
//                     transition-all duration-500
//                     group-hover:opacity-100
//                 "
// 			/>

// 			<Card
// 				className="
//                 p-0
//                     relative
//                     flex h-full min-h-[500px]
//                     flex-col
//                     overflow-hidden
//                     rounded-[10px]
//                     border border-slate-200/80
//                     bg-white
//                     shadow-[0_6px_30px_rgba(15,23,42,0.06)]
//                     transition-all duration-500
//                     group-hover:-translate-y-2
//                     group-hover:border-[#007A55]/25
//                     group-hover:shadow-[0_24px_60px_rgba(0,122,85,0.14)]
//                     dark:border-border
//                     dark:bg-card
//                 "
// 			>
// 				{/* IMAGE */}
// 				<div className="relative aspect-[16/9] shrink-0 overflow-hidden">
// 					<Image
// 						src={imageUrl}
// 						alt={service.title}
// 						fill
// 						unoptimized
// 						className="
//             object-cover
//             transition-transform
//             duration-700
//             ease-out
//             group-hover:scale-[1.08]
//         "
// 						sizes="
//             (max-width: 640px) 100vw,
//             (max-width: 1280px) 50vw,
//             25vw
//         "
// 					/>

// 					{/* Gradient */}
// 					<div
// 						className="
//             absolute inset-0
//             bg-gradient-to-t
//             from-black/80
//             via-black/20
//             to-black/5
//         "
// 					/>

// 					{/* Green gradient */}
// 					<div
// 						className="
//             absolute inset-0
//             bg-gradient-to-br
//             from-[#007A55]/15
//             via-transparent
//             to-transparent
//             opacity-60
//         "
// 					/>

// 					{/* STATUS */}
// 					<div className="absolute left-4 top-4">{/* status code */}</div>

// 					{/* RATING + TITLE */}
// 					<div className="absolute inset-x-0 bottom-0 p-5">
// 						<div className="flex flex-col gap-3">
// 							{/* Rating */}
// 							<div
// 								className="
//                     flex w-fit
//                     items-center gap-1.5
//                     rounded-full
//                     border border-white/20
//                     bg-black/30
//                     px-3 py-1.5
//                     text-xs font-semibold
//                     text-white
//                     shadow-lg
//                     backdrop-blur-md
//                 "
// 							>
// 								<Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
// 								<span>{ratingNumber.toFixed(1)}</span>
// 							</div>

// 							{/* Title */}
// 							<div>
// 								<div
// 									className="
//                         mb-2 h-1 w-8
//                         rounded-full
//                         bg-[#34D399]
//                         transition-all duration-300
//                         group-hover:w-12
//                     "
// 								/>

// 								<h3
// 									className="
//                         line-clamp-2
//                         text-[21px]
//                         font-bold
//                         leading-7
//                         tracking-tight
//                         text-white
//                         drop-shadow-md
//                     "
// 								>
// 									{service.title}
// 								</h3>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* =========================
//                     CONTENT
//                 ========================= */}
// 				<CardContent className="flex flex-1 flex-col px-5 pb-5 pt-5">
// 					{/* DESCRIPTION */}

// 					<div className="relative">
// 						<div
// 							className="
//                                 absolute
//                                 -left-2.5
//                                 top-0
//                                 h-full
//                                 w-0.5
//                                 rounded-full
//                                 bg-gradient-to-b
//                                 from-[#007A55]
//                                 via-[#007A55]/30
//                                 to-transparent
//                             "
// 						/>

// 						<p
// 							className="
//                                 line-clamp-3
//                                 text-[13px]
//                                 leading-5.5
//                                 text-slate-500
//                                 dark:text-muted-foreground
//                             "
// 						>
// 							{truncatedDescription}
// 						</p>

// 						{service.description.length > 100 && (
// 							<button
// 								type="button"
// 								onClick={onSeeMore}
// 								className="
//                                     mt-2
//                                     text-[11px]
//                                     font-semibold
//                                     text-[#007A55]
//                                     transition-colors
//                                     hover:text-[#005c40]
//                                     hover:underline
//                                 "
// 							>
// 								See full description →
// 							</button>
// 						)}
// 					</div>

// 					{/* SERVICE DETAILS */}

// 					<div className="mt-5">
// 						<div className="mb-3 flex items-center gap-2">
// 							<span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />

// 							<span
// 								className="
//                                     text-[10px]
//                                     font-bold
//                                     uppercase
//                                     tracking-[0.14em]
//                                     text-slate-400
//                                 "
// 							>
// 								Service Details
// 							</span>
// 						</div>
// 					</div>

// 					{/* LOCATION + PRICE */}
// 					<div className="mt-3 grid grid-cols-2 gap-2">
// 						{/* LOCATION */}
// 						<div
// 							className="
//             flex min-w-0
//             items-center gap-2
//             rounded-xl
//             border border-slate-200/80
//             bg-slate-50
//             px-3 py-2.5
//             dark:border-border
//             dark:bg-muted
//         "
// 						>
// 							<div
// 								className="
//                 flex h-5 w-5 shrink-0
//                 items-center justify-center
//                 rounded-md
//                 bg-[#007A55]/10
//                 text-[#007A55]
//             "
// 							>
// 								<MapPin className="h-3 w-3" />
// 							</div>

// 							<div className="min-w-0">
// 								<p
// 									className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-wider
//                     text-slate-400
//                 "
// 								>
// 									Location
// 								</p>

// 								<p
// 									className="
//                     truncate
//                     text-[11px]
//                     font-medium
//                     text-slate-600
//                     dark:text-muted-foreground
//                 "
// 								>
// 									{service.location}
// 								</p>
// 							</div>
// 						</div>

// 						{/* PRICE */}
// 						<div
// 							className="
//             flex min-w-0
//             items-center justify-between
//             rounded-xl
//             border border-slate-200/80
//             bg-slate-50
//             px-3 py-2.5
//             dark:border-border
//             dark:bg-muted
//         "
// 						>
// 							<div className="min-w-0">
// 								<p
// 									className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-wider
//                     text-slate-400
//                 "
// 								>
// 									Starting from
// 								</p>

// 								<div className="mt-0.5 flex items-baseline">
// 									<span className="mr-0.5 text-sm font-semibold text-[#007A55]">
// 										৳
// 									</span>

// 									<span
// 										className="
//                         text-lg
//                         font-bold
//                         tracking-tight
//                         text-slate-700
//                         dark:text-foreground
//                     "
// 									>
// 										{service.price}
// 									</span>
// 								</div>
// 							</div>

// 							<span className="ml-1 shrink-0 text-[9px] text-muted-foreground">
// 								/hr
// 							</span>
// 						</div>
// 					</div>

// 					{/* =========================
//                         ACTIONS
//                         FUNCTIONALITY UNCHANGED
//                     ========================= */}

// 					<div className="mt-auto pt-6">
// 						<div className="border-t border-slate-100 pt-4 dark:border-border">
// 							<div className="grid grid-cols-2 gap-2">
// 								{/* Technician Details */}

// 								<Button
// 									asChild
// 									variant="outline"
// 									size="sm"
// 									className="
//                                         h-10
//                                         rounded-sm
//                                         border-border
//                                         px-2
//                                         text-xs
//                                         font-semibold
//                                         transition-all duration-300
//                                         hover:border-[#007A55]/40
//                                         hover:bg-[#007A55]/5
//                                         hover:text-[#007A55]
//                                     "
// 								>
// 									<Link href={`/technicians/${service.technicianId}`}>
// 										Technician Details
// 									</Link>
// 								</Button>

// 								{/* Book Now */}

// 								{role === "CUSTOMER" ? (
// 									<Button
// 										asChild
// 										size="sm"
// 										className="
//                                             group/button
//                                             h-10
//                                             rounded-sm
//                                             bg-[#007A55]
//                                             px-2
//                                             text-xs
//                                             font-semibold
//                                             text-white
//                                             shadow-sm
//                                             shadow-[#007A55]/20
//                                             transition-all duration-300
//                                             hover:bg-[#006647]
//                                             hover:shadow-md
//                                             hover:shadow-[#007A55]/30
//                                         "
// 									>
// 										<Link href={`/bookings?serviceId=${service.id}`}>
// 											<span className="flex items-center justify-center">
// 												Book Now
// 												<ArrowUpRight
// 													className="
//                                                         ml-1
//                                                         h-4 w-4
//                                                         transition-transform
//                                                         duration-300
//                                                         group-hover/button:-translate-y-0.5
//                                                         group-hover/button:translate-x-0.5
//                                                     "
// 												/>
// 											</span>
// 										</Link>
// 									</Button>
// 								) : (
// 									<Button
// 										asChild
// 										size="sm"
// 										className="
//                                             h-10
//                                             rounded-sm
//                                             bg-[#007A55]
//                                             px-2
//                                             text-xs
//                                             font-semibold
//                                             text-white
//                                             shadow-sm
//                                             shadow-[#007A55]/20
//                                             transition-all duration-300
//                                             hover:bg-[#006647]
//                                             hover:shadow-md
//                                             hover:shadow-[#007A55]/30
//                                         "
// 									>
// 										<Link href="/login">Login as Customer</Link>
// 									</Button>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</CardContent>

// 				{/* Bottom accent */}

// 				<div
// 					className="
//                         absolute inset-x-0 bottom-0
//                         h-[2px]
//                         origin-left
//                         scale-x-0
//                         bg-gradient-to-r
//                         from-[#007A55]
//                         via-[#00A878]
//                         to-transparent
//                         transition-transform duration-500
//                         group-hover:scale-x-100
//                     "
// 				/>
// 			</Card>
// 		</div>
// 	);
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IService {
	id: string;
	title: string;
	description: string;
	price: number;
	location: string;
	rating: string;
	active: boolean;
	technicianId: string;
	categoryId: string;
	category: {
		name: string;
	};
	imageUrl: string | null;
	createdAt: string;
	updatedAt: string;
}

interface ServiceCardProps {
	service: IService;
	role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
	onSeeMore?: () => void;
}

export default function ServiceCard({
	service,
	role,
	onSeeMore,
}: ServiceCardProps) {
	const imageUrl = service.imageUrl?.trim() || null;

	const ratingNumber = parseFloat(service.rating || "0");

	const truncatedDescription =
		service.description.length > 100
			? `${service.description.substring(0, 100)}...`
			: service.description;

	return (
		<div className="group relative h-full">
			{/* ==================================================
                AMBIENT GLOW
            ================================================== */}
			<div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br from-[#007A55]/0 via-[#007A55]/0 to-[#007A55]/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

			<Card
				className="
                    relative
                    flex
                    h-full
                    min-h-[500px]
                    flex-col
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-slate-200/80
                    bg-white
                    p-0
                    shadow-[0_6px_30px_rgba(15,23,42,0.06)]
                    transition-all
                    duration-500
                    group-hover:-translate-y-2
                    group-hover:border-[#007A55]/25
                    group-hover:shadow-[0_24px_60px_rgba(0,122,85,0.14)]
                    dark:border-border
                    dark:bg-card
                "
			>
				{/* ==================================================
                    SERVICE IMAGE
                ================================================== */}
				<div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-slate-100">
					{imageUrl ? (
						<>
							<Image
								src={imageUrl}
								alt={service.title}
								fill
								unoptimized
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
								sizes="
                                    (max-width: 640px) 100vw,
                                    (max-width: 1280px) 50vw,
                                    25vw
                                "
							/>

							{/* Image gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />

							{/* Green ambient gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-[#007A55]/15 via-transparent to-transparent opacity-60" />

							{/* ==================================================
                                STATUS
                            ================================================== */}
							<div className="absolute left-4 top-4">
								<div
									className={`flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md ${
										service.active ? "bg-black/25" : "bg-black/40"
									}`}
								>
									<span className="relative flex h-1.5 w-1.5">
										{service.active && (
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6EE7B7] opacity-75" />
										)}

										<span
											className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
												service.active ? "bg-[#34D399]" : "bg-slate-300"
											}`}
										/>
									</span>

									{service.active ? "Active" : "Inactive"}
								</div>
							</div>

							{/* ==================================================
                                PRICE
                            ================================================== */}
							<div className="absolute right-4 top-4">
								<div className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">
									৳{service.price}
								</div>
							</div>

							{/* ==================================================
                                TITLE + CATEGORY + ARROW
                            ================================================== */}
							<div className="absolute inset-x-0 bottom-0 p-5">
								<div className="flex items-end justify-between gap-3">
									<div className="min-w-0">
										{/* Accent */}
										<div className="mb-1.5 h-1 w-8 rounded-full bg-[#34D399] transition-all duration-300 group-hover:w-12" />

										{/* Category */}
										<p className="mb-1 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-200">
											{service.category.name}
										</p>

										{/* Title */}
										<h3 className="truncate text-[21px] font-bold tracking-tight text-white drop-shadow-md">
											{service.title}
										</h3>
									</div>

									{/* Arrow */}
									<div className="flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-70 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-[#007A55] group-hover:opacity-100">
										<svg
											viewBox="0 0 20 20"
											fill="none"
											className="h-4 w-4"
											aria-hidden="true"
										>
											<path
												d="M5 15L15 5M7 5H15V13"
												stroke="currentColor"
												strokeWidth="1.8"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</div>
							</div>
						</>
					) : (
						/* ==================================================
                            NO IMAGE
                        ================================================== */
						<div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#007A55]/15 via-white to-[#007A55]/5">
							<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#007A55]/10 blur-2xl" />

							<div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#007A55]/10 blur-2xl" />

							{/* Status */}
							<div className="absolute left-4 top-4">
								<div
									className={`flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
										service.active
											? "bg-white/80 text-slate-600"
											: "bg-slate-100/80 text-slate-500"
									}`}
								>
									<span className="relative flex h-1.5 w-1.5">
										{service.active && (
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6EE7B7] opacity-75" />
										)}

										<span
											className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
												service.active ? "bg-[#34D399]" : "bg-slate-300"
											}`}
										/>
									</span>

									{service.active ? "Active" : "Inactive"}
								</div>
							</div>

							{/* Price */}
							<div className="absolute right-4 top-4">
								<div className="rounded-full border border-[#007A55]/10 bg-white/80 px-3 py-1.5 text-sm font-bold text-[#007A55] shadow-sm">
									৳{service.price}
								</div>
							</div>

							<div className="relative flex flex-col items-center gap-2">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#007A55]/10 bg-white shadow-sm">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-5 w-5 text-[#007A55]"
										aria-hidden="true"
									>
										<path
											d="M4 17L9 12L13 16L16 13L20 17"
											stroke="currentColor"
											strokeWidth="1.8"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>

										<rect
											x="3"
											y="4"
											width="18"
											height="16"
											rx="3"
											stroke="currentColor"
											strokeWidth="1.8"
										/>
									</svg>
								</div>

								<span className="text-xs font-medium text-slate-400">
									No image available
								</span>
							</div>
						</div>
					)}
				</div>

				{/* ==================================================
                    CONTENT
                ================================================== */}
				<CardContent className="flex flex-1 flex-col px-5 pb-5 pt-0">
					{/* ==================================================
                        DESCRIPTION
                    ================================================== */}
					<div className="relative">
						<div className="absolute -left-2.5 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-[#007A55] via-[#007A55]/30 to-transparent" />

						<p className="line-clamp-3 text-[13px] leading-5.5 text-slate-500 dark:text-muted-foreground">
							{truncatedDescription}
						</p>

						{service.description.length > 100 && (
							<button
								type="button"
								onClick={onSeeMore}
								className="mt-2 text-[11px] font-semibold text-[#007A55] transition-colors hover:text-[#005c40] hover:underline"
							>
								See full description →
							</button>
						)}
					</div>

					{/* ==================================================
                        SERVICE DETAILS
                    ================================================== */}
					<div className="mt-5">
						<div className="mb-3 flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />

							<span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
								Service Details
							</span>
						</div>

						<div className="grid grid-cols-2 gap-2">
							{/* Rating */}
							<div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5 dark:border-border dark:bg-muted">
								<div className="flex h-5 w-5 items-center justify-center rounded-md bg-yellow-400/10">
									<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
								</div>

								<div>
									<p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
										Rating
									</p>

									<p className="text-[11px] font-bold text-slate-700 dark:text-foreground">
										{ratingNumber.toFixed(1)}
									</p>
								</div>
							</div>

							{/* Category */}
							<div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5 dark:border-border dark:bg-muted">
								<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#007A55]/10 text-[#007A55]">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-3 w-3"
										aria-hidden="true"
									>
										<path
											d="M4 6.5A2.5 2.5 0 0 1 6.5 4H17a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h10.5a2.5 2.5 0 0 0 0-5H7"
											stroke="currentColor"
											strokeWidth="1.7"
											strokeLinecap="round"
										/>
									</svg>
								</div>

								<div className="min-w-0">
									<p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
										Category
									</p>

									<p className="truncate text-[11px] font-bold text-slate-700 dark:text-foreground">
										{service.category.name}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* ==================================================
                        LOCATION
                    ================================================== */}
					<div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5 dark:border-border dark:bg-muted">
						<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#007A55]/10 text-[#007A55]">
							<MapPin className="h-3 w-3" />
						</div>

						<div className="min-w-0">
							<p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
								Location
							</p>

							<p className="truncate text-[11px] font-medium text-slate-600 dark:text-muted-foreground">
								{service.location}
							</p>
						</div>
					</div>

					{/* ==================================================
                        FOOTER
                    ================================================== */}
					<div className="mt-auto pt-6">
						<div className="">
							{/* ==================================================
                                EXISTING ACTION BUTTONS
                            ================================================== */}
							<div className="grid grid-cols-2 gap-2">
								{/* Technician Details */}
								<Button
									asChild
									variant="outline"
									size="sm"
									className="
                                        h-10
                                        rounded-sm
                                        px-2
                                        text-xs
                                        font-semibold
                                        transition-all
                                        duration-300
										border-[#007A55]/40
                                        hover:border-[#007A55]/40
                                        hover:bg-[#007A55]/5
                                        hover:text-[#007A55]
                                    "
								>
									<Link href={`/technicians/${service.technicianId}`}>
										Technician Details
									</Link>
								</Button>

								{/* Book Now / Login */}
								{role === "CUSTOMER" ? (
									<Button
										asChild
										size="sm"
										className="
                                            group/button
                                            h-10
                                            rounded-sm
                                            bg-[#007A55]
                                            px-2
                                            text-xs
                                            font-semibold
                                            text-white
                                            shadow-sm
                                            shadow-[#007A55]/20
                                            transition-all
                                            duration-300
                                            hover:bg-[#006647]
                                            hover:shadow-md
                                            hover:shadow-[#007A55]/30
                                        "
									>
										<Link href={`/bookings?serviceId=${service.id}`}>
											<span className="flex items-center justify-center">
												Book Now
												<ArrowUpRight
													className="
                                                        ml-1
                                                        h-4
                                                        w-4
                                                        transition-transform
                                                        duration-300
                                                        group-hover/button:-translate-y-0.5
                                                        group-hover/button:translate-x-0.5
                                                    "
												/>
											</span>
										</Link>
									</Button>
								) : (
									<Button
										asChild
										size="sm"
										className="
                                            h-10
                                            rounded-sm
                                            bg-[#007A55]
                                            px-2
                                            text-xs
                                            font-semibold
                                            text-white
                                            shadow-sm
                                            shadow-[#007A55]/20
                                            transition-all
                                            duration-300
                                            hover:bg-[#006647]
                                            hover:shadow-md
                                            hover:shadow-[#007A55]/30
                                        "
									>
										<Link href="/login">Login as Customer</Link>
									</Button>
								)}
							</div>
						</div>
					</div>
				</CardContent>

				{/* ==================================================
                    BOTTOM ACCENT
                ================================================== */}
				<div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#007A55] via-[#00A878] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
			</Card>
		</div>
	);
}
