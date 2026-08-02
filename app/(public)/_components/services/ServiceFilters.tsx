"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ServiceFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("searchTerm") ?? ""
    );

    const [minPrice, setMinPrice] = useState(
        searchParams.get("minPrice") ?? ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") ?? ""
    );


    const updateParams = (updates: Record<string, string | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (!value || value === "all") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        // Reset pagination when filter changes
        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`);
    };


    // Search debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams({
                searchTerm: search,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);


    // Min price debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams({
                minPrice,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [minPrice]);


    // Max price debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams({
                maxPrice,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [maxPrice]);


    return (
        <div className="mb-8 rounded-lg border bg-background p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

                {/* Search */}
                <Input
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />


                {/* Rating */}
                <Select
                    value={searchParams.get("rating") ?? "all"}
                    onValueChange={(value) =>
                        updateParams({
                            rating: value,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Rating" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">
                            All Ratings
                        </SelectItem>

                        <SelectItem value="5">
                            5★
                        </SelectItem>

                        <SelectItem value="4">
                            4★ & Up
                        </SelectItem>

                        <SelectItem value="3">
                            3★ & Up
                        </SelectItem>

                        <SelectItem value="2">
                            2★ & Up
                        </SelectItem>

                        <SelectItem value="1">
                            1★ & Up
                        </SelectItem>
                    </SelectContent>
                </Select>


                {/* Min Price */}
                <Input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) =>
                        setMinPrice(e.target.value)
                    }
                />


                {/* Max Price */}
                <Input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) =>
                        setMaxPrice(e.target.value)
                    }
                />


                {/* Sort */}
                <Select
                    value={
                        searchParams.get("sort") &&
                            searchParams.get("order")
                            ? `${searchParams.get("sort")}-${searchParams.get("order")}`
                            : ""
                    }
                    onValueChange={(value) => {
                        const [sort, order] = value.split("-");

                        updateParams({
                            sort,
                            order,
                        });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="price-asc">
                            Price: Low → High
                        </SelectItem>

                        <SelectItem value="price-desc">
                            Price: High → Low
                        </SelectItem>

                        <SelectItem value="rating-desc">
                            Highest Rated
                        </SelectItem>

                        <SelectItem value="createdAt-desc">
                            Newest
                        </SelectItem>
                    </SelectContent>
                </Select>

            </div>
        </div>
    );
}