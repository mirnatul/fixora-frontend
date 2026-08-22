"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface GetAllUsersParams {
	page?: number;
	limit?: number;
	searchTerm?: string;
}

export const getAllUsers = async ({
	page = 1,
	limit = 10,
	searchTerm = "",
}: GetAllUsersParams = {}) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
	});

	if (searchTerm.trim()) {
		params.append("searchTerm", searchTerm.trim());
	}

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/users/admin/users?${params.toString()}`,
		{
			headers: {
				Cookie: `accessToken=${accessToken}`,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		},
	);

	return await res.json();
};

interface IUpdateStatusPayload {
	userId: string;
	status: string;
}
export const updateUserStatus = async (payload: IUpdateStatusPayload) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/users/admin/userStatus`,
		{
			method: "PATCH",
			headers: {
				Cookie: `accessToken=${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		},
	);

	const result = await res.json();

	// console.log(result);
	if (result.success) {
		revalidatePath("/admin-dashboard/all-users");
	}

	return result;
};
