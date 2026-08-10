"use client";

import { useState } from "react";
import { toast } from "sonner";

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

import { uploadToCloudinary } from "@/lib/cloudinary";
import { updateCategory } from "../../_actions/updateCategory";
import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";

interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface UpdateCategoryDialogProps {
    category: Category;
}

export default function UpdateCategoryDialog({
    category,
}: UpdateCategoryDialogProps) {
    // ============================================================
    // DIALOG STATE
    // ============================================================

    const [open, setOpen] = useState(false);

    // ============================================================
    // IMAGE STATE
    // ============================================================

    // New cropped/processed image
    const [processedImage, setProcessedImage] =
        useState<File | null>(null);

    // Whether user removed the existing image
    const [imageRemoved, setImageRemoved] =
        useState(false);

    // Whether the image cropper is currently open
    const [editingImage, setEditingImage] =
        useState(false);

    // ============================================================
    // SUBMIT STATE
    // ============================================================

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    // ============================================================
    // UPDATE CATEGORY
    // ============================================================

    const handleUpdateCategory = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const form = event.currentTarget;

        try {
            setIsSubmitting(true);

            // Create FormData from name + description
            const formData = new FormData(form);

            // ==================================================
            // CASE 1:
            // USER SELECTED A NEW IMAGE
            // ==================================================

            if (processedImage) {
                const result =
                    await uploadToCloudinary(
                        processedImage,
                        process.env.NEXT_PUBLIC_API_URL!
                    );

                // New Cloudinary URL
                formData.set(
                    "imageUrl",
                    result.url
                );

                // New Cloudinary public ID
                formData.set(
                    "imagePublicId",
                    result.publicId
                );

                // Existing image that should be deleted
                formData.set(
                    "oldImagePublicId",
                    category.imagePublicId ?? ""
                );
            }

            // ==================================================
            // CASE 2:
            // USER REMOVED THE IMAGE
            // ==================================================

            else if (imageRemoved) {
                formData.set(
                    "imageUrl",
                    ""
                );

                formData.set(
                    "imagePublicId",
                    ""
                );

                // Existing Cloudinary image
                // that should be deleted
                formData.set(
                    "oldImagePublicId",
                    category.imagePublicId ?? ""
                );
            }

            // ==================================================
            // CASE 3:
            // USER DID NOT TOUCH THE IMAGE
            // ==================================================

            else {
                // Keep existing image
                formData.set(
                    "imageUrl",
                    category.imageUrl ?? ""
                );

                formData.set(
                    "imagePublicId",
                    category.imagePublicId ?? ""
                );
            }

            // ==================================================
            // UPDATE DATABASE
            // ==================================================

            const response =
                await updateCategory(
                    category.id,
                    formData
                );

            // ==================================================
            // HANDLE RESPONSE
            // ==================================================

            if (!response.success) {
                toast.error(
                    response.message ||
                    "Failed to update category."
                );

                return;
            }

            toast.success(
                response.message ||
                "Category updated successfully."
            );

            // ==================================================
            // RESET IMAGE STATE
            // ==================================================

            setProcessedImage(null);
            setImageRemoved(false);
            setEditingImage(false);

            // Close dialog
            setOpen(false);
        } catch (error) {
            console.error(
                "Update category error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update category."
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
            {/* ==================================================
                UPDATE BUTTON
            =================================================== */}

            <DialogTrigger asChild>
                <Button variant="outline">
                    Update Category
                </Button>
            </DialogTrigger>

            {/* ==================================================
                UPDATE DIALOG
            =================================================== */}

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Update Category
                    </DialogTitle>

                    <DialogDescription>
                        Update the category image, name and
                        description.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={
                        handleUpdateCategory
                    }
                    className="space-y-4"
                >
                    {/* ==================================================
                        IMAGE SECTION
                    =================================================== */}

                    <ImageUploadCropper
                        imageType="rectangle"
                        existingImageUrl={
                            category.imageUrl
                        }
                        onImageProcessed={
                            setProcessedImage
                        }
                        onEditingChange={
                            setEditingImage
                        }
                        onImageRemoved={() => {
                            setImageRemoved(true);
                        }}
                        disabled={
                            isSubmitting
                        }
                    />

                    {/* ==================================================
                        HIDE THESE WHILE IMAGE IS BEING EDITED
                    =================================================== */}

                    {!editingImage && (
                        <>
                            {/* ==================================================
                                CATEGORY NAME
                            =================================================== */}

                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Category Name
                                </Label>

                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={
                                        category.name
                                    }
                                    placeholder="e.g. Plumbing"
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                DESCRIPTION
                            =================================================== */}

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={
                                        category.description
                                    }
                                    placeholder="Enter category description..."
                                    rows={4}
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                UPDATE BUTTON
                            =================================================== */}

                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Updating..."
                                    : "Update Category"}
                            </Button>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}