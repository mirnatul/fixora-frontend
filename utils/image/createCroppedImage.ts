// src/utils/image/createCroppedImage.ts

import imageCompression from "browser-image-compression";

import {
    IMAGE_CONFIG,
    type ImageType,
} from "./imageConfig";

export interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
}

export async function createCroppedImage(
    imageSrc: string,
    croppedAreaPixels: CroppedAreaPixels,
    type: ImageType
): Promise<File> {
    // 1. Get configuration
    const config = IMAGE_CONFIG[type];

    // 2. Load image
    const image = new Image();

    image.src = imageSrc;

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();

        image.onerror = () =>
            reject(
                new Error(
                    "Failed to load image."
                )
            );
    });

    // 3. Create canvas
    const canvas =
        document.createElement("canvas");

    canvas.width = config.width;
    canvas.height = config.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error(
            "Failed to create canvas."
        );
    }

    // 4. Circle clipping
    if (type === "circle") {
        const radius =
            Math.min(
                config.width,
                config.height
            ) / 2;

        ctx.beginPath();

        ctx.arc(
            config.width / 2,
            config.height / 2,
            radius,
            0,
            Math.PI * 2
        );

        ctx.closePath();

        ctx.clip();
    }

    // 5. Crop coordinates
    const {
        x,
        y,
        width,
        height,
    } = croppedAreaPixels;

    // 6. Draw cropped image
    ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        0,
        0,
        config.width,
        config.height
    );

    // 7. Canvas → Blob
    const blob =
        await new Promise<Blob | null>(
            (resolve) => {
                canvas.toBlob(
                    resolve,
                    "image/jpeg",
                    config.quality
                );
            }
        );

    if (!blob) {
        throw new Error(
            "Failed to create image."
        );
    }

    // 8. Blob → File
    const croppedFile = new File(
        [blob],
        config.fileName,
        {
            type: "image/jpeg",
        }
    );

    // 9. Compress
    const compressedBlob =
        await imageCompression(
            croppedFile,
            {
                maxSizeMB:
                    config.maxSizeMB,

                maxWidthOrHeight:
                    config.maxWidthOrHeight,

                useWebWorker: true,

                fileType: "image/jpeg",
            }
        );

    // 10. Return final File
    return new File(
        [compressedBlob],
        config.fileName,
        {
            type: "image/jpeg",
        }
    );
}