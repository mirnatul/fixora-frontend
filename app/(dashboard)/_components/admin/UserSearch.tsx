"use client";

import { Input } from "@/components/ui/input";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function UserSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("searchTerm") ?? ""
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (search.trim()) {
                params.set("searchTerm", search.trim());
            } else {
                // Remove searchTerm when input is empty
                params.delete("searchTerm");
            }

            // Always go back to page 1 when searching
            params.set("page", "1");

            const nextUrl = `${pathname}?${params.toString()}`;
            const currentUrl = `${pathname}?${searchParams.toString()}`;

            if (nextUrl !== currentUrl) {
                router.replace(nextUrl);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <Input
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
        />
    );
}