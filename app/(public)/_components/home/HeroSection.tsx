"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";
import {
	ArrowRight,
	Check,
	ChevronDown,
	LayoutDashboard,
	MapPin,
	Search,
	ShieldCheck,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const serviceCategories = [
	{
		name: "Cleaning",
		services: [
			"House Cleaning",
			"Deep Cleaning",
			"Kitchen Cleaning",
			"Bathroom Cleaning",
			"Sofa Cleaning",
			"Carpet Cleaning",
		],
	},
	{
		name: "Plumbing",
		services: [
			"Pipe Repair",
			"Faucet Repair",
			"Water Tank Repair",
			"Drain Cleaning",
			"Toilet Repair",
			"Leak Repair",
		],
	},
	{
		name: "Electrical",
		services: [
			"Electrical Repair",
			"Switch & Socket Repair",
			"Fan Installation",
			"Light Installation",
			"Wiring",
			"Circuit Breaker Repair",
		],
	},
	{
		name: "AC & Cooling",
		services: [
			"AC Servicing",
			"AC Repair",
			"AC Installation",
			"AC Gas Refill",
			"AC Cleaning",
		],
	},
	{
		name: "Appliance Repair",
		services: [
			"Refrigerator Repair",
			"Washing Machine Repair",
			"Microwave Repair",
			"Oven Repair",
			"TV Repair",
		],
	},
	{
		name: "Painting",
		services: [
			"Interior Painting",
			"Exterior Painting",
			"Wall Painting",
			"Ceiling Painting",
			"Touch-up Painting",
		],
	},
	{
		name: "Carpentry",
		services: [
			"Furniture Repair",
			"Door Repair",
			"Cabinet Repair",
			"Furniture Assembly",
			"Custom Furniture",
		],
	},
	{
		name: "Moving",
		services: [
			"Home Moving",
			"Office Moving",
			"Furniture Moving",
			"Packing & Unpacking",
			"Loading & Unloading",
		],
	},
	{
		name: "Pest Control",
		services: [
			"Cockroach Control",
			"Mosquito Control",
			"Ant Control",
			"Termite Control",
			"Bed Bug Control",
		],
	},
	{
		name: "Home Security",
		services: [
			"CCTV Installation",
			"CCTV Repair",
			"Smart Lock Installation",
			"Door Lock Repair",
			"Security System Setup",
		],
	},
	{
		name: "Gardening",
		services: [
			"Garden Maintenance",
			"Plant Care",
			"Lawn Care",
			"Tree Trimming",
			"Plant Installation",
		],
	},
	{
		name: "Handyman",
		services: [
			"Furniture Assembly",
			"Wall Mounting",
			"Curtain Installation",
			"Shelf Installation",
			"Minor Repairs",
		],
	},
	{
		name: "Glass & Aluminum",
		services: [
			"Glass Repair",
			"Glass Installation",
			"Window Repair",
			"Aluminum Work",
			"Sliding Door Repair",
		],
	},
	{
		name: "Roof & Waterproofing",
		services: [
			"Roof Repair",
			"Waterproofing",
			"Leak Repair",
			"Roof Cleaning",
			"Damp Treatment",
		],
	},
	{
		name: "Laundry",
		services: [
			"Wash & Fold",
			"Ironing",
			"Dry Cleaning",
			"Laundry Pickup",
			"Laundry Delivery",
		],
	},
	{
		name: "Interior & Decor",
		services: [
			"Interior Design",
			"Wall Decor",
			"Curtain Installation",
			"Lighting Design",
			"Home Decoration",
		],
	},
	{
		name: "Bathroom Services",
		services: [
			"Bathroom Repair",
			"Tile Repair",
			"Grouting",
			"Shower Installation",
			"Bathroom Renovation",
		],
	},
	{
		name: "Kitchen Services",
		services: [
			"Kitchen Repair",
			"Kitchen Cabinet Repair",
			"Sink Installation",
			"Kitchen Renovation",
			"Countertop Installation",
		],
	},
] as const;

export const dhakaAreas = [
	// Gulshan / Banani / Badda
	"Gulshan 1",
	"Gulshan 2",
	"Banani",
	"Mohakhali",
	"Niketan",
	"Badda",
	"Uttar Badda",
	"Middle Badda",
	"Merul Badda",
	"Shahjadpur",
	"Natun Bazar",
	"Aftabnagar",

	// Uttara / Airport
	"Uttara",
	"Uttara Sector 3",
	"Uttara Sector 4",
	"Uttara Sector 7",
	"Uttara Sector 9",
	"Uttara Sector 10",
	"Uttara Sector 11",
	"Uttara Sector 12",
	"Uttara Sector 13",
	"Uttara Sector 14",
	"Dakshinkhan",
	"Ashkona",
	"Khilkhet",
	"Kuril",
	"Nikunja",
	"Airport",

	// Mirpur
	"Mirpur 1",
	"Mirpur 2",
	"Mirpur 6",
	"Mirpur 10",
	"Mirpur 11",
	"Mirpur 12",
	"Mirpur 13",
	"Mirpur 14",
	"Pallabi",
	"Rupnagar",
	"Kazipara",
	"Shewrapara",
	"Tolarbag",

	// Dhanmondi / Mohammadpur
	"Dhanmondi",
	"Jigatola",
	"Kalabagan",
	"Shankar",
	"Mohammadpur",
	"Adabor",
	"Shyamoli",
	"Kallyanpur",
	"Lalmatia",

	// Tejgaon / Farmgate
	"Tejgaon",
	"Tejgaon Industrial Area",
	"Farmgate",
	"Karwan Bazar",
	"Nakhalpara",
	"Moghbazar",
	"Hatirjheel",

	// Rampura / Khilgaon
	"Rampura",
	"East Rampura",
	"Khilgaon",
	"Taltola",
	"Malibagh",
	"Basabo",
	"Banasree",

	// Motijheel / Paltan
	"Motijheel",
	"Paltan",
	"Purana Paltan",
	"Kakrail",
	"Fakirapool",
	"Segunbagicha",
	"Shantinagar",
	"Dilkusha",

	// Old Dhaka
	"Old Dhaka",
	"Wari",
	"Sutrapur",
	"Gendaria",
	"Lalbagh",
	"Chawkbazar",
	"Bangshal",
	"Islampur",
	"Sadarghat",

	// Baridhara / Bashundhara
	"Baridhara",
	"Baridhara DOHS",
	"Bashundhara R/A",
	"Joar Sahara",
	"Vatara",
] as const;

const trustItems = [
	{
		icon: "★",
		title: "Top-Rated Pros",
		description: "Highly rated",
		iconClass: "bg-yellow-100 text-yellow-600",
	},
	{
		icon: "✓",
		title: "Verified Pros",
		description: "Trusted professionals",
		iconClass: "bg-green-100 text-green-600",
	},
	{
		icon: "◉",
		title: "Local Pros",
		description: "Experts near you",
		iconClass: "bg-blue-100 text-blue-600",
	},
	{
		icon: "♥",
		title: "Customer Favorites",
		description: "Loved by customers",
		iconClass: "bg-red-100 text-red-600",
	},
];

export default function HeroSection({ user }: any) {
	const [scrolled, setScrolled] = useState(false);

	const [selectedArea, setSelectedArea] = useState("");
	const [locationSearch, setLocationSearch] = useState("");
	const [isLocationOpen, setIsLocationOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const [hoveredCategory, setHoveredCategory] = useState<
		(typeof serviceCategories)[number] | null
	>(null);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleFindServices = () => {
		console.log({
			area: selectedArea,
			category: selectedCategory,
		});
	};

	return (
		<div className="relative overflow-hidden bg-green-50">
			{/* Navbar */}
			<div
				className={`fixed left-0 right-0 top-0 z-999 transition-all duration-300 ${
					scrolled ? "bg-white/95 shadow-md backdrop-blur-md" : "bg-transparent"
				}`}
			>
				<Navbar user={user} />
			</div>

			{/* Hero */}
			<section className="relative">
				<div className="grid min-h-[90vh] xl:min-h-162.5 xl:grid-cols-[60%_40%] 2xl:min-h-187.5">
					{/* ================= LEFT: CONTENT ================= */}
					<div className="flex min-h-[78vh] items-center px-5 pt-28 pb-6 sm:px-8 md:px-10 lg:pl-8 lg:pt-40 xl:min-h-162.5 xl:pl-10 2xl:min-h-187.5 2xl:pl-36 3xl:min-h-[850px]">
						<div className="w-full max-w-full pl-0">
							{/* Trust badge */}
							{/* <div className="mb-5">
								<span className="inline-flex max-w-full items-center gap-2 rounded-sm border px-3 py-2 text-xs font-medium text-[#007A55] shadow-sm sm:px-4 sm:text-sm">
									<ShieldCheck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

									<span>Trusted Home Services, Just a Click Away</span>
								</span>
							</div> */}
							<div className="mb-5">
								<span className="inline-flex max-w-full items-center gap-2 rounded-sm border border-green-200 bg-green-100 px-3 py-2 text-xs font-medium text-[#007A55] shadow-sm sm:px-4 sm:text-sm">
									<ShieldCheck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
									<span>Trusted Home Services, Just a Click Away</span>
								</span>
							</div>

							{/* Heading */}
							<div>
								<h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
									Find Trusted Experts.
									<br />
									<span className="text-[#007A55]">Get Things Done.</span>
								</h1>

								<p className="mb-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
									From home repairs to cleaning, Fixora connects you with
									verified professionals who get the job done right.
								</p>
							</div>

							{/* Search Booking Box */}
							<div className="relative z-50 flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/40 sm:p-5 lg:flex-row lg:items-center">
								{/* Location */}
								<div className="flex min-w-0 flex-1 items-center gap-3 border-b border-gray-100 pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007A55]/10">
										<MapPin className="text-[#007A55]" size={21} />
									</div>

									<div className="min-w-0 flex-1">
										<p className="pl-1 text-xs font-medium text-muted-foreground sm:text-sm">
											Your Location
										</p>

										<button
											type="button"
											onClick={() => setIsLocationOpen(true)}
											className="mt-1 flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50/70 px-3 py-2 text-left text-sm font-semibold text-gray-800 transition-all hover:bg-gray-100 sm:text-base"
										>
											<span className="truncate">
												{selectedArea || "Select Area"}
											</span>

											<ChevronDown
												size={17}
												className="ml-2 shrink-0 text-gray-400"
											/>
										</button>
									</div>
								</div>

								{/* Location Modal */}
								{/* Location Modal */}
								{isLocationOpen && (
									<div className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto p-4 pt-[10vh]">
										{/* Backdrop */}
										<button
											type="button"
											aria-label="Close location selector"
											onClick={() => {
												setIsLocationOpen(false);
												setLocationSearch("");
											}}
											className="absolute inset-0 cursor-default bg-black/30 backdrop-blur-[2px]"
										/>

										{/* Modal */}
										<div
											role="dialog"
											aria-modal="true"
											className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
										>
											{/* Header */}
											<div className="shrink-0 border-b border-gray-100 bg-gray-50/70 p-5">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3">
														<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007A55]/10">
															<MapPin size={20} className="text-[#007A55]" />
														</div>

														<div>
															<h3 className="text-base font-semibold text-gray-900">
																Choose your location
															</h3>

															<p className="text-xs text-gray-400">
																Select an area in Dhaka
															</p>
														</div>
													</div>

													<button
														type="button"
														onClick={() => {
															setIsLocationOpen(false);
															setLocationSearch("");
														}}
														className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
													>
														<X size={18} />
													</button>
												</div>

												{/* Search */}
												<div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-[#007A55]/40 focus-within:ring-2 focus-within:ring-[#007A55]/10">
													<Search
														size={17}
														className="shrink-0 text-gray-400"
													/>

													<input
														type="text"
														value={locationSearch}
														onChange={(e) => setLocationSearch(e.target.value)}
														placeholder="Search area..."
														className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
													/>

													{locationSearch && (
														<button
															type="button"
															onClick={() => setLocationSearch("")}
															className="text-xs text-gray-400 hover:text-gray-700"
														>
															Clear
														</button>
													)}
												</div>
											</div>

											{/* Areas */}
											<div className="h-[360px] overflow-y-auto p-3">
												{dhakaAreas
													.filter((area) =>
														area
															.toLowerCase()
															.includes(locationSearch.toLowerCase()),
													)
													.map((area) => {
														const isSelected = selectedArea === area;

														return (
															<button
																key={area}
																type="button"
																onClick={() => {
																	setSelectedArea(area);
																	setLocationSearch("");
																	setIsLocationOpen(false);
																}}
																className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${
																	isSelected
																		? "bg-[#007A55]/5 text-[#007A55]"
																		: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
																}`}
															>
																<span
																	className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
																		isSelected
																			? "bg-[#007A55]/10"
																			: "bg-gray-100 group-hover:bg-[#007A55]/10"
																	}`}
																>
																	<MapPin
																		size={16}
																		className={
																			isSelected
																				? "text-[#007A55]"
																				: "text-gray-400 group-hover:text-[#007A55]"
																		}
																	/>
																</span>

																<span className="flex-1 truncate font-medium">
																	{area}
																</span>

																{isSelected && (
																	<Check
																		size={17}
																		className="shrink-0 text-[#007A55]"
																	/>
																)}
															</button>
														);
													})}

												{/* No Results */}
												{dhakaAreas.filter((area) =>
													area
														.toLowerCase()
														.includes(locationSearch.toLowerCase()),
												).length === 0 && (
													<div className="flex h-full flex-col items-center justify-center text-center">
														<MapPin size={30} className="mb-3 text-gray-300" />

														<p className="text-sm font-medium text-gray-500">
															No area found
														</p>

														<p className="mt-1 text-xs text-gray-400">
															Try searching another Dhaka area
														</p>
													</div>
												)}
											</div>

											{/* Footer */}
											<div className="shrink-0 border-t border-gray-100 bg-gray-50/50 px-5 py-3">
												<p className="text-center text-[11px] text-gray-400">
													{dhakaAreas.length} areas available in Dhaka
												</p>
											</div>
										</div>
									</div>
								)}

								{/* Category */}
								<div className="flex min-w-0 flex-1 items-center gap-3 border-b border-gray-100 pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
									<LayoutDashboard
										className="shrink-0 text-[#007A55]"
										size={24}
									/>

									<div className="min-w-0 flex-1">
										<p className="pl-1 text-xs text-muted-foreground sm:text-sm">
											Select Category
										</p>

										<button
											type="button"
											onClick={() => {
												setIsCategoryOpen((prev) => !prev);

												if (!hoveredCategory) {
													setHoveredCategory(serviceCategories[0]);
												}
											}}
											className="mt-1 flex w-full cursor-pointer items-center justify-between gap-2 bg-transparent text-left text-sm font-medium outline-none sm:text-base"
										>
											<span className="truncate">
												{selectedCategory || "Select Category"}
											</span>

											<ChevronDown
												size={18}
												className={`shrink-0 text-gray-500 transition-transform ${
													isCategoryOpen ? "rotate-180" : ""
												}`}
											/>
										</button>

										{isCategoryOpen && (
											<>
												{/* Backdrop */}
												{/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop */}
												{/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop */}
												<div
													className="fixed inset-0 z-[98] bg-black/20 backdrop-blur-[2px]"
													onClick={() => {
														setIsCategoryOpen(false);
														setHoveredCategory(null);
													}}
												/>

												{/* Modal */}
												<div className="fixed left-1/2 top-1/2 z-[99] w-[min(720px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
													<div className="flex max-h-[75vh] min-h-[400px] flex-col md:flex-row">
														{/* Categories */}
														<div className="w-full overflow-y-auto bg-gray-50 p-3 md:w-[42%] md:shrink-0 md:border-r md:border-gray-100">
															<div className="mb-2 px-3 py-2">
																<p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
																	Service Categories
																</p>
															</div>

															<div className="space-y-1">
																{serviceCategories.map((category) => {
																	const isActive =
																		hoveredCategory?.name === category.name;

																	const isSelected =
																		selectedCategory === category.name;

																	return (
																		<button
																			key={category.name}
																			type="button"
																			onMouseEnter={() =>
																				setHoveredCategory(category)
																			}
																			onClick={() => {
																				setSelectedCategory(category.name);
																				setIsCategoryOpen(false);
																				setHoveredCategory(null);
																			}}
																			className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-all ${
																				isSelected
																					? "bg-white text-[#007A55] shadow-sm"
																					: "text-gray-600 md:hover:bg-white md:hover:text-gray-900"
																			}`}
																		>
																			<span className="flex min-w-0 items-center gap-2">
																				{isSelected && (
																					<Check
																						size={15}
																						className="shrink-0 text-[#007A55]"
																					/>
																				)}

																				<span className="truncate">
																					{category.name}
																				</span>
																			</span>

																			{/* Arrow only on desktop */}
																			<span
																				className={`hidden md:inline ${
																					isActive
																						? "text-[#007A55]"
																						: "text-gray-300"
																				}`}
																			>
																				→
																			</span>
																		</button>
																	);
																})}
															</div>
														</div>

														{/* Services Preview — DESKTOP ONLY */}
														<div className="hidden min-w-0 flex-1 flex-col overflow-y-auto p-6 md:flex">
															{hoveredCategory && (
																<>
																	<div className="mb-6 flex items-center gap-3">
																		<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007A55]/10">
																			<LayoutDashboard
																				size={20}
																				className="text-[#007A55]"
																			/>
																		</div>

																		<div>
																			<h3 className="font-semibold text-gray-900">
																				{hoveredCategory.name}
																			</h3>

																			<p className="text-xs text-gray-400">
																				{hoveredCategory.services.length}{" "}
																				services available
																			</p>
																		</div>
																	</div>

																	<div className="grid grid-cols-2 gap-3">
																		{hoveredCategory.services.map((service) => (
																			<div
																				key={service}
																				className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-xs font-medium text-gray-600"
																			>
																				{service}
																			</div>
																		))}
																	</div>
																</>
															)}
														</div>
													</div>
												</div>
											</>
										)}
									</div>
								</div>

								{/* Book Now */}
								<Button
									size="lg"
									disabled={!selectedArea || !selectedCategory}
									onClick={handleFindServices}
									className="cursor-pointer h-12 w-full shrink-0 rounded-lg bg-[#007A55] px-6 hover:bg-[#006044] disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 lg:w-auto lg:px-8"
								>
									Find Services
									<ArrowRight className="ml-2" />
								</Button>
							</div>

							{/* Features */}
							<div className="my-8 grid grid-cols-2 gap-3 sm:my-10 sm:grid-cols-4 sm:gap-4">
								{trustItems.map((item) => (
									<div
										key={item.title}
										className="rounded-2xl border shadow-sm hover:shadow-lg bg-green-50 p-4"
									>
										<div
											className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${item.iconClass}`}
										>
											{item.icon}
										</div>

										<p className="text-sm font-semibold text-gray-900">
											{item.title}
										</p>

										<p className="mt-1 text-xs text-gray-500">
											{item.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* ================= RIGHT: IMAGE ================= */}
					<div className="relative hidden min-h-[650px] w-full xl:block 2xl:min-h-[750px]">
						{/* Main Image Container */}
						<div className="relative h-full min-h-[650px] w-full 2xl:min-h-[750px]">
							{/* Main Hero Image */}
							<Image
								src="/images/banner-images/hero-image-2.png"
								alt="Home service professionals"
								fill
								className="object-contain object-right-top"
								unoptimized
								priority
							/>

							{/* ================= RATING CARD ================= */}
							<div className="absolute left-[10%] top-[20%] rounded-xl bg-white px-4 py-2 shadow-md">
								<div className="flex items-center gap-2">
									<div className="flex -space-x-3">
										<Avatar className="h-11 w-11 border-2 border-white">
											<AvatarImage src="/images/user/user-1.jpg" />
											<AvatarFallback>U</AvatarFallback>
										</Avatar>

										<Avatar className="h-11 w-11 border-2 border-white">
											<AvatarImage src="/images/user/user-2.jpg" />
											<AvatarFallback>U</AvatarFallback>
										</Avatar>

										<Avatar className="h-11 w-11 border-2 border-white">
											<AvatarImage src="/images/user/user-3.jpg" />
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
									</div>

									<span className="text-base font-bold">4.8 ⭐</span>
								</div>

								<p className="ml-2 mt-1 text-sm text-muted-foreground">
									1200+ Happy Customers
								</p>
							</div>

							{/* ================= PLUMBING ================= */}
							<Image
								src="/images/banner-images/plumbing.png"
								alt="Plumbing service"
								width={230}
								height={230}
								className="
                                    absolute
                                    left-[-2%]
                                    top-[38%]
                                    w-44

                                    2xl:left-[-5%]
                                    2xl:top-[35%]
                                    2xl:w-50
                                "
								unoptimized
							/>

							{/* ================= CLEANING ================= */}
							<Image
								src="/images/banner-images/home-cleaning.png"
								alt="Home cleaning service"
								width={230}
								height={230}
								className="
                                    absolute
                                    left-[6%]
                                    top-[70%]
                                    w-40

                                    2xl:left-[2%]
                                    2xl:top-[67%]
                                    2xl:w-48
                                "
								unoptimized
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
