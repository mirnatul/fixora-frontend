"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { createService } from "../../_actions/createService";

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

interface Category {
    id: string;
    name: string;
}

interface Props {
    userId: string;
    categories: Category[];
}

export default function CreateServiceDialog({
    userId,
    categories,
}: Props) {
    const [open, setOpen] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, pending] = useActionState(
        createService,
        initialState
    );

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            setOpen(false);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    + Create New Service
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Service</DialogTitle>

                    <DialogDescription>
                        Add a new service to your profile.
                    </DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="space-y-4"
                >
                    <input
                        type="hidden"
                        name="technicianId"
                        value={userId}
                    />

                    {/* Title */}
                    <div>
                        <Label htmlFor="title">
                            Title
                        </Label>

                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Pipe Leak Repair"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your service..."
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="categoryId">
                            Category
                        </Label>

                        <select
                            id="categoryId"
                            name="categoryId"
                            defaultValue=""
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option
                                value=""
                                disabled
                            >
                                Select Category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">
                                Price (৳)
                            </Label>

                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min={0}
                                placeholder="e.g. 1500"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="duration">
                                Duration (Minutes)
                            </Label>

                            <Input
                                id="duration"
                                name="duration"
                                type="number"
                                min={1}
                                placeholder="e.g. 90"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <Label htmlFor="location">
                            Location
                        </Label>

                        <Input
                            id="location"
                            name="location"
                            placeholder="e.g. Dhaka"
                            required
                        />
                    </div>

                    {/* Error/Success Message */}
                    {state.message && (
                        <p
                            className={`text-sm ${state.success
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {state.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={pending}
                        className="w-full"
                    >
                        {pending
                            ? "Creating..."
                            : "Create Service"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}