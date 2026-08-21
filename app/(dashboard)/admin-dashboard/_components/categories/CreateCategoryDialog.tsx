"use client";

import { useRef, useState } from "react";

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

import { uploadToCloudinary } from "@/lib/cloudinary";
import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";

export default function CreateCategoryDialog() {
	const imageType = "rectangle";

	// ============================================================
	// DIALOG STATE
	// ============================================================

	const [open, setOpen] = useState(false);

	// ============================================================
	// IMAGE STATE
	// ============================================================

	const [editingImage, setEditingImage] = useState(false);
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
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const form = event.currentTarget;

		// --------------------------------------------------------
		// Make sure image exists
		// --------------------------------------------------------

		if (!processedImage) {
			toast.error("Please select and process an image.");
			return;
		}

		// --------------------------------------------------------
		// Get form values
		// --------------------------------------------------------

		const nameInput = form.elements.namedItem(
			"name",
		) as HTMLInputElement | null;

		const descriptionInput = form.elements.namedItem(
			"description",
		) as HTMLTextAreaElement | null;

		const servicesInput = form.elements.namedItem(
			"services",
		) as HTMLTextAreaElement | null;

		const name = nameInput?.value.trim() ?? "";
		const description = descriptionInput?.value.trim() ?? "";
		const services = servicesInput?.value.trim() ?? "";

		// --------------------------------------------------------
		// Validate
		// --------------------------------------------------------

		if (!name) {
			toast.error("Category name is required.");
			return;
		}

		if (!description) {
			toast.error("Category description is required.");
			return;
		}

		if (!services) {
			toast.error("Services are required.");
			return;
		}

		try {
			setIsSubmitting(true);

			// ----------------------------------------------------
			// 1. Upload processed image
			// ----------------------------------------------------

			const result = await uploadToCloudinary(
				processedImage,
				process.env.NEXT_PUBLIC_API_URL!,
			);

			// ----------------------------------------------------
			// 2. Create FormData
			// ----------------------------------------------------

			const formData = new FormData();

			formData.set("name", name);
			formData.set("description", description);
			formData.set("imageUrl", result.url);
			formData.set("imagePublicId", result.publicId);
			formData.set("categoryServices", services);

			// ----------------------------------------------------
			// Debug
			// ----------------------------------------------------

			console.log("Category payload:", {
				name: formData.get("name"),
				description: formData.get("description"),
				imageUrl: formData.get("imageUrl"),
				imagePublicId: formData.get("imagePublicId"),
				categoryServices: formData.get("categoryServices"),
			});

			// ----------------------------------------------------
			// 3. Create category
			// ----------------------------------------------------

			const response = await createCategory(formData);

			// ----------------------------------------------------
			// 4. Handle response
			// ----------------------------------------------------

			if (!response.success) {
				toast.error(response.message);
				return;
			}

			toast.success(response.message);

			// ----------------------------------------------------
			// 5. Reset
			// ----------------------------------------------------

			formRef.current?.reset();

			setProcessedImage(null);
			setEditingImage(false);
			setOpen(false);
		} catch (error) {
			console.error("Create category error:", error);

			toast.error(
				error instanceof Error ? error.message : "Failed to create category.",
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
			<DialogTrigger asChild>
				<Button
					className="
            h-11
            w-full
            rounded-2xl
            border border-[#007A55]/20
            bg-[#007A55]
            px-5
            text-sm
            font-semibold
            text-white
            shadow-[0_10px_30px_rgba(0,122,85,0.20)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-[1.01]
            hover:bg-[#006044]
            hover:shadow-[0_18px_45px_rgba(0,122,85,0.30)]
            active:translate-y-0
            active:scale-[0.98]
            sm:h-12
            sm:w-auto
            sm:px-6
            sm:text-sm
            md:h-13
            md:px-8
            md:text-base
        "
				>
					+ Create New Category
				</Button>
			</DialogTrigger>

			<DialogContent className="rounded-sm sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Create Category</DialogTitle>

					<DialogDescription>Add a new service category.</DialogDescription>
				</DialogHeader>

				<form
					ref={formRef}
					onSubmit={handleCreateCategory}
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
							{/* ==================================================
                                CATEGORY NAME
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="name">Category Name</Label>

								<Input
									id="name"
									name="name"
									placeholder="e.g. Cleaning"
									required
									disabled={isSubmitting}
									className="rounded-sm"
								/>
							</div>

							{/* ==================================================
                                DESCRIPTION
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>

								<Textarea
									id="description"
									name="description"
									placeholder="Briefly describe this service category..."
									required
									disabled={isSubmitting}
									className="min-h-24 resize-none rounded-sm"
								/>
							</div>

							{/* ==================================================
                                SERVICES
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="services">Services</Label>

								<Textarea
									id="services"
									name="services"
									placeholder="Enter services with comma separated"
									required
									disabled={isSubmitting}
									className="min-h-24 resize-none rounded-sm"
								/>

								<p className="text-xs text-muted-foreground">
									Separate each service with a comma.
								</p>
							</div>

							{/* ==================================================
                                SUBMIT
                            =================================================== */}

							<Button type="submit" disabled={isSubmitting} className="w-full">
								{isSubmitting ? "Creating category..." : "Create Category"}
							</Button>
						</>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}
