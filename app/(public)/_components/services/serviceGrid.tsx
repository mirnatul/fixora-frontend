"use client";

import { useState } from "react";

import ServiceCard from "./serviceCard";
import DescriptionModal from "./descriptionModel";
import Pagination from "./Pagination";

interface Service {
	id: string;
	title: string;
	description: string;
	price: number;
	duration: number;
	location: string;
	rating: string;
	active: boolean;
	technicianId: string;
	categoryId: string;
	category: {
		name: string;
	};
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
}

interface Meta {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
}

interface ServicesGridProps {
	services: Service[];
	meta: Meta;
	userRole: string;
	isLoggedIn: boolean;
}

export default function ServicesGrid({
	services,
	meta,
	userRole,
}: ServicesGridProps) {
	const [selectedDescription, setSelectedDescription] = useState<{
		id: string;
		title: string;
		description: string;
	} | null>(null);

	const activeServices = services.filter((service) => service.active);

	return (
		<>
			{/* ==================================================
                SERVICES GRID
            ================================================== */}
			{activeServices.length > 0 ? (
				<div
					className="
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        xl:grid-cols-3
                    "
				>
					{activeServices.map((service) => (
						<div key={service.id} className="h-full">
							<ServiceCard
								service={service}
								role={userRole as "CUSTOMER" | "TECHNICIAN" | "ADMIN"}
								// isLoggedIn={isLoggedIn}
								onSeeMore={() =>
									setSelectedDescription({
										id: service.id,
										title: service.title,
										description: service.description,
									})
								}
							/>
						</div>
					))}
				</div>
			) : (
				/* ==================================================
                    EMPTY STATE
                ================================================== */
				<div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/70 px-6 text-center dark:border-border dark:bg-card/50">
					{/* Icon */}
					<div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#007A55]/[0.08] text-[#007A55]">
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
						<svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
							<path
								d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					</div>

					{/* Title */}
					<h2 className="text-lg font-bold text-slate-900 dark:text-foreground">
						No services found
					</h2>

					{/* Description */}
					<p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
						Try changing your search criteria or filters to discover more
						professional services.
					</p>
				</div>
			)}

			{/* ==================================================
                DESCRIPTION MODAL
            ================================================== */}
			{selectedDescription && (
				<DescriptionModal
					title={selectedDescription.title}
					description={selectedDescription.description}
					onClose={() => setSelectedDescription(null)}
				/>
			)}

			{/* ==================================================
                PAGINATION
            ================================================== */}
			{meta.totalPage > 1 && (
				<div className="mt-10 flex justify-center">
					<Pagination currentPage={meta.page} totalPages={meta.totalPage} />
				</div>
			)}
		</>
	);
}
