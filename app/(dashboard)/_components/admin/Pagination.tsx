"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    meta: {
        page: number;
        totalPage: number;
    };
}

export default function Pagination({ meta }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    if (!meta || meta.totalPage <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-center gap-2">

            <Button
                variant="outline"
                size="icon"
                disabled={meta.page === 1}
                onClick={() => goToPage(meta.page - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: meta.totalPage }, (_, index) => {
                const page = index + 1;

                return (
                    <Button
                        key={page}
                        variant={meta.page === page ? "default" : "outline"}
                        className="h-10 w-10 p-0"
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                size="icon"
                disabled={meta.page === meta.totalPage}
                onClick={() => goToPage(meta.page + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}