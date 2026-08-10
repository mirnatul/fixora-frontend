"use client";

import UpdateCategoryDialog from "./UpdateCategoryDialog";

interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({
    category,
}: CategoryCardProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-card">

            {/* ==================================================
                CATEGORY IMAGE
            =================================================== */}

            <div className="aspect-video w-full overflow-hidden bg-muted">
                {category.imageUrl ? (
                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            {/* ==================================================
                CATEGORY INFO
            =================================================== */}

            <div className="border-b border-border p-5">
                <h3 className="text-xl font-semibold text-foreground">
                    {category.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {category.description}
                </p>
            </div>

            {/* ==================================================
                CARD FOOTER
            =================================================== */}

            <div className="flex items-center justify-between p-4">
                <span className="text-xs text-muted-foreground">
                    Created{" "}
                    {new Date(
                        category.createdAt
                    ).toLocaleDateString()}
                </span>

                <UpdateCategoryDialog
                    category={category}
                />
            </div>
        </div>
    );
}