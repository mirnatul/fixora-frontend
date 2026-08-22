"use client";

import { useCallback, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { dhakaAreas } from "@/constants/dhakaAreas";

interface Category {
	id: string;
	name: string;
}

interface ServiceFiltersProps {
	categories: Category[];
}

export default function ServiceFilters({ categories }: ServiceFiltersProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	/*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

	const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");

	/*
    |--------------------------------------------------------------------------
    | FILTER STATE
    |--------------------------------------------------------------------------
    */

	const [categoryId, setCategoryId] = useState(
		searchParams.get("categoryId") ?? "all",
	);

	const [location, setLocation] = useState(
		searchParams.get("location") ?? "all",
	);

	const [rating, setRating] = useState(searchParams.get("rating") ?? "all");

	const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");

	const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

	const [sort, setSort] = useState(() => {
		const sortValue = searchParams.get("sort");
		const orderValue = searchParams.get("order");

		return sortValue && orderValue ? `${sortValue}-${orderValue}` : "none";
	});

	/*
    |--------------------------------------------------------------------------
    | KEEP SEARCH IN SYNC WITH URL
    |--------------------------------------------------------------------------
    */

	useEffect(() => {
		const urlSearch = searchParams.get("searchTerm") ?? "";

		setSearch(urlSearch);
	}, [searchParams]);

	/*
    |--------------------------------------------------------------------------
    | KEEP FILTER STATE IN SYNC WITH URL
    |--------------------------------------------------------------------------
    */

	useEffect(() => {
		setCategoryId(searchParams.get("categoryId") ?? "all");

		setLocation(searchParams.get("location") ?? "all");

		setRating(searchParams.get("rating") ?? "all");

		setMinPrice(searchParams.get("minPrice") ?? "");

		setMaxPrice(searchParams.get("maxPrice") ?? "");

		const sortValue = searchParams.get("sort");
		const orderValue = searchParams.get("order");

		setSort(sortValue && orderValue ? `${sortValue}-${orderValue}` : "none");
	}, [searchParams]);

	/*
    |--------------------------------------------------------------------------
    | REAL-TIME SEARCH WITH DEBOUNCE
    |--------------------------------------------------------------------------
    |
    | User types:
    |
    | p
    | pl
    | plu
    | plum
    | plumb
    | plumber
    |
    | We DON'T make 7 requests.
    |
    | We wait 500ms after the user stops typing.
    |
    */

	useEffect(() => {
		const currentSearch = searchParams.get("searchTerm") ?? "";

		/*
        | If URL already has the same search,
        | don't do anything.
        */

		if (search === currentSearch) {
			return;
		}

		const timer = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			if (search.trim()) {
				params.set("searchTerm", search.trim());
			} else {
				params.delete("searchTerm");
			}

			/*
            | New search = first page
            */

			params.set("page", "1");

			router.replace(`${pathname}?${params.toString()}`, {
				scroll: false,
			});
		}, 500);

		/*
        | Very important:
        |
        | If user types again before 500ms,
        | cancel the previous timer.
        */

		return () => clearTimeout(timer);
	}, [search, searchParams, pathname, router]);

	/*
    |--------------------------------------------------------------------------
    | APPLY FILTERS
    |--------------------------------------------------------------------------
    |
    | Filters don't change the URL while the user is selecting.
    |
    | They are applied only when OK is clicked.
    |
    */

	const applyFilters = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());

		/*
        | Category
        */

		if (categoryId === "all") {
			params.delete("categoryId");
		} else {
			params.set("categoryId", categoryId);
		}

		/*
        | Location
        */

		if (location === "all") {
			params.delete("location");
		} else {
			params.set("location", location);
		}

		/*
        | Rating
        */

		if (rating === "all") {
			params.delete("rating");
		} else {
			params.set("rating", rating);
		}

		/*
        | Minimum price
        */

		if (minPrice.trim()) {
			params.set("minPrice", minPrice);
		} else {
			params.delete("minPrice");
		}

		/*
        | Maximum price
        */

		if (maxPrice.trim()) {
			params.set("maxPrice", maxPrice);
		} else {
			params.delete("maxPrice");
		}

		/*
        | Sort
        */

		if (sort !== "none") {
			const [sortField, order] = sort.split("-");

			params.set("sort", sortField);

			params.set("order", order);
		} else {
			params.delete("sort");
			params.delete("order");
		}

		/*
        | Reset pagination
        */

		params.set("page", "1");

		/*
        | One URL update
        */

		router.replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	}, [
		categoryId,
		location,
		rating,
		minPrice,
		maxPrice,
		sort,
		searchParams,
		pathname,
		router,
	]);

	/*
    |--------------------------------------------------------------------------
    | CLEAR FILTERS
    |--------------------------------------------------------------------------
    |
    | Search stays active.
    |
    */

	const clearAllFilters = () => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete("categoryId");
		params.delete("location");
		params.delete("rating");
		params.delete("minPrice");
		params.delete("maxPrice");
		params.delete("sort");
		params.delete("order");

		/*
        | DON'T delete searchTerm
        */

		params.set("page", "1");

		/*
        | Reset local filter state
        */

		setCategoryId("all");
		setLocation("all");
		setRating("all");
		setMinPrice("");
		setMaxPrice("");
		setSort("none");

		router.replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	};

	return (
		<div className="w-full">
			{/*
            |--------------------------------------------------------------------------
            | SEARCH + FILTER BUTTON
            |--------------------------------------------------------------------------
            */}

			<div className="flex w-full items-center gap-3">
				{/* SEARCH IS OUTSIDE THE FILTER BOX */}

				<div className="flex-1">
					<Input
						className="rounded-sm border-green-700"
						type="text"
						placeholder="Search services..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* FILTER BUTTON */}

				<Dialog>
					<DialogTrigger asChild>
						<button
							type="button"
							className="shrink-0 rounded-lg border bg-primary text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
						>
							Filters
						</button>
					</DialogTrigger>

					{/*
                    |--------------------------------------------------------------------------
                    | FILTER DIALOG
                    |--------------------------------------------------------------------------
                    */}

					<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-xl">Filters</DialogTitle>

							<p className="text-sm text-muted-foreground">
								Find the right service for you
							</p>
						</DialogHeader>

						<div className="space-y-5 pt-2">
							{/* CATEGORY */}

							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium">Category</label>

								<Select value={categoryId} onValueChange={setCategoryId}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Category" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="all">All Categories</SelectItem>

										{categories.map((category) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* LOCATION */}

							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium">Location</label>

								<Select value={location} onValueChange={setLocation}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Location" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="all">All Locations</SelectItem>

										{dhakaAreas.map((area) => (
											<SelectItem key={area} value={area}>
												{area}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* RATING */}

							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium">Rating</label>

								<Select value={rating} onValueChange={setRating}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Rating" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="all">All Ratings</SelectItem>

										<SelectItem value="5">5★</SelectItem>

										<SelectItem value="4">4★ & Up</SelectItem>

										<SelectItem value="3">3★ & Up</SelectItem>

										<SelectItem value="2">2★ & Up</SelectItem>

										<SelectItem value="1">1★ & Up</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* PRICE */}

							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium">Price Range</label>

								<div className="grid grid-cols-2 gap-3">
									<Input
										type="number"
										placeholder="Min"
										value={minPrice}
										onChange={(e) => setMinPrice(e.target.value)}
									/>

									<Input
										type="number"
										placeholder="Max"
										value={maxPrice}
										onChange={(e) => setMaxPrice(e.target.value)}
									/>
								</div>
							</div>

							{/* SORT */}

							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium">Sort By</label>

								<Select value={sort} onValueChange={setSort}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Sort By" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="none">Default</SelectItem>

										<SelectItem value="price-asc">Price: Low → High</SelectItem>

										<SelectItem value="price-desc">
											Price: High → Low
										</SelectItem>

										<SelectItem value="rating-desc">Highest Rated</SelectItem>

										<SelectItem value="createdAt-desc">Newest</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* ACTIONS */}

							<div className="flex items-center justify-between border-t pt-4">
								<button
									type="button"
									onClick={clearAllFilters}
									className="text-sm font-medium text-muted-foreground hover:text-foreground"
								>
									Clear all filters
								</button>

								<DialogTrigger asChild>
									<button
										type="button"
										onClick={applyFilters}
										className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
									>
										Search
									</button>
								</DialogTrigger>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
