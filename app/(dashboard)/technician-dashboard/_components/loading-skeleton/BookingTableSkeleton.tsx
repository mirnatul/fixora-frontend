import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingTableSkeletonProps {
    rows?: number;
}

export default function BookingTableSkeleton({
    rows = 6,
}: BookingTableSkeletonProps) {
    return (
        <div className="h-full overflow-auto">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-background">
                    <TableRow>
                        <TableHead className="w-14 px-6">#</TableHead>
                        <TableHead className="px-6">Date</TableHead>
                        <TableHead className="px-6">Time Slot</TableHead>
                        <TableHead className="min-w-65 px-6">
                            Address
                        </TableHead>
                        <TableHead className="px-6">Total</TableHead>
                        <TableHead className="px-6">Status</TableHead>
                        <TableHead className="px-6 text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="px-6 py-6">
                                <Skeleton className="h-4 w-5" />
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <Skeleton className="h-4 w-24" />
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-6 w-28 rounded-full" />
                                    <Skeleton className="h-6 w-28 rounded-full" />
                                </div>
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <Skeleton className="h-4 w-64 max-w-full" />
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <Skeleton className="h-4 w-16" />
                            </TableCell>

                            <TableCell className="px-6 py-6">
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </TableCell>

                            <TableCell className="px-6 py-6 text-right">
                                <div className="flex justify-end">
                                    <Skeleton className="h-9 w-9 rounded-md" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}