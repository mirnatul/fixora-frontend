// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Loader2, Mail, MapPin, Pencil, Phone } from "lucide-react";
// import { useActionState, useEffect } from "react";
// import { updateUserInfo } from "../_actions/updateUserInfo";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import { toast } from "sonner";

// type ProfileCardProps = {
//     profile: {
//         name: string;
//         email: string;
//         phone: string;
//         profileImage: string | null;
//         address: string;
//         city: string;
//         role: string;
//         status: string;
//     };
// };

// const initialState = {
//     success: false,
//     message: "",
// };

// export default function ProfileCard({ profile }: ProfileCardProps) {
//     const [state, formAction, pending] = useActionState(
//         updateUserInfo,
//         initialState
//     );

//     useEffect(() => {
//         if (state.message) {
//             if (state.success) {
//                 toast.success(state.message);
//             } else {
//                 toast.error(state.message);
//             }
//         }
//     }, [state]);

//     return (
//         <Dialog>
//             <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>User Information</CardTitle>

//                     <DialogTrigger asChild>
//                         <Button size="sm">
//                             <Pencil className="mr-2 h-4 w-4" />
//                             Edit Profile
//                         </Button>
//                     </DialogTrigger>
//                 </CardHeader>

//                 <CardContent className="space-y-6">
//                     <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//                         <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted text-3xl font-bold">
//                             <Image
//                                 src={profile.profileImage || "/dummy.jpg"}
//                                 alt="Profile image"
//                                 width={96}
//                                 height={96}
//                                 className="h-24 w-24 rounded-full object-cover"
//                                 unoptimized
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <h2 className="text-2xl font-bold">
//                                 {profile.name}
//                             </h2>

//                             <div className="flex flex-wrap gap-2">
//                                 <Badge>{profile.role}</Badge>

//                                 <Badge
//                                     variant={
//                                         profile.status === "ACTIVE"
//                                             ? "default"
//                                             : "destructive"
//                                     }
//                                 >
//                                     {profile.status}
//                                 </Badge>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid gap-4 md:grid-cols-2">
//                         <InfoItem
//                             icon={<Mail className="h-4 w-4" />}
//                             label="Email"
//                             value={profile.email}
//                         />

//                         <InfoItem
//                             icon={<Phone className="h-4 w-4" />}
//                             label="Phone"
//                             value={profile.phone}
//                         />

//                         <InfoItem
//                             icon={<MapPin className="h-4 w-4" />}
//                             label="Address"
//                             value={profile.address}
//                         />

//                         <InfoItem
//                             icon={<MapPin className="h-4 w-4" />}
//                             label="City"
//                             value={profile.city}
//                         />
//                     </div>
//                 </CardContent>
//             </Card>

//             <DialogContent className="sm:max-w-lg">
//                 <DialogHeader>
//                     <DialogTitle>Edit Profile</DialogTitle>
//                 </DialogHeader>

//                 <form action={formAction} className="space-y-4">
//                     <div className="space-y-2">
//                         <Label>Name</Label>
//                         <Input
//                             name="name"
//                             defaultValue={profile.name}
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label>Phone</Label>
//                         <Input
//                             name="phone"
//                             defaultValue={profile.phone}
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label>Address</Label>
//                         <Input
//                             name="address"
//                             defaultValue={profile.address}
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label>City</Label>
//                         <Input
//                             name="city"
//                             defaultValue={profile.city}
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label>Profile Image URL</Label>
//                         <Input
//                             name="profileImage"
//                             defaultValue={profile.profileImage ?? ""}
//                         />
//                     </div>

//                     <DialogFooter>
//                         <Button type="submit" disabled={pending}>
//                             {pending && (
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             )}

//                             {pending ? "Saving..." : "Save Changes"}
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }

// function InfoItem({
//     icon,
//     label,
//     value,
// }: {
//     icon: React.ReactNode;
//     label: string;
//     value?: string | null;
// }) {
//     return (
//         <div className="rounded-lg border p-4">
//             <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                 {icon}
//                 <span>{label}</span>
//             </div>

//             <p className="font-medium wrap-break-words">
//                 {value || "Not provided"}
//             </p>
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, Mail, MapPin, Pencil, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { uploadToCloudinary } from "@/lib/cloudinary";
import ImageUploadCropper from "@/components/shared/image/ImageUploadCropper";

import { updateUserInfo } from "../_actions/updateUserInfo";

type ProfileCardProps = {
    profile: {
        id: string;
        name: string;
        email: string;
        phone: string;
        imageUrl: string | null;
        imagePublicId: string | null;
        address: string;
        city: string;
        role: string;
        status: string;
    };
};

const initialState = {
    success: false,
    message: "",
};

