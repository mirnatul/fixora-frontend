import { getCategories } from "../_actions/getCategories";
import CategoryGrid from "../_components/categories/CategoryGrid";
import CreateCategoryDialog from "../_components/categories/CreateCategoryDialog";

export default async function AllCategoryPage() {
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-foreground">
                            All Categories
                        </h1>

                        <p className="mt-2 text-gray-700 dark:text-muted-foreground">
                            Manage all service categories available on the platform
                        </p>
                    </div>

                    <CreateCategoryDialog />
                </div>
            </div>

            {/* Categories */}
            <div className="mx-auto max-w-7xl px-4 py-12">
                <CategoryGrid categories={categories.data} />
            </div>
        </main>
    );
}