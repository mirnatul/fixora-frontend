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
import { dhakaAreas } from "@/constants/dhakaAreas";

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

	const [processedImage, setProcessedImage] = useState<File | null>(null);

	const [imageRemoved, setImageRemoved] = useState(false);

	const [editingImage, setEditingImage] = useState(false);

	// ============================================================
	// SUBMIT STATE
	// ============================================================

	const [isSubmitting, setIsSubmitting] = useState(false);

	// ============================================================
	// ACTIVE STATE
	// ============================================================

	const [active, setActive] = useState(service.active);

	// ============================================================
	// UPDATE SERVICE
	// ============================================================

	const handleUpdateService = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const form = event.currentTarget;

		try {
			setIsSubmitting(true);

			// ========================================================
			// 1. Capture FormData BEFORE async upload
			// ========================================================

			const formData = new FormData(form);

			// ========================================================
			// 2. Normalize form values
			// ========================================================

			const title = formData.get("title")?.toString().trim() ?? "";

			const description = formData.get("description")?.toString().trim() ?? "";

			const price = formData.get("price")?.toString() ?? "0";

			const location = formData.get("location")?.toString().trim() ?? "";

			// ========================================================
			// 3. Explicitly set values
			// ========================================================

			formData.set("title", title);
			formData.set("description", description);
			formData.set("price", price);
			formData.set("location", location);

			formData.set("active", active ? "true" : "false");

			// ========================================================
			// 4. IMAGE HANDLING
			// ========================================================

			// --------------------------------------------------------
			// CASE 1: New image selected
			// --------------------------------------------------------

			if (processedImage) {
				const result = await uploadToCloudinary(
					processedImage,
					process.env.NEXT_PUBLIC_API_URL!,
				);

				// Remove browser image if it exists
				formData.delete("image");

				// New Cloudinary image
				formData.set("imageUrl", result.url);
				formData.set("imagePublicId", result.publicId);

				// Old image should be deleted from Cloudinary
				formData.set("oldImagePublicId", service.imagePublicId ?? "");
			}

			// --------------------------------------------------------
			// CASE 2: Existing image removed
			// --------------------------------------------------------
			else if (imageRemoved) {
				formData.delete("image");

				formData.set("imageUrl", "");
				formData.set("imagePublicId", "");

				// Tell backend to delete old Cloudinary image
				formData.set("oldImagePublicId", service.imagePublicId ?? "");
			}

			// --------------------------------------------------------
			// CASE 3: Image untouched
			// --------------------------------------------------------
			else {
				formData.delete("image");

				formData.set("imageUrl", service.imageUrl ?? "");

				formData.set("imagePublicId", service.imagePublicId ?? "");
			}

			// 6. Update service
			// ========================================================

			const response = await updateService(service.id, formData);

			// ========================================================
			// 7. Handle response
			// ========================================================

			if (!response.success) {
				toast.error(response.message || "Failed to update service.");
				return;
			}

			toast.success(response.message || "Service updated successfully.");

			// ========================================================
			// 8. Reset state
			// ========================================================

			setProcessedImage(null);
			setImageRemoved(false);
			setEditingImage(false);

			setOpen(false);
		} catch (error) {
			console.error("Update service error:", error);

			toast.error(
				error instanceof Error ? error.message : "Failed to update service.",
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
                TRIGGER
            =================================================== */}

			<DialogTrigger asChild>
				<Button variant="outline" className="bg-green-50 cursor-pointer">
					Update Service
				</Button>
			</DialogTrigger>

			{/* ==================================================
                DIALOG
            =================================================== */}

			<DialogContent className="max-h-[90vh] overflow-y-auto rounded-sm sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Update Service</DialogTitle>

					<DialogDescription>
						Update your service information, image, location and availability.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleUpdateService} className="space-y-4">
					{/* ==================================================
                        IMAGE
                    =================================================== */}

					<ImageUploadCropper
						imageType="rectangle"
						existingImageUrl={service.imageUrl}
						onImageProcessed={(file) => {
							setProcessedImage(file);

							// If user selects a new image after
							// removing the old one, treat it as
							// a replacement instead.
							setImageRemoved(false);
						}}
						onEditingChange={setEditingImage}
						onImageRemoved={() => {
							setProcessedImage(null);
							setImageRemoved(true);
						}}
						disabled={isSubmitting}
					/>

					{/* ==================================================
                        FORM CONTENT
                    =================================================== */}

					{!editingImage && (
						<>
							{/* ==================================================
                                TITLE
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="title">Service Title</Label>

								<Input
									id="title"
									name="title"
									defaultValue={service.title}
									placeholder="e.g. Home Plumbing Repair"
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
									defaultValue={service.description}
									placeholder="Describe your service..."
									rows={4}
									required
									disabled={isSubmitting}
									className="rounded-sm"
								/>
							</div>

							{/* ==================================================
                                PRICE
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="price">Price (৳)</Label>

								<Input
									id="price"
									name="price"
									type="number"
									min={0}
									defaultValue={service.price}
									placeholder="e.g. 1500"
									required
									disabled={isSubmitting}
									className="rounded-sm"
								/>
							</div>

							{/* ==================================================
                                LOCATION
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="location">Service Location</Label>

								<select
									id="location"
									name="location"
									defaultValue={service.location}
									required
									disabled={isSubmitting}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
								>
									<option value="" disabled>
										Select your service area
									</option>

									{dhakaAreas.map((area) => (
										<option key={area} value={area}>
											{area}
										</option>
									))}
								</select>
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
									onChange={(event) => setActive(event.target.checked)}
									disabled={isSubmitting}
									className="h-4 w-4"
								/>

								<Label htmlFor="active">Active Service</Label>
							</div>

							{/* ==================================================
                                UPDATE BUTTON
                            =================================================== */}

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full cursor-pointer"
							>
								{isSubmitting ? "Updating service..." : "Update Service"}
							</Button>
						</>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}
