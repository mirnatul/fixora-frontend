"use client";

import {
    useRef,
    useState,
} from "react";

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
import { Textarea } from "@/components/ui/textarea";

import { uploadToCloudinary } from "@/lib/cloudinary";

import { Label } from "@/components/ui/label";

import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";
import { createService } from "../../_actions/createService";

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
    const imageType = "rectangle";

    // ============================================================
    // DIALOG STATE
    // ============================================================

    const [open, setOpen] = useState(false);

    // ============================================================
    // IMAGE EDITING STATE
    // ============================================================

    const [editingImage, setEditingImage] =
        useState(false);

    // ============================================================
    // PROCESSED IMAGE
    // ============================================================

    const [processedImage, setProcessedImage] =
        useState<File | null>(null);

    // ============================================================
    // SUBMIT STATE
    // ============================================================

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    // ============================================================
    // FORM REF
    // ============================================================

    const formRef =
        useRef<HTMLFormElement>(null);

    // ============================================================
    // CREATE SERVICE
    // ============================================================

    const handleCreateService = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const form = event.currentTarget;

        // --------------------------------------------------------
        // Make sure image exists
        // --------------------------------------------------------

        if (!processedImage) {
            toast.error(
                "Please select and process a service image."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            // ----------------------------------------------------
            // 1. Upload processed image
            // ----------------------------------------------------

            const result =
                await uploadToCloudinary(
                    processedImage,
                    process.env
                        .NEXT_PUBLIC_API_URL!
                );

            // ----------------------------------------------------
            // 2. Create FormData
            // ----------------------------------------------------

            const formData =
                new FormData(form);

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
            // 3. Add technician ID
            // ----------------------------------------------------

            formData.set(
                "technicianId",
                userId
            );

            // ----------------------------------------------------
            // 4. Create service
            // ----------------------------------------------------

            const response =
                await createService(
                    formData
                );

            // ----------------------------------------------------
            // 5. Handle response
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
            // 6. Reset
            // ----------------------------------------------------

            formRef.current?.reset();

            setProcessedImage(null);

            setEditingImage(false);

            setOpen(false);
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create service."
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
                    + Create New Service
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Create Service
                    </DialogTitle>

                    <DialogDescription>
                        Add a new service to your profile.
                    </DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    onSubmit={
                        handleCreateService
                    }
                    className="space-y-4"
                >
                    {/* ==================================================
                        IMAGE
                    =================================================== */}

                    <ImageUploadCropper
                        imageType={imageType}
                        onImageProcessed={
                            setProcessedImage
                        }
                        onEditingChange={
                            setEditingImage
                        }
                        onImageRemoved={() => {
                            setProcessedImage(
                                null
                            );
                        }}
                        disabled={
                            isSubmitting
                        }
                    />

                    {!editingImage && (
                        <>
                            {/* ==================================================
                                SERVICE TITLE
                            =================================================== */}

                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Service Title
                                </Label>

                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g. Pipe Leak Repair"
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
                                    placeholder="Describe your service..."
                                    rows={4}
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                CATEGORY
                            =================================================== */}

                            <div className="space-y-2">
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

                                    {categories.map(
                                        (
                                            category
                                        ) => (
                                            <option
                                                key={
                                                    category.id
                                                }
                                                value={
                                                    category.id
                                                }
                                            >
                                                {
                                                    category.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
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
                                    min={0}
                                    placeholder="e.g. 1500"
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
                                    placeholder="e.g. Dhaka"
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            {/* ==================================================
                                SUBMIT
                            =================================================== */}

                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Creating service..."
                                    : "Create Service"}
                            </Button>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}