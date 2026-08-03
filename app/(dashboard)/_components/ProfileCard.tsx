"use client";

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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { useActionState, useEffect } from "react";
import { updateUserInfo } from "../_actions/updateUserInfo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";

type ProfileCardProps = {
    profile: {
        name: string;
        email: string;
        phone: string;
        profileImage: string | null;
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
    const [state, formAction, pending] = useActionState(
        updateUserInfo,
        initialState
    );

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <Dialog>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>User Information</CardTitle>

                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </DialogTrigger>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted text-3xl font-bold">
                            <Image
                                src={profile.profileImage || "/dummy.jpg"}
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
                                <Badge>{profile.role}</Badge>

                                <Badge
                                    variant={
                                        profile.status === "ACTIVE"
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
                            icon={<Mail className="h-4 w-4" />}
                            label="Email"
                            value={profile.email}
                        />

                        <InfoItem
                            icon={<Phone className="h-4 w-4" />}
                            label="Phone"
                            value={profile.phone}
                        />

                        <InfoItem
                            icon={<MapPin className="h-4 w-4" />}
                            label="Address"
                            value={profile.address}
                        />

                        <InfoItem
                            icon={<MapPin className="h-4 w-4" />}
                            label="City"
                            value={profile.city}
                        />
                    </div>
                </CardContent>
            </Card>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            name="name"
                            defaultValue={profile.name}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                            name="phone"
                            defaultValue={profile.phone}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                            name="address"
                            defaultValue={profile.address}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                            name="city"
                            defaultValue={profile.city}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Profile Image URL</Label>
                        <Input
                            name="profileImage"
                            defaultValue={profile.profileImage ?? ""}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {pending ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
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