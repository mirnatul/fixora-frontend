// "use client";

// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";

// interface Category {
//     id: string;
//     name: string;
// }

// interface Service {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     duration: number;
//     location: string;
//     active: boolean;
//     categoryId: string;
// }

// interface UpdateServiceDialogProps {
//     service: Service;
//     categories: Category[];
// }

// export default function UpdateServiceDialog({
//     service,
//     categories,
// }: UpdateServiceDialogProps) {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="outline">Update Service</Button>
//             </DialogTrigger>

//             <DialogContent className="sm:max-w-lg">
//                 <DialogHeader>
//                     <DialogTitle>Update Service</DialogTitle>
//                     <DialogDescription>
//                         Update your service information.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <form className="space-y-4">
//                     <div>
//                         <Label htmlFor="title">Title</Label>
//                         <Input
//                             id="title"
//                             name="title"
//                             defaultValue={service.title}
//                         />
//                     </div>

//                     <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea
//                             id="description"
//                             name="description"
//                             defaultValue={service.description}
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="price">Price (৳)</Label>
//                             <Input
//                                 id="price"
//                                 name="price"
//                                 type="number"
//                                 defaultValue={service.price}
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="duration">Duration (Minutes)</Label>
//                             <Input
//                                 id="duration"
//                                 name="duration"
//                                 type="number"
//                                 defaultValue={service.duration}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <Label htmlFor="location">Location</Label>
//                         <Input
//                             id="location"
//                             name="location"
//                             defaultValue={service.location}
//                         />
//                     </div>

//                     <div>
//                         <Label>Category</Label>

//                         <Select defaultValue={service.categoryId}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select category" />
//                             </SelectTrigger>

//                             <SelectContent>
//                                 {categories.map((category) => (
//                                     <SelectItem
//                                         key={category.id}
//                                         value={category.id}
//                                     >
//                                         {category.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <Label htmlFor="active">Active Service</Label>
//                         <Switch
//                             id="active"
//                             defaultChecked={service.active}
//                         />
//                     </div>

//                     <Button className="w-full" type="submit">
//                         Update Service
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }