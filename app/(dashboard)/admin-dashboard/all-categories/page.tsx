import { getCategories } from "../_actions/getCategories";
import CategoryGrid from "../_components/categories/CategoryGrid";
import CreateCategoryDialog from "../_components/categories/CreateCategoryDialog";

export default async function AllCategoryPage() {
	const categories = await getCategories();
	const categoryCount = categories.data.length;

	return (
		<main className="min-h-screen overflow-hidden bg-[#f7faf8] dark:bg-background">
			{/* ==================================================
                HERO / HEADER
            ================================================== */}
			<section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white dark:border-border dark:bg-card">
				{/* ==================================================
        BACKGROUND EFFECTS
    ================================================== */}

				{/* Large green glow */}
				<div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#007A55]/[0.07] blur-[100px]" />

				{/* Secondary glow */}
				<div className="pointer-events-none absolute -bottom-48 left-[35%] h-[420px] w-[420px] rounded-full bg-[#00A878]/[0.045] blur-[90px]" />

				{/* Square grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.035]"
					style={{
						backgroundImage:
							"linear-gradient(#007A55 1px, transparent 1px), linear-gradient(90deg, #007A55 1px, transparent 1px)",
						backgroundSize: "40px 40px",
						maskImage:
							"linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
						WebkitMaskImage:
							"linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
					}}
				/>

				{/* Decorative grid glow */}
				<div className="pointer-events-none absolute right-10 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full border border-[#007A55]/10 lg:block" />

				<div className="pointer-events-none absolute right-20 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full border border-[#007A55]/[0.07] lg:block" />

				{/* ==================================================
        CONTENT
    ================================================== */}
				<div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
					<div className="flex flex-col gap-9 lg:flex-row lg:items-center lg:justify-between">
						{/* ==================================================
                LEFT CONTENT
            ================================================== */}
						<div className="min-w-0">
							{/* Eyebrow */}
							<div className="mb-5 flex items-center gap-3">
								<div className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-[#007A55]/15 bg-[#007A55]/[0.07]">
									<span className="h-2.5 w-2.5 rounded-full bg-[#007A55] shadow-[0_0_0_5px_rgba(0,122,85,0.08)]" />

									<span className="absolute inset-0 animate-ping rounded-xl border border-[#007A55]/20" />
								</div>

								<div className="flex items-center gap-2">
									<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#007A55]">
										Service Management
									</span>

									<span className="h-1 w-1 rounded-full bg-slate-300" />

									<span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">
										Fixora Admin
									</span>
								</div>
							</div>

							{/* Title */}
							<div className="relative">
								<h1 className="text-4xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[52px] lg:leading-[1.05] dark:text-foreground">
									All Categories
									<span className="ml-2 text-[#007A55]">.</span>
								</h1>

								{/* Small accent line */}
								<div className="mt-4 flex items-center gap-2">
									<span className="h-1 w-12 rounded-full bg-[#007A55]" />
									<span className="h-1 w-2 rounded-full bg-[#00A878]/40" />
									<span className="h-1 w-1 rounded-full bg-[#00A878]/20" />
								</div>
							</div>

							{/* Description */}
							<p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-[15px] dark:text-muted-foreground">
								Manage, organize, and maintain the service categories powering
								the{" "}
								<span className="font-semibold text-slate-700 dark:text-foreground">
									Fixora marketplace
								</span>
								.
							</p>

							{/* Stats */}
							<div className="mt-7 flex flex-wrap items-center gap-3">
								{/* Category count */}
								<div className="group flex items-center gap-3 rounded-2xl border border-[#007A55]/10 bg-white/80 px-3 py-2.5 shadow-[0_8px_30px_rgba(0,122,85,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#007A55]/20 hover:shadow-[0_10px_35px_rgba(0,122,85,0.1)] dark:border-border dark:bg-card/70">
									<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#007A55] text-xs font-bold text-white shadow-[0_5px_15px_rgba(0,122,85,0.22)]">
										{categoryCount}
									</div>

									<div className="pr-2">
										<p className="text-[11px] font-bold leading-none text-slate-700 dark:text-foreground">
											{categoryCount === 1 ? "Category" : "Categories"}
										</p>

										<p className="mt-1 text-[10px] text-slate-400">
											Available on platform
										</p>
									</div>
								</div>

								{/* Status */}
								<div className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-2.5 shadow-sm backdrop-blur-md dark:border-border dark:bg-card/70">
									<span className="relative flex h-2.5 w-2.5">
										<span className="absolute inset-0 animate-ping rounded-full bg-[#10B981]/40" />
										<span className="relative h-2.5 w-2.5 rounded-full bg-[#10B981]" />
									</span>

									<span className="text-[10px] font-semibold text-slate-500 dark:text-muted-foreground">
										Marketplace active
									</span>
								</div>
							</div>
						</div>

						{/* ==================================================
                RIGHT ACTION AREA
            ================================================== */}
						<div className="relative shrink-0 lg:pr-6">
							{/* Decorative vertical accent */}
							<div className="absolute -left-5 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#007A55]/30 to-transparent lg:block" />

							<CreateCategoryDialog />

							<p className="mt-2 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
								Add a new service category
							</p>
						</div>
					</div>
				</div>

				{/* Bottom fade */}
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#007A55]/20 to-transparent" />
			</section>

			{/* ==================================================
                CATEGORY GRID
            ================================================== */}
			<section className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
				{/* Ambient background */}
				<div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#007A55]/[0.025] blur-3xl" />

				<div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-[#00A878]/[0.02] blur-3xl" />

				<div className="relative">
					{categoryCount > 0 ? (
						<CategoryGrid categories={categories.data} />
					) : (
						/* ==================================================
                            EMPTY STATE
                        ================================================== */
						<div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/70 px-6 text-center dark:border-border dark:bg-card/50">
							<div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#007A55]/[0.08] text-[#007A55]">
								{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
									<path
										d="M12 5V19M5 12H19"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
								</svg>
							</div>

							<h2 className="text-lg font-bold text-slate-900 dark:text-foreground">
								No categories yet
							</h2>

							<p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
								Create your first service category to start organizing services
								on the Fixora platform.
							</p>

							<div className="mt-5">
								<CreateCategoryDialog />
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
