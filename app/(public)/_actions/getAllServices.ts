"use server";

type QueryParams = {
	[key: string]: string | string[] | undefined;
};

export const getAllServices = async (query?: QueryParams) => {
	const params = new URLSearchParams();

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			if (!value) return;

			if (Array.isArray(value)) {
				// biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
				value.forEach((v) => params.append(key, v));
			} else {
				params.set(key, value);
			}
		});
	}
	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/services?${params.toString()}`,
		{
			cache: "no-cache",
		},
	);

	const result = await res.json();
	return result;
};
