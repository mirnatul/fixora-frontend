"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Cropper from "react-easy-crop";

import { createCroppedImage } from "@/utils/image/createCroppedImage";
import { IMAGE_CONFIG } from "@/utils/image/imageConfig";

interface ImageUploadCropperProps {
    imageType: "square" | "rectangle" | "verticalRectangle" | "circle";
    existingImageUrl?: string | null;
    onImageProcessed: (file: File | null) => void;
    onImageRemoved?: () => void;
    onEditingChange?: (editing: boolean) => void;
    disabled?: boolean;
}

export default function ImageUploadCropper({
    imageType,
    existingImageUrl = null,
    onImageProcessed,
    onImageRemoved,
    onEditingChange,
    disabled = false,
}: ImageUploadCropperProps) {
    // ============================================================
    // IMAGE STATE
    // ============================================================

    const [imagePreview, setImagePreview] =
        useState<string | null>(existingImageUrl);

    const [processedImage, setProcessedImage] =
        useState<File | null>(null);

    // ============================================================
    // CROPPER STATE
    // ============================================================

    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
    });

    const [zoom, setZoom] = useState(1);

    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState<any>(null);

    const [showCropper, setShowCropper] =
        useState(false);

    // ============================================================
    // PROCESSING STATE
    // ============================================================

    const [processingImage, setProcessingImage] =
        useState(false);

    // ============================================================
    // IMAGE INPUT REF
    // ============================================================

    const imageInputRef =
        useRef<HTMLInputElement>(null);

    // ============================================================
    // UPDATE PREVIEW WHEN EXISTING IMAGE CHANGES
    // ============================================================

    useEffect(() => {
        setImagePreview(existingImageUrl ?? null);
    }, [existingImageUrl]);

    // ============================================================
    // IMAGE CHANGE
    // ============================================================

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // --------------------------------------------------------
        // Validate image type
        // --------------------------------------------------------

        if (!file.type.startsWith("image/")) {
            toast.error(
                "Please select a valid image."
            );

            e.target.value = "";

            return;
        }

        // --------------------------------------------------------
        // Validate image size
        // --------------------------------------------------------

        if (file.size > 5 * 1024 * 1024) {
            toast.error(
                "Image must be smaller than 5MB."
            );

            e.target.value = "";

            return;
        }

        // --------------------------------------------------------
        // Remove old browser preview URL
        // --------------------------------------------------------

        if (
            imagePreview &&
            imagePreview.startsWith("blob:")
        ) {
            URL.revokeObjectURL(imagePreview);
        }

        // --------------------------------------------------------
        // Create new browser preview
        // --------------------------------------------------------

        const previewUrl =
            URL.createObjectURL(file);

        setImagePreview(previewUrl);

        // --------------------------------------------------------
        // Reset crop settings
        // --------------------------------------------------------

        setCrop({
            x: 0,
            y: 0,
        });

        setZoom(1);

        setCroppedAreaPixels(null);

        // --------------------------------------------------------
        // New image selected
        // --------------------------------------------------------

        setProcessedImage(null);

        onImageProcessed(null);

        // --------------------------------------------------------
        // Open cropper
        // --------------------------------------------------------

        setShowCropper(true);
        onEditingChange?.(true);
    };

    // ============================================================
    // CROP COMPLETE
    // ============================================================

    const onCropComplete = (
        _: any,
        croppedPixels: any
    ) => {
        setCroppedAreaPixels(croppedPixels);
    };

    // ============================================================
    // CREATE CROPPED IMAGE
    // ============================================================

    const handleCreateCroppedImage =
        async () => {
            if (
                !imagePreview ||
                !croppedAreaPixels
            ) {
                toast.error(
                    "Please crop the image first."
                );

                return;
            }

            try {
                setProcessingImage(true);

                // ------------------------------------------------
                // Crop + resize + compress
                // ------------------------------------------------

                const processedFile =
                    await createCroppedImage(
                        imagePreview,
                        croppedAreaPixels,
                        imageType
                    );

                // ------------------------------------------------
                // Store processed File locally
                // ------------------------------------------------

                setProcessedImage(
                    processedFile
                );

                // ------------------------------------------------
                // Send processed File to parent
                // ------------------------------------------------

                onImageProcessed(
                    processedFile
                );

                // ------------------------------------------------
                // Create preview of processed image
                // ------------------------------------------------

                const newPreview =
                    URL.createObjectURL(
                        processedFile
                    );

                // ------------------------------------------------
                // Remove previous browser preview
                // ------------------------------------------------

                if (
                    imagePreview &&
                    imagePreview.startsWith(
                        "blob:"
                    )
                ) {
                    URL.revokeObjectURL(
                        imagePreview
                    );
                }

                // ------------------------------------------------
                // Show processed image
                // ------------------------------------------------

                setImagePreview(
                    newPreview
                );

                // ------------------------------------------------
                // Close cropper
                // ------------------------------------------------

                setShowCropper(false);
                onEditingChange?.(false);

                toast.success(
                    "Image processed successfully."
                );
            } catch (error) {
                console.error(error);

                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to process image."
                );
            } finally {
                setProcessingImage(
                    false
                );
            }
        };

    // ============================================================
    // REMOVE IMAGE
    // ============================================================

    const removeImage = () => {
        // --------------------------------------------------------
        // Remove browser object URL
        // --------------------------------------------------------

        if (
            imagePreview &&
            imagePreview.startsWith("blob:")
        ) {
            URL.revokeObjectURL(imagePreview);
        }

        // --------------------------------------------------------
        // Reset image state
        // --------------------------------------------------------

        setImagePreview(null);

        setProcessedImage(null);

        setShowCropper(false);
        onEditingChange?.(false);

        setCrop({
            x: 0,
            y: 0,
        });

        setZoom(1);

        setCroppedAreaPixels(null);

        // --------------------------------------------------------
        // Tell parent there is no processed image
        // --------------------------------------------------------

        onImageProcessed(null);

        // --------------------------------------------------------
        // Tell parent existing image was removed
        // --------------------------------------------------------

        if (existingImageUrl) {
            onImageRemoved?.();
        }

        // --------------------------------------------------------
        // Reset file input
        // --------------------------------------------------------

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    // ============================================================
    // RETURN UI
    // ============================================================

    return (
        <div className="space-y-2">
            <Label>
                Image
            </Label>

            {/* ==================================================
                CROPPER VIEW
            =================================================== */}

            {showCropper && imagePreview ? (
                <div className="space-y-4">
                    {/* Cropper */}

                    <div className="relative h-100 w-full overflow-hidden rounded-lg bg-black">
                        <Cropper
                            image={imagePreview}
                            crop={crop}
                            zoom={zoom}
                            aspect={
                                IMAGE_CONFIG[
                                    imageType
                                ].aspectRatio
                            }
                            onCropChange={
                                setCrop
                            }
                            onZoomChange={
                                setZoom
                            }
                            onCropComplete={
                                onCropComplete
                            }
                        />
                    </div>

                    {/* Zoom */}

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>
                                Zoom
                            </Label>

                            <span className="text-sm text-muted-foreground">
                                {zoom.toFixed(
                                    1
                                )}
                                x
                            </span>
                        </div>

                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) =>
                                setZoom(
                                    Number(
                                        e
                                            .target
                                            .value
                                    )
                                )
                            }
                            disabled={
                                processingImage ||
                                disabled
                            }
                            className="w-full"
                        />
                    </div>

                    {/* Buttons */}

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={
                                removeImage
                            }
                            disabled={
                                processingImage ||
                                disabled
                            }
                            className="flex-1"
                        >
                            Remove Photo
                        </Button>

                        <Button
                            type="button"
                            onClick={
                                handleCreateCroppedImage
                            }
                            disabled={
                                processingImage ||
                                disabled
                            }
                            className="flex-1"
                        >
                            {processingImage
                                ? "Processing..."
                                : "Crop & Continue"}
                        </Button>
                    </div>
                </div>
            ) : (
                /* ==================================================
                   NORMAL IMAGE VIEW
                =================================================== */

                <>
                    <label
                        htmlFor="image"
                        className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 px-6 py-8 text-center transition-all hover:border-[#007A55]/50 hover:bg-[#007A55]/5"
                    >
                        {imagePreview ? (
                            <div className="relative w-full">
                                <img
                                    src={
                                        imagePreview
                                    }
                                    alt="preview"
                                    className="h-48 w-full rounded-lg object-cover"
                                />

                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 transition-all group-hover:bg-black/30">
                                    <span className="rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 opacity-0 shadow transition-all group-hover:opacity-100">
                                        Change Image
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#007A55]/10 text-[#007A55] transition-transform group-hover:scale-110">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                                        <polyline points="17 8 12 3 7 8" />

                                        <line
                                            x1="12"
                                            x2="12"
                                            y1="3"
                                            y2="15"
                                        />
                                    </svg>
                                </div>

                                <p className="text-sm font-semibold text-foreground">
                                    Click to upload an image
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    PNG, JPG or WEBP up to 5MB
                                </p>
                            </>
                        )}
                    </label>

                    <Input
                        ref={
                            imageInputRef
                        }
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={
                            handleImageChange
                        }
                        disabled={disabled}
                        className="hidden"
                    />

                    {/* Remove button */}

                    {imagePreview && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={
                                removeImage
                            }
                            disabled={disabled}
                            className="w-full"
                        >
                            Remove Image
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}