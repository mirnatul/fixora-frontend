"use client";

import CategoryCard from "./categoryCard";

interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoriesGridProps {
    categories: Category[];
}

export default function CategoriesGrid({
    categories,
}: CategoriesGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    );
}