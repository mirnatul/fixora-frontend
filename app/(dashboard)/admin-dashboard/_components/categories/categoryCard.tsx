"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { updateCategory } from "../../_actions/updateCategory";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryCardProps {
    category: Category;
}

const initialState = {
    success: false,
    message: "",
};

export default function CategoryCard({
    category,
}: CategoryCardProps) {
    const [open, setOpen] = useState(false);

    const updateCategoryAction = updateCategory.bind(
        null,
        category.id
    );

    const [state, action, pending] = useActionState(
        updateCategoryAction,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(
                state.message || "Category updated successfully."
            );

            setOpen(false);
        } else {
            toast.error(
                state.message || "Failed to update category."
            );
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-card">
                {/* Header */}
                <div className="border-b border-border p-5">
                    <h3 className="text-xl font-semibold text-foreground">
                        {category.name}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                        {category.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4">
                    <span className="text-xs text-muted-foreground">
                        Created{" "}
                        {new Date(
                            category.createdAt
                        ).toLocaleDateString()}
                    </span>

                    <DialogTrigger asChild>
                        <Button variant="outline">
                            Update Category
                        </Button>
                    </DialogTrigger>
                </div>
            </div>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Update Category
                    </DialogTitle>

                    <DialogDescription>
                        Update the category name and description.
                    </DialogDescription>
                </DialogHeader>

                <form
                    action={action}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Category Name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            defaultValue={category.name}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={category.description}
                            rows={4}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={pending}
                        className="w-full"
                    >
                        {pending
                            ? "Updating..."
                            : "Update Category"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}