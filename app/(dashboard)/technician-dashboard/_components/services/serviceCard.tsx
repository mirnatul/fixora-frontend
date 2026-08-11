// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { updateService } from "../../_actions/updateService";
// import { toast } from "sonner";

// interface Service {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     location: string;
//     rating: string;
//     active: boolean;
//     technicianId: string;
//     categoryId: string;
//     imageUrl: string | null;
//     imagePublicId: string | null;
//     createdAt: string;
//     updatedAt: string;
// }

// interface ServiceCardProps {
//     service: Service;
//     onSeeMore: () => void;
// }

// const initialState = {
//     success: false,
//     message: "",
// };

// export default function ServiceCard({
//     service,
//     onSeeMore,
// }: ServiceCardProps) {
//     const [open, setOpen] = useState(false);
//     const [active, setActive] = useState(service.active);

//     const truncatedDescription =
//         service.description.length > 80
//             ? service.description.substring(0, 80) + "..."
//             : service.description;

//     const ratingNumber = parseFloat(service.rating);

//     const updateServiceAction = updateService.bind(
//         null,
//         service.id
//     );

//     const [state, action, pending] = useActionState(
//         updateServiceAction,
//         initialState
//     );

//     useEffect(() => {
//         if (!state.message) return;

//         if (state.success) {
//             toast.success(state.message);
//             setOpen(false);
//         } else {
//             toast.error(state.message);
//         }
//     }, [state]);

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <div className="bg-white dark:bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">

//                 {/* Header */}
//                 <div className="p-4 border-b border-border">
//                     <div className="flex justify-between items-start gap-2 mb-2">
//                         <h3 className="text-lg font-semibold text-foreground flex-1">
//                             {service.title}
//                         </h3>

//                         <div className="text-right">
//                             <p className="text-2xl font-bold text-primary">
//                                 ৳{service.price}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

//                         <span className="text-sm font-medium">
//                             {ratingNumber}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Description */}
//                 <div className="p-4 border-b border-border">
//                     <p className="text-sm text-gray-700 dark:text-muted-foreground">
//                         {truncatedDescription}
//                     </p>

//                     <button
//                         onClick={onSeeMore}
//                         className="mt-2 text-sm font-medium text-primary hover:underline"
//                     >
//                         See more →
//                     </button>
//                 </div>

//                 {/* Location */}
//                 <div className="p-4 border-b border-border">
//                     <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-muted-foreground">
//                         <span>📍</span>

//                         <span>
//                             {service.location}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Update Button */}
//                 <div className="flex gap-3 p-4 w-full">
//                     <DialogTrigger asChild>
//                         <Button variant="outline">
//                             Update Service
//                         </Button>
//                     </DialogTrigger>
//                 </div>
//             </div>

//             {/* Update Dialog */}
//             <DialogContent className="sm:max-w-lg">
//                 <DialogHeader>
//                     <DialogTitle>
//                         Update Service
//                     </DialogTitle>

//                     <DialogDescription>
//                         Update your service information.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <form
//                     action={action}
//                     className="space-y-4"
//                 >
//                     {/* Title */}
//                     <div>
//                         <Label htmlFor="title">
//                             Title
//                         </Label>

//                         <Input
//                             id="title"
//                             name="title"
//                             defaultValue={service.title}
//                         />
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <Label htmlFor="description">
//                             Description
//                         </Label>

//                         <Textarea
//                             id="description"
//                             name="description"
//                             defaultValue={service.description}
//                         />
//                     </div>

//                     {/* Price */}
//                     <div>
//                         <Label htmlFor="price">
//                             Price (৳)
//                         </Label>

//                         <Input
//                             id="price"
//                             name="price"
//                             type="number"
//                             defaultValue={service.price}
//                         />
//                     </div>

//                     {/* Location */}
//                     <div>
//                         <Label htmlFor="location">
//                             Location
//                         </Label>

//                         <Input
//                             id="location"
//                             name="location"
//                             defaultValue={service.location}
//                         />
//                     </div>

//                     {/* Active */}
//                     <div className="flex items-center gap-3">
//                         <input
//                             id="active"
//                             name="active"
//                             type="checkbox"
//                             checked={active}
//                             onChange={(e) =>
//                                 setActive(e.target.checked)
//                             }
//                             className="h-4 w-4"
//                         />

//                         <Label htmlFor="active">
//                             Active Service
//                         </Label>
//                     </div>

//                     <Button
//                         className="w-full"
//                         type="submit"
//                         disabled={pending}
//                     >
//                         {pending
//                             ? "Updating..."
//                             : "Update Service"}
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }


"use client";

import { Star } from "lucide-react";
import UpdateServiceDialog from "./UpdateServiceDialog";

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    rating: string;
    active: boolean;
    technicianId: string;
    categoryId: string;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface ServiceCardProps {
    service: Service;
    onSeeMore: () => void;
}

export default function ServiceCard({
    service,
    onSeeMore,
}: ServiceCardProps) {
    const ratingNumber = parseFloat(service.rating);

    const truncatedDescription =
        service.description.length > 80
            ? service.description.substring(0, 80) + "..."
            : service.description;

    return (
        <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-card">

            {/* ==================================================
                SERVICE IMAGE
            =================================================== */}

            <div className="aspect-video w-full overflow-hidden bg-muted">
                {service.imageUrl ? (
                    <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            {/* ==================================================
                SERVICE HEADER
            =================================================== */}

            <div className="border-b border-border p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="flex-1 text-xl font-semibold text-foreground">
                        {service.title}
                    </h3>

                    <p className="text-2xl font-bold text-primary">
                        ৳{service.price}
                    </p>
                </div>

                {/* Rating */}

                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-medium">
                        {ratingNumber}
                    </span>
                </div>
            </div>

            {/* ==================================================
                DESCRIPTION
            =================================================== */}

            <div className="border-b border-border p-5">
                <p className="text-sm text-muted-foreground">
                    {truncatedDescription}
                </p>

                {service.description.length > 80 && (
                    <button
                        type="button"
                        onClick={onSeeMore}
                        className="mt-2 text-sm font-medium text-primary hover:underline"
                    >
                        See more →
                    </button>
                )}
            </div>

            {/* ==================================================
                LOCATION
            =================================================== */}

            <div className="border-b border-border p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>📍</span>

                    <span>{service.location}</span>
                </div>
            </div>

            {/* ==================================================
                CARD FOOTER
            =================================================== */}

            <div className="flex items-center justify-between gap-3 p-4">
                <div>
                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${service.active
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                    >
                        {service.active ? "Active" : "Inactive"}
                    </span>
                </div>

                <UpdateServiceDialog service={service} />
            </div>
        </div>
    );
}