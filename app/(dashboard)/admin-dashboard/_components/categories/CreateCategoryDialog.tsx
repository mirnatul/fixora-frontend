"use client";

import {
    useRef,
    useState,
} from "react";

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
import { Textarea } from "@/components/ui/textarea";

import { uploadToCloudinary } from "@/lib/cloudinary";

import { Label } from "@/components/ui/label";
import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";

export default function CreateCategoryDialog() {
    const imageType = "rectangle";
    const [editingImage, setEditingImage] = useState(false);
    // ============================================================
    // DIALOG STATE
    // ============================================================

    const [open, setOpen] = useState(false);

    // ============================================================
    // PROCESSED IMAGE
    // ============================================================
    const [processedImage, setProcessedImage] = useState<File | null>(null);

    // ============================================================
    // SUBMIT STATE
    // ============================================================

    const [isSubmitting, setIsSubmitting] = useState(false);

    // ============================================================
    // FORM REF
    // ============================================================

    const formRef = useRef<HTMLFormElement>(null);

    // ============================================================
    // CREATE CATEGORY
    // ============================================================

    const handleCreateCategory = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const form = event.currentTarget;

        // --------------------------------------------------------
        // Make sure image exists
        // --------------------------------------------------------

        if (!processedImage) {
            toast.error(
                "Please select and process an image."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            // ----------------------------------------------------
            // 1. Upload processed image
            // ----------------------------------------------------

            const result = await uploadToCloudinary(processedImage, process.env.NEXT_PUBLIC_API_URL!);

            // ----------------------------------------------------
            // 2. Create FormData
            // ----------------------------------------------------

            const formData = new FormData(form);

            // Remove browser file
            formData.delete("image");

            // Add Cloudinary URL
            formData.set(
                "imageUrl",
                result.url
            );

            // Add Cloudinary public ID
            formData.set(
                "imagePublicId",
                result.publicId
            );

            // ----------------------------------------------------
            // 3. Create category
            // ----------------------------------------------------

            const response =
                await createCategory(
                    formData
                );

            // ----------------------------------------------------
            // 4. Handle response
            // ----------------------------------------------------

            if (!response.success) {
                toast.error(
                    response.message
                );

                return;
            }

            toast.success(
                response.message
            );

            // ----------------------------------------------------
            // 5. Reset
            // ----------------------------------------------------

            formRef.current?.reset();

            setProcessedImage(null);

            setOpen(false);
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create category."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ============================================================
    // UI
    // ============================================================

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button variant="outline">
                    + Create New Category
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-sm">
                <DialogHeader>
                    <DialogTitle>
                        Create Category
                    </DialogTitle>

                    <DialogDescription>
                        Add a new service category.
                    </DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    onSubmit={
                        handleCreateCategory
                    }
                    className="space-y-4"
                >
                    {/* ==================================================
                        IMAGE
                    =================================================== */}

                    <ImageUploadCropper
                        imageType={imageType}
                        onImageProcessed={setProcessedImage}
                        onEditingChange={setEditingImage}
                        disabled={isSubmitting}
                    />

                    {!editingImage && (
                        <>
                            {/* CATEGORY NAME */}

                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Category Name
                                </Label>

                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g. Plumbing"
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* DESCRIPTION */}

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
                                    className="rounded-sm"
                                />
                            </div>

                            {/* SUBMIT */}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Creating category..."
                                    : "Create Category"}
                            </Button>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}