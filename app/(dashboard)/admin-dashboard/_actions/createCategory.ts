"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createCategory = async (formData: FormData) => {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("accessToken")?.value;

		// ==========================================
		// GET SERVICES
		// ==========================================

		const servicesValue = formData.get("categoryServices") as string | null;

		const categoryServices = servicesValue
			? servicesValue
					.split(",")
					.map((service) => service.trim())
					.filter(Boolean)
			: [];

		// ==========================================
		// CREATE PAYLOAD
		// ==========================================

		const payload = {
			name: formData.get("name"),
			description: formData.get("description"),
			imageUrl: formData.get("imageUrl"),
			imagePublicId: formData.get("imagePublicId"),
			categoryServices,
		};

		// ==========================================
		// DEBUG
		// ==========================================

		// ==========================================
		// BACKEND POST REQUEST
		// ==========================================

		const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
			method: "POST",
			headers: {
				Cookie: `accessToken=${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		// ==========================================
		// PARSE RESPONSE
		// ==========================================

		const text = await res.text();

		let result: {
			message?: string;
		};

		try {
			result = JSON.parse(text);
		} catch {
			result = {
				message: text,
			};
		}

		// ==========================================
		// HANDLE ERROR
		// ==========================================

		if (!res.ok) {
			return {
				success: false,
				message: result.message ?? "Failed to create category.",
			};
		}

		// ==========================================
		// REVALIDATE
		// ==========================================

		revalidatePath("/admin-dashboard/all-categories");

		return {
			success: true,
			message: result.message ?? "Category created successfully.",
		};
	} catch (error) {
		console.error("Create category error:", error);

		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong.",
		};
	}
};
