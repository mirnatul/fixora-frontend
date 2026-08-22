"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
	const router = useRouter();
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
					{/* Actions */}
					<Button
						className="h-8 gap-2 py-6 cursor-pointer mt-4 capitalize rounded-lg bg-[#007A55] px-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#006B4A] hover:shadow-md"
						onClick={() => {
							const params = new URLSearchParams({
								categoryId: category.id,
								page: "1",
							});

							router.push(`/services?${params.toString()}`);
						}}
					>
						View {category.name} Services
					</Button>
				</div>

				{/* Bottom accent */}
				<div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#007A55] via-[#00A878] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
			</div>
		</div>
	);
}
