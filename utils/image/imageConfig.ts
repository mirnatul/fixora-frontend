export const IMAGE_CONFIG = {
    square: {
        width: 800,
        height: 800,
        aspectRatio: 1 / 1,
        quality: 0.85,
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        fileName: "image.jpg",
    },

    rectangle: {
        width: 1200,
        height: 675,
        aspectRatio: 16 / 9,
        quality: 0.85,
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        fileName: "image.jpg",
    },

    verticalRectangle: {
        width: 675,
        height: 1200,
        aspectRatio: 9 / 16,
        quality: 0.85,
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        fileName: "image.jpg",
    },

    circle: {
        width: 800,
        height: 800,
        aspectRatio: 1 / 1,
        quality: 0.85,
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        fileName: "image.jpg",
    },
} as const;

export type ImageType =
    keyof typeof IMAGE_CONFIG;