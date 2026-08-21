// "use client";

// import UpdateCategoryDialog from "./UpdateCategoryDialog";

// interface Category {
// 	id: string;
// 	name: string;
// 	description: string;
// 	categoryServices: string;
// 	imageUrl: string | null;
// 	imagePublicId: string | null;
// 	createdAt: string;
// 	updatedAt: string;
// }

// interface CategoryCardProps {
// 	category: Category;
// }

// export default function CategoryCard({ category }: CategoryCardProps) {
// 	const services = category.categoryServices
// 		? category.categoryServices
// 				.split(",")
// 				.map((service) => service.trim())
// 				.filter(Boolean)
// 		: [];

// 	return (
// 		<div className="group relative flex h-full flex-col rounded-[22px] border border-slate-200/80 bg-white p-2.5 shadow-[0_4px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#007A55]/20 hover:shadow-[0_20px_45px_rgba(0,122,85,0.13)] dark:border-border dark:bg-card">
// 			{/* ==================================================
//                 IMAGE
//             ================================================== */}
// 			<div className="relative aspect-[16/9] shrink-0 overflow-hidden rounded-[16px] bg-slate-100">
// 				{category.imageUrl ? (
// 					<>
// 						<img
// 							src={category.imageUrl}
// 							alt={category.name}
// 							className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
// 						/>

// 						{/* Bottom gradient */}
// 						<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

// 						{/* Floating service count */}
// 						<div className="absolute bottom-3.5 right-3.5">
// 							<div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
// 								{services.length}{" "}
// 								{services.length === 1 ? "service" : "services"}
// 							</div>
// 						</div>
// 					</>
// 				) : (
// 					<div className="flex h-full items-center justify-center bg-gradient-to-br from-[#007A55]/10 via-white to-[#007A55]/5">
// 						<span className="text-sm text-muted-foreground">No image</span>
// 					</div>
// 				)}
// 			</div>

// 			{/* ==================================================
//                 CONTENT
//             ================================================== */}
// 			<div className="flex flex-1 flex-col px-3.5 pb-2 pt-5">
// 				{/* Title + description */}
// 				<div className="flex items-start gap-3">
// 					{/* Accent */}
// 					<div className="relative mt-1 h-9 w-1 shrink-0 overflow-hidden rounded-full bg-[#007A55]/15">
// 						<div className="absolute inset-x-0 bottom-0 h-0 rounded-full bg-[#007A55] transition-all duration-300 group-hover:h-full" />
// 					</div>

// 					<div className="min-w-0">
// 						<h3 className="text-[19px] font-bold tracking-tight text-slate-900 dark:text-foreground">
// 							{category.name}
// 						</h3>

// 						<p className="mt-1.5 line-clamp-2 text-sm leading-5.5 text-slate-500 dark:text-muted-foreground">
// 							{category.description}
// 						</p>
// 					</div>
// 				</div>

// 				{/* ==================================================
//                     SERVICES
//                 ================================================== */}
// 				{services.length > 0 && (
// 					<div className="mt-5">
// 						<div className="mb-2.5 flex items-center gap-2">
// 							<span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />

// 							<span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
// 								Available Services
// 							</span>
// 						</div>

// 						<div className="flex flex-wrap gap-1.5">
// 							{services.slice(0, 5).map((service, index) => (
// 								<span
// 									key={`${category.id}-${service}-${
// 										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
// 										index
// 									}`}
// 									className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition-all duration-200 group-hover:border-[#007A55]/15 group-hover:bg-[#007A55]/5 group-hover:text-[#007A55] dark:border-border dark:bg-muted dark:text-muted-foreground"
// 								>
// 									{service}
// 								</span>
// 							))}

// 							{services.length > 5 && (
// 								<span className="rounded-lg bg-[#007A55]/8 px-2.5 py-1.5 text-[11px] font-bold text-[#007A55]">
// 									+{services.length - 5}
// 								</span>
// 							)}
// 						</div>
// 					</div>
// 				)}

// 				{/* ==================================================
//                     FOOTER
//                 ================================================== */}
// 				<div className="mt-auto pt-6">
// 					<div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-border">
// 						<div className="flex items-center gap-2">
// 							<span className="relative flex h-2 w-2">
// 								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#007A55]/30" />
// 								<span className="relative inline-flex h-2 w-2 rounded-full bg-[#007A55]" />
// 							</span>

// 							<span className="text-xs font-medium text-slate-400">
// 								{new Date(category.createdAt).toLocaleDateString(undefined, {
// 									day: "numeric",
// 									month: "short",
// 									year: "numeric",
// 								})}
// 							</span>
// 						</div>

// 						<div className="transition-transform duration-200 group-hover:translate-x-0.5">
// 							<UpdateCategoryDialog category={category} />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

"use client";

import UpdateCategoryDialog from "./UpdateCategoryDialog";

interface Category {
	id: string;
	name: string;
	description: string;
	categoryServices: string;
	imageUrl: string | null;
	imagePublicId: string | null;
	createdAt: string;
	updatedAt: string;
}

interface CategoryCardProps {
	category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
	const services = category.categoryServices
		? category.categoryServices
				.split(",")
				.map((service) => service.trim())
				.filter(Boolean)
		: [];

	return (
		<div className="group relative h-full">
			{/* Ambient glow */}
			<div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br from-[#007A55]/0 via-[#007A55]/0 to-[#007A55]/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

			<div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_6px_30px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#007A55]/25 group-hover:shadow-[0_24px_60px_rgba(0,122,85,0.14)] dark:border-border dark:bg-card">
				{/* ==================================================
                    IMAGE
                ================================================== */}
				<div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-slate-100">
					{category.imageUrl ? (
						<>
							<img
								src={category.imageUrl}
								alt={category.name}
								className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
							/>

							{/* Image gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/5" />

							{/* Green ambient gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-[#007A55]/15 via-transparent to-transparent opacity-60" />

							{/* Status */}
							<div className="absolute left-4 top-4">
								<div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
									<span className="relative flex h-1.5 w-1.5">
										<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6EE7B7] opacity-75" />
										<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34D399]" />
									</span>
									Active
								</div>
							</div>

							{/* Service count */}
							<div className="absolute right-4 top-4">
								<div className="rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg backdrop-blur-md">
									{services.length}{" "}
									{services.length === 1 ? "service" : "services"}
								</div>
							</div>

							{/* Image title */}
							<div className="absolute inset-x-0 bottom-0 p-5">
								<div className="flex items-end justify-between gap-3">
									<div className="min-w-0">
										<div className="mb-1.5 h-1 w-8 rounded-full bg-[#34D399] transition-all duration-300 group-hover:w-12" />

										<h3 className="truncate text-[22px] font-bold tracking-tight text-white drop-shadow-md">
											{category.name}
										</h3>
									</div>

									{/* Arrow */}
									<div className="flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-70 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-[#007A55] group-hover:opacity-100">
										{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
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
						<div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#007A55]/15 via-white to-[#007A55]/5">
							<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#007A55]/10 blur-2xl" />
							<div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#007A55]/10 blur-2xl" />

							<div className="relative flex flex-col items-center gap-2">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#007A55]/10 bg-white shadow-sm">
									{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									<svg
										viewBox="0 0 24 24"
										fill="none"
										className="h-5 w-5 text-[#007A55]"
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
				<div className="flex flex-1 flex-col px-5 pb-5 pt-5">
					{/* Description */}
					<div className="relative">
						<div className="absolute -left-2.5 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-[#007A55] via-[#007A55]/30 to-transparent" />

						<p className="line-clamp-2 text-[13px] leading-5.5 text-slate-500 dark:text-muted-foreground">
							{category.description}
						</p>
					</div>

					{/* ==================================================
                        SERVICES
                    ================================================== */}
					{services.length > 0 && (
						<div className="mt-5">
							<div className="mb-3 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />

									<span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
										Services
									</span>
								</div>

								{services.length > 5 && (
									<span className="text-[10px] font-semibold text-[#007A55]">
										+{services.length - 5} more
									</span>
								)}
							</div>

							<div className="flex flex-wrap gap-1.5">
								{services.slice(0, 5).map((service, index) => (
									<span
										key={`${category.id}-${service}-${
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											index
										}`}
										className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1.5 text-[10.5px] font-medium text-slate-600 transition-all duration-300 group-hover:border-[#007A55]/15 group-hover:bg-[#007A55]/5 group-hover:text-[#007A55] dark:border-border dark:bg-muted dark:text-muted-foreground"
									>
										{service}
									</span>
								))}
							</div>
						</div>
					)}

					{/* ==================================================
                        FOOTER
                    ================================================== */}
					<div className="mt-auto pt-6">
						<div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-border">
							{/* Created date */}
							<div className="flex items-center gap-2.5">
								<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#007A55]/8 text-[#007A55]">
									{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									<svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
										<rect
											x="3"
											y="4"
											width="18"
											height="17"
											rx="3"
											stroke="currentColor"
											strokeWidth="1.7"
										/>
										<path
											d="M16 2V6M8 2V6M3 10H21"
											stroke="currentColor"
											strokeWidth="1.7"
											strokeLinecap="round"
										/>
									</svg>
								</div>

								<div>
									<p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
										Created
									</p>

									<p className="text-[11px] font-medium text-slate-600 dark:text-muted-foreground">
										{new Date(category.createdAt).toLocaleDateString(
											undefined,
											{
												day: "numeric",
												month: "short",
												year: "numeric",
											},
										)}
									</p>
								</div>
							</div>

							{/* Update */}
							<div className="rounded-xl border border-slate-200/80 bg-slate-50 p-1 transition-all duration-300 group-hover:border-[#007A55]/15 group-hover:bg-[#007A55]/5 dark:border-border dark:bg-muted">
								<UpdateCategoryDialog category={category} />
							</div>
						</div>
					</div>
				</div>

				{/* Bottom accent */}
				<div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#007A55] via-[#00A878] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
			</div>
		</div>
	);
}
