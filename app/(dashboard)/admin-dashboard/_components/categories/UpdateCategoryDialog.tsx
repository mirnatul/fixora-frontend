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
	categoryServices: string;
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

	const [processedImage, setProcessedImage] = useState<File | null>(null);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [editingImage, setEditingImage] = useState(false);

	// ============================================================
	// SUBMIT STATE
	// ============================================================

	const [isSubmitting, setIsSubmitting] = useState(false);

	// ============================================================
	// UPDATE CATEGORY
	// ============================================================

	const handleUpdateCategory = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const form = event.currentTarget;

		try {
			setIsSubmitting(true);

			const formData = new FormData(form);

			// ==================================================
			// SERVICES
			// ==================================================

			const servicesValue = formData.get("categoryServices") as string | null;

			const services = servicesValue
				? servicesValue
						.split(",")
						.map((service) => service.trim())
						.filter(Boolean)
				: [];

			if (services.length === 0) {
				toast.error("Please add at least one service.");
				return;
			}

			// Store services as comma-separated string
			formData.set("categoryServices", services.join(", "));

			// ==================================================
			// CASE 1:
			// USER SELECTED A NEW IMAGE
			// ==================================================

			if (processedImage) {
				const result = await uploadToCloudinary(
					processedImage,
					process.env.NEXT_PUBLIC_API_URL!,
				);

				formData.set("imageUrl", result.url);
				formData.set("imagePublicId", result.publicId);
				formData.set("oldImagePublicId", category.imagePublicId ?? "");
			}

			// ==================================================
			// CASE 2:
			// USER REMOVED THE IMAGE
			// ==================================================
			else if (imageRemoved) {
				formData.set("imageUrl", "");
				formData.set("imagePublicId", "");
				formData.set("oldImagePublicId", category.imagePublicId ?? "");
			}

			// ==================================================
			// CASE 3:
			// USER DID NOT TOUCH THE IMAGE
			// ==================================================
			else {
				formData.set("imageUrl", category.imageUrl ?? "");
				formData.set("imagePublicId", category.imagePublicId ?? "");
			}

			// ==================================================
			// DEBUG
			// ==================================================

			// ==================================================
			// UPDATE DATABASE
			// ==================================================

			const response = await updateCategory(category.id, formData);

			// ==================================================
			// HANDLE RESPONSE
			// ==================================================

			if (!response.success) {
				toast.error(response.message || "Failed to update category.");
				return;
			}

			toast.success(response.message || "Category updated successfully.");

			// ==================================================
			// RESET
			// ==================================================

			setProcessedImage(null);
			setImageRemoved(false);
			setEditingImage(false);

			setOpen(false);
		} catch (error) {
			console.error("Update category error:", error);

			toast.error(
				error instanceof Error ? error.message : "Failed to update category.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// ============================================================
	// UI
	// ============================================================

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* ==================================================
                UPDATE BUTTON
            ================================================== */}

			<DialogTrigger asChild>
				<Button className="cursor-pointer hover:bg-green-50" variant="outline">
					Update Category
				</Button>
			</DialogTrigger>

			{/* ==================================================
                UPDATE DIALOG
            ================================================== */}

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Update Category</DialogTitle>

					<DialogDescription>
						Update the category image, name, description and services.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleUpdateCategory} className="space-y-4">
					{/* ==================================================
                        IMAGE
                    ================================================== */}

					<ImageUploadCropper
						imageType="rectangle"
						existingImageUrl={category.imageUrl}
						onImageProcessed={setProcessedImage}
						onEditingChange={setEditingImage}
						onImageRemoved={() => {
							setImageRemoved(true);
						}}
						disabled={isSubmitting}
					/>

					{!editingImage && (
						<>
							{/* ==================================================
                                CATEGORY NAME
                            ================================================== */}

							<div className="space-y-2">
								<Label htmlFor="name">Category Name</Label>

								<Input
									id="name"
									name="name"
									defaultValue={category.name}
									placeholder="e.g. Plumbing"
									required
									disabled={isSubmitting}
									className="rounded-sm"
								/>
							</div>

							{/* ==================================================
                                DESCRIPTION
                            ================================================== */}

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>

								<Textarea
									id="description"
									name="description"
									defaultValue={category.description}
									placeholder="Enter category description..."
									rows={4}
									required
									disabled={isSubmitting}
									className="resize-none rounded-sm"
								/>
							</div>

							{/* ==================================================
                                SERVICES
                            ================================================== */}

							<div className="space-y-2">
								<Label htmlFor="categoryServices">Services</Label>

								<Textarea
									id="categoryServices"
									name="categoryServices"
									defaultValue={category.categoryServices}
									placeholder="House Cleaning, Deep Cleaning, Kitchen Cleaning, Bathroom Cleaning, Sofa Cleaning"
									required
									disabled={isSubmitting}
									className="min-h-24 resize-none rounded-sm"
								/>

								<p className="text-xs text-muted-foreground">
									Separate each service with a comma.
								</p>
							</div>

							{/* ==================================================
                                UPDATE BUTTON
                            ================================================== */}

							<Button type="submit" disabled={isSubmitting} className="w-full">
								{isSubmitting ? "Updating..." : "Update Category"}
							</Button>
						</>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}
