"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { createCategory } from "../../_actions/createCategory";

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

const initialState = {
    success: false,
    message: "",
};

export default function CreateCategoryDialog() {
    const [open, setOpen] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, pending] = useActionState(
        createCategory,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(
                state.message || "Category created successfully."
            );

            formRef.current?.reset();
            setOpen(false);
        } else {
            toast.error(
                state.message || "Failed to create category."
            );
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    + Create New Category
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>

                    <DialogDescription>
                        Add a new service category.
                    </DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Category Name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Plumbing"
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
                            placeholder="Enter category description..."
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
                            ? "Creating..."
                            : "Create Category"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}