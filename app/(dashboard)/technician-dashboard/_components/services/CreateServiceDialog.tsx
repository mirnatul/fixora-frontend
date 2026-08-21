"use client";

import { useRef, useState } from "react";

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
import { Label } from "@/components/ui/label";

import { uploadToCloudinary } from "@/lib/cloudinary";
import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";
import { createService } from "../../_actions/createService";
import { dhakaAreas } from "@/constants/dhakaAreas";

interface Category {
	id: string;
	name: string;
	categoryServices: string;
}

interface Props {
	userId: string;
	categories: Category[];
}

export default function CreateServiceDialog({ userId, categories }: Props) {
	const [selectedService, setSelectedService] = useState("");
	const [selectedCategoryId, setSelectedCategoryId] = useState("");

	// ============================================================
	// HANDLE SERVICE CHANGE
	// ============================================================

	const handleServiceChange = (serviceName: string) => {
		setSelectedService(serviceName);

		const databaseCategory = categories.find((category) =>
			category.categoryServices
				.split(",")
				.map((service) => service.trim())
				.includes(serviceName),
		);

		setSelectedCategoryId(databaseCategory?.id ?? "");
	};

	const imageType = "rectangle";

	// ============================================================
	// DIALOG STATE
	// ============================================================

	const [open, setOpen] = useState(false);

	// ============================================================
	// IMAGE EDITING STATE
	// ============================================================

	const [editingImage, setEditingImage] = useState(false);

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
	// CREATE SERVICE
	// ============================================================

	// const handleCreateService = async (
	// 	event: React.FormEvent<HTMLFormElement>,
	// ) => {
	// 	event.preventDefault();

	// 	const form = event.currentTarget;

	// 	// --------------------------------------------------------
	// 	// Make sure image exists
	// 	// --------------------------------------------------------

	// 	if (!processedImage) {
	// 		toast.error("Please select and process a service image.");
	// 		return;
	// 	}

	// 	try {
	// 		setIsSubmitting(true);

	// 		// ----------------------------------------------------
	// 		// 1. Upload processed image
	// 		// ----------------------------------------------------

	// 		const result = await uploadToCloudinary(
	// 			processedImage,
	// 			process.env.NEXT_PUBLIC_API_URL!,
	// 		);

	// 		// ----------------------------------------------------
	// 		// 2. Create FormData
	// 		// ----------------------------------------------------

	// 		const formData = new FormData(form);

	// 		// ----------------------------------------------------
	// 		// 3. Explicitly set form values
	// 		// ----------------------------------------------------

	// 		formData.set("title", selectedService);
	// 		formData.set(
	// 			"description",
	// 			formData.get("description")?.toString() ?? "",
	// 		);
	// 		formData.set("price", formData.get("price")?.toString() ?? "0");
	// 		formData.set("location", formData.get("location")?.toString() ?? "");
	// 		formData.set("categoryId", selectedCategoryId);

	// 		// ----------------------------------------------------
	// 		// 4. Remove browser image
	// 		// ----------------------------------------------------

	// 		formData.delete("image");

	// 		// ----------------------------------------------------
	// 		// 5. Add Cloudinary data
	// 		// ----------------------------------------------------

	// 		formData.set("imageUrl", result.url);
	// 		formData.set("imagePublicId", result.publicId);

	// 		// ----------------------------------------------------
	// 		// 6. Add technician ID
	// 		// ----------------------------------------------------

	// 		formData.set("technicianId", userId);

	// 		// ----------------------------------------------------
	// 		// 7. Debug FormData
	// 		// ----------------------------------------------------

	// 		console.log("SERVICE FORMDATA:");

	// 		for (const [key, value] of formData.entries()) {
	// 			console.log(key, value);
	// 		}

	// 		// ----------------------------------------------------
	// 		// 8. Create service
	// 		// ----------------------------------------------------

	// 		const response = await createService(formData);

	// 		// ----------------------------------------------------
	// 		// 9. Handle response
	// 		// ----------------------------------------------------

	// 		if (!response.success) {
	// 			toast.error(response.message);
	// 			return;
	// 		}

	// 		toast.success(response.message);

	// 		// ----------------------------------------------------
	// 		// 10. Reset
	// 		// ----------------------------------------------------

	// 		formRef.current?.reset();

	// 		setProcessedImage(null);
	// 		setEditingImage(false);
	// 		setSelectedService("");
	// 		setSelectedCategoryId("");
	// 		setOpen(false);
	// 	} catch (error) {
	// 		console.error(error);

	// 		toast.error(
	// 			error instanceof Error ? error.message : "Failed to create service.",
	// 		);
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// };
	const handleCreateService = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const form = event.currentTarget;

		if (!processedImage) {
			toast.error("Please select and process a service image.");
			return;
		}

		try {
			setIsSubmitting(true);

			// ----------------------------------------------------
			// 1. Capture form data BEFORE async upload
			// ----------------------------------------------------
			const formData = new FormData(form);

			// Explicitly set the values we control
			formData.set("title", selectedService);
			formData.set("categoryId", selectedCategoryId);

			const description = formData.get("description")?.toString().trim() ?? "";

			const price = formData.get("price")?.toString() ?? "0";

			const location = formData.get("location")?.toString().trim() ?? "";

			formData.set("description", description);
			formData.set("price", price);
			formData.set("location", location);

			// ----------------------------------------------------
			// 2. Upload processed image
			// ----------------------------------------------------
			const result = await uploadToCloudinary(
				processedImage,
				process.env.NEXT_PUBLIC_API_URL!,
			);

			// ----------------------------------------------------
			// 3. Replace image with Cloudinary data
			// ----------------------------------------------------
			formData.delete("image");

			formData.set("imageUrl", result.url);
			formData.set("imagePublicId", result.publicId);

			// ----------------------------------------------------
			// 5. Create service
			// ----------------------------------------------------
			const response = await createService(formData);

			// ----------------------------------------------------
			// 6. Handle response
			// ----------------------------------------------------
			if (!response.success) {
				toast.error(response.message);
				return;
			}

			toast.success(response.message);

			// ----------------------------------------------------
			// 7. Reset
			// ----------------------------------------------------
			formRef.current?.reset();

			setProcessedImage(null);
			setEditingImage(false);
			setSelectedService("");
			setSelectedCategoryId("");

			setOpen(false);
		} catch (error) {
			console.error(error);

			toast.error(
				error instanceof Error ? error.message : "Failed to create service.",
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
			cursor-pointer
        "
				>
					+ Create New Category
				</Button>
			</DialogTrigger>

			<DialogContent className="max-h-[90vh] overflow-y-auto rounded-sm sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Create Service</DialogTitle>

					<DialogDescription>
						Add a new service to your profile.
					</DialogDescription>
				</DialogHeader>

				<form
					ref={formRef}
					onSubmit={handleCreateService}
					className="space-y-4"
				>
					{/* ==================================================
                        IMAGE
                    =================================================== */}

					<ImageUploadCropper
						imageType={imageType}
						onImageProcessed={setProcessedImage}
						onEditingChange={setEditingImage}
						onImageRemoved={() => {
							setProcessedImage(null);
						}}
						disabled={isSubmitting}
					/>

					{!editingImage && (
						<>
							{/* ==================================================
                                SERVICE
                            =================================================== */}

							<div className="space-y-2">
								<Label htmlFor="title">Service</Label>

								<select
									id="title"
									name="title"
									value={selectedService}
									onChange={(event) => handleServiceChange(event.target.value)}
									required
									disabled={isSubmitting}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
								>
									<option value="" disabled>
										Select a service
									</option>

									{categories.map((category) => {
										const services = category.categoryServices
											.split(",")
											.map((service) => service.trim())
											.filter(Boolean);

										return (
											<optgroup key={category.id} label={category.name}>
												{services.map((service) => (
													<option
														key={`${category.id}-${service}`}
														value={service}
													>
														{service}
													</option>
												))}
											</optgroup>
										);
									})}
								</select>

								{/* Hidden category ID */}

								<input
									type="hidden"
									name="categoryId"
									value={selectedCategoryId}
									readOnly
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
									defaultValue=""
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
                                SUBMIT
                            =================================================== */}

							<Button
								type="submit"
								disabled={
									isSubmitting || !selectedService || !selectedCategoryId
								}
								className="w-full cursor-pointer"
							>
								{isSubmitting ? "Creating service..." : "Create Service"}
							</Button>
						</>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}
