"use client";

import { useActionState } from "react";
import {
    Briefcase,
    Loader2,
    Pencil,
    ShieldCheck,
    Star,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTechnicianInfo } from "../_actions/updateTechnicianInfo";


type TechnicianCardProps = {
    technician: {
        bio: string;
        experience: number;
        averageRating: string;
        totalReviews: number;
        isAvailable: boolean;
        verified: boolean;
    };
};

const initialState = {
    success: false,
    message: "",
};

export default function TechnicianCard({
    technician,
}: TechnicianCardProps) {
    const [state, formAction, pending] = useActionState(
        updateTechnicianInfo,
        initialState
    );

    return (
        <Dialog>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Technician Information</CardTitle>

                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Technician
                        </Button>
                    </DialogTrigger>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div>
                        <h3 className="mb-2 font-semibold">Bio</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                            {technician.bio || "No bio added yet."}
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <InfoItem
                            icon={<Briefcase className="h-4 w-4" />}
                            label="Experience"
                            value={`${technician.experience} Year(s)`}
                        />

                        <InfoItem
                            icon={
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            }
                            label="Rating"
                            value={`${technician.averageRating} ⭐ (${technician.totalReviews} Reviews)`}
                        />

                        <div className="rounded-lg border p-4">
                            <div className="mb-2 text-sm text-muted-foreground">
                                Availability
                            </div>

                            <Badge
                                variant={
                                    technician.isAvailable
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {technician.isAvailable
                                    ? "Available"
                                    : "Unavailable"}
                            </Badge>
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <ShieldCheck className="h-4 w-4" />
                                Verification
                            </div>

                            <Badge
                                variant={
                                    technician.verified
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {technician.verified
                                    ? "Verified"
                                    : "Not Verified"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Technician Information</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Bio</Label>

                        <Textarea
                            name="bio"
                            rows={5}
                            defaultValue={technician.bio}
                            placeholder="Tell customers about yourself..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Experience (Years)</Label>

                        <Input
                            type="number"
                            min={0}
                            name="experience"
                            defaultValue={technician.experience}
                        />
                    </div>

                    {state.message && (
                        <p
                            className={`text-sm ${state.success
                                ? "text-green-600"
                                : "text-red-500"
                                }`}
                        >
                            {state.message}
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save Changes
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
    value: string;
}) {
    return (
        <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>

            <p className="font-medium wrap-break-words">{value}</p>
        </div>
    );
}