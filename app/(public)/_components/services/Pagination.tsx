"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({
    currentPage,
    totalPages,
}: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.replace(`${pathname}?${params.toString()}`);
    };

    const createPages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {createPages().map((page, index) =>
                page === "..." ? (
                    <span key={index} className="px-2">
                        ...
                    </span>
                ) : (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}