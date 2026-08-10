export async function uploadToCloudinary(
    file: Blob,
    backendUrl: string
) {
    // 1. Get signature from Express
    const signatureResponse = await fetch(
        `${backendUrl}/api/cloudinary/signature`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!signatureResponse.ok) {
        throw new Error(
            "Failed to get Cloudinary signature"
        );
    }

    const signatureData =
        await signatureResponse.json();

    const {
        timestamp,
        signature,
        cloudName,
        apiKey,
        folder,
    } = signatureData.data;

    // 2. Prepare Cloudinary upload
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append(
        "timestamp",
        timestamp.toString()
    );
    formData.append("signature", signature);
    formData.append("folder", folder);

    // 3. Upload directly to Cloudinary
    const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!uploadResponse.ok) {
        throw new Error(
            "Cloudinary upload failed"
        );
    }

    const data = await uploadResponse.json();

    return {
        url: data.secure_url,
        publicId: data.public_id,
    };
}