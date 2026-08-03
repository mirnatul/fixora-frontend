"use client";

import { AlertTriangle, RotateCcw, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorStateProps {
    error?: Error & { digest?: string };
    reset?: () => void;
    title?: string;
    description?: string;
    homeHref?: string;
    homeLabel?: string;
}

export default function ErrorState({
    reset,
    title = "Something went wrong",
    description = "An unexpected error occurred. Please try again. If the problem persists, contact support.",
    homeHref = "/",
    homeLabel = "Go Home",
}: ErrorStateProps) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>

                <h2 className="text-2xl font-bold">{title}</h2>

                <p className="mt-3 text-sm text-muted-foreground">
                    {description}
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    {reset && (
                        <Button onClick={reset}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    )}

                    <Button variant="outline" asChild>
                        <Link href={homeHref}>
                            <House className="mr-2 h-4 w-4" />
                            {homeLabel}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}