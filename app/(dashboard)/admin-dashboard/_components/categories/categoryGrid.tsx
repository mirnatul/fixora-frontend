// "use client";

// import CategoryCard from "./CategoryCard";

// interface Category {
// 	id: string;
// 	name: string;
// 	description: string;
// 	categoryServices: string;
// 	imageUrl: string | null;
// 	imagePublicId: string | null;
// 	createdAt: string;
// 	updatedAt: string;
// }

// interface CategoryGridProps {
// 	categories: Category[];
// }

// export default function CategoryGrid({ categories }: CategoryGridProps) {
// 	return (
// 		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
// 			{categories.map((category) => (
// 				<CategoryCard key={category.id} category={category} />
// 			))}
// 		</div>
// 	);
// }

"use client";

import CategoryCard from "./CategoryCard";

interface Category {
	id: string;
	name: string;
	description: string;
	categoryServices: string;
	imageUrl: string | null;
	imagePublicId: string | null;
	createdAt: string;
	updatedAt: string;
}

interface CategoryGridProps {
	categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
	return (
		<div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
			{categories.map((category) => (
				<CategoryCard key={category.id} category={category} />
			))}
		</div>
	);
}