export default function ProfileCard({ profile }: ProfileCardProps) {
    const [open, setOpen] = useState(false);

    // New cropped image
    const [processedImage, setProcessedImage] =
        useState<File | null>(null);

    // User removed existing image
    const [imageRemoved, setImageRemoved] =
        useState(false);

    // Cropper is currently open
    const [editingImage, setEditingImage] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    useEffect(() => {
        if (initialState.message) {
            if (initialState.success) {
                toast.success(initialState.message);
            } else {
                toast.error(initialState.message);
            }
        }
    }, []);

    const handleUpdateProfile = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const form = event.currentTarget;

        try {
            setIsSubmitting(true);

            const formData = new FormData(form);

            // ==================================================
            // CASE 1: NEW IMAGE
            // ==================================================

            if (processedImage) {
                const result = await uploadToCloudinary(
                    processedImage,
                    process.env.NEXT_PUBLIC_API_URL!
                );

                formData.set("imageUrl", result.url);

                formData.set(
                    "imagePublicId",
                    result.publicId
                );
            }

            // ==================================================
            // CASE 2: IMAGE REMOVED
            // ==================================================

            else if (imageRemoved) {
                formData.set("profileImage", "");

                formData.set(
                    "profileImagePublicId",
                    ""
                );

                formData.set(
                    "oldProfileImagePublicId",
                    profile.imagePublicId ?? ""
                );
            }

            // ==================================================
            // CASE 3: IMAGE NOT TOUCHED
            // ==================================================

            else {
                formData.set(
                    "profileImage",
                    profile.imageUrl ?? ""
                );

                formData.set(
                    "profileImagePublicId",
                    profile.imageUrl ?? ""
                );
            }

            // ==================================================
            // UPDATE DATABASE
            // ==================================================

            const response = await updateUserInfo(
                profile.id,
                formData
            );

            if (!response.success) {
                toast.error(
                    response.message ||
                    "Failed to update profile."
                );

                return;
            }

            toast.success(
                response.message ||
                "Profile updated successfully."
            );

            // Reset image state
            setProcessedImage(null);
            setImageRemoved(false);
            setEditingImage(false);

            setOpen(false);

        } catch (error) {
            console.error(
                "Update profile error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                        User Information
                    </CardTitle>

                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </DialogTrigger>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
                            <Image
                                src={
                                    profile.imageUrl ||
                                    "/dummy.jpg"
                                }
                                alt="Profile image"
                                width={96}
                                height={96}
                                className="h-24 w-24 rounded-full object-cover"
                                unoptimized
                            />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">
                                {profile.name}
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                <Badge>
                                    {profile.role}
                                </Badge>

                                <Badge
                                    variant={
                                        profile.status ===
                                            "ACTIVE"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {profile.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <InfoItem
                            icon={
                                <Mail className="h-4 w-4" />
                            }
                            label="Email"
                            value={profile.email}
                        />

                        <InfoItem
                            icon={
                                <Phone className="h-4 w-4" />
                            }
                            label="Phone"
                            value={profile.phone}
                        />

                        <InfoItem
                            icon={
                                <MapPin className="h-4 w-4" />
                            }
                            label="Address"
                            value={profile.address}
                        />

                        <InfoItem
                            icon={
                                <MapPin className="h-4 w-4" />
                            }
                            label="City"
                            value={profile.city}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ==================================================
                UPDATE DIALOG
            ================================================== */}

            <DialogContent className="sm:max-w-md rounded-sm">
                <DialogHeader>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>

                    <DialogDescription>
                        Update your profile information.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleUpdateProfile}
                    className="space-y-5"
                >
                    {/* ==================================================
                        PROFILE IMAGE
                    ================================================== */}

                    <ImageUploadCropper
                        imageType="circle"
                        existingImageUrl={
                            profile.imageUrl
                        }
                        onImageProcessed={
                            setProcessedImage
                        }
                        onEditingChange={
                            setEditingImage
                        }
                        onImageRemoved={() => {
                            setImageRemoved(true);
                        }}
                        disabled={isSubmitting}
                    />

                    {/* ==================================================
                        OTHER FIELDS
                    ================================================== */}

                    {!editingImage && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Name
                                </Label>

                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={
                                        profile.name
                                    }
                                    placeholder="Enter your name"
                                    required
                                    className="rounded-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">
                                    Phone
                                </Label>

                                <Input
                                    id="phone"
                                    name="phone"
                                    defaultValue={
                                        profile.phone
                                    }
                                    placeholder="Enter phone number"
                                    className="rounded-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">
                                    Address
                                </Label>

                                <Input
                                    id="address"
                                    name="address"
                                    defaultValue={
                                        profile.address
                                    }
                                    placeholder="Enter address"
                                    className="rounded-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">
                                    City
                                </Label>

                                <Input
                                    id="city"
                                    name="city"
                                    defaultValue={
                                        profile.city
                                    }
                                    placeholder="Enter city"
                                    className="rounded-sm"
                                />
                            </div>

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}

                                    {isSubmitting
                                        ? "Updating..."
                                        : "Save Changes"}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string | null;
}) {
    return (
        <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>

            <p className="font-medium wrap-break-words">
                {value || "Not provided"}
            </p>
        </div>
    );
}