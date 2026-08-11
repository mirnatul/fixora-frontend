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
import { updateService } from "../../_actions/updateService";

import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    rating: string;
    active: boolean;
    technicianId: string;
    categoryId: string;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface UpdateServiceDialogProps {
    service: Service;
}

export default function UpdateServiceDialog({
    service,
}: UpdateServiceDialogProps) {
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

    // Whether user removed existing image
    const [imageRemoved, setImageRemoved] =
        useState(false);

    // Whether cropper is currently being edited
    const [editingImage, setEditingImage] =
        useState(false);

    // ============================================================
    // FORM STATE
    // ============================================================

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [active, setActive] =
        useState(service.active);

    // ============================================================
    // UPDATE SERVICE
    // ============================================================

    const handleUpdateService = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const form = event.currentTarget;

        try {
            setIsSubmitting(true);

            // Create FormData from form
            const formData = new FormData(form);

            // ==================================================
            // ACTIVE VALUE
            // ==================================================

            formData.set(
                "active",
                active ? "true" : "false"
            );

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
                    service.imagePublicId ?? ""
                );
            }

            // ==================================================
            // CASE 2:
            // USER REMOVED EXISTING IMAGE
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
                    service.imagePublicId ?? ""
                );
            }

            // ==================================================
            // CASE 3:
            // USER DID NOT TOUCH IMAGE
            // ==================================================

            else {
                // Keep existing image
                formData.set(
                    "imageUrl",
                    service.imageUrl ?? ""
                );

                formData.set(
                    "imagePublicId",
                    service.imagePublicId ?? ""
                );
            }

            // ==================================================
            // UPDATE DATABASE
            // ==================================================

            const response =
                await updateService(
                    service.id,
                    formData
                );

            // ==================================================
            // HANDLE RESPONSE
            // ==================================================

            if (!response.success) {
                toast.error(
                    response.message ||
                    "Failed to update service."
                );

                return;
            }

            toast.success(
                response.message ||
                "Service updated successfully."
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
                "Update service error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update service."
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
                    Update Service
                </Button>
            </DialogTrigger>

            {/* ==================================================
                UPDATE DIALOG
            =================================================== */}

            <DialogContent className="sm:max-w-lg rounded-sm">
                <DialogHeader>
                    <DialogTitle>
                        Update Service
                    </DialogTitle>

                    <DialogDescription>
                        Update the service image, information
                        and availability.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleUpdateService}
                    className="space-y-4"
                >
                    {/* ==================================================
                        IMAGE SECTION
                    =================================================== */}

                    <ImageUploadCropper
                        imageType="rectangle"
                        existingImageUrl={
                            service.imageUrl
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
                        disabled={isSubmitting}
                    />

                    {/* ==================================================
                        HIDE FORM WHILE EDITING IMAGE
                    =================================================== */}

                    {!editingImage && (
                        <>
                            {/* ==================================================
                                TITLE
                            =================================================== */}

                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Service Title
                                </Label>

                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={
                                        service.title
                                    }
                                    placeholder="e.g. Home Plumbing Repair"
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
                                        service.description
                                    }
                                    placeholder="Enter service description..."
                                    rows={4}
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                PRICE
                            =================================================== */}

                            <div className="space-y-2">
                                <Label htmlFor="price">
                                    Price (৳)
                                </Label>

                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    defaultValue={
                                        service.price
                                    }
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                LOCATION
                            =================================================== */}

                            <div className="space-y-2">
                                <Label htmlFor="location">
                                    Location
                                </Label>

                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={
                                        service.location
                                    }
                                    placeholder="e.g. Dhaka"
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                ACTIVE
                            =================================================== */}

                            <div className="flex items-center gap-3">
                                <input
                                    id="active"
                                    name="active"
                                    type="checkbox"
                                    checked={active}
                                    onChange={(event) =>
                                        setActive(
                                            event.target
                                                .checked
                                        )
                                    }
                                    className="h-4 w-4"
                                />

                                <Label htmlFor="active">
                                    Active Service
                                </Label>
                            </div>

                            {/* ==================================================
                                UPDATE BUTTON
                            =================================================== */}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Updating..."
                                    : "Update Service"}
                            </Button>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}