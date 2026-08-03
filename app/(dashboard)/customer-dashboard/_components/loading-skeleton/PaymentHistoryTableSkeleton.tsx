import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentHistoryTableSkeletonProps {
    rows?: number;
}

export default function PaymentHistoryTableSkeleton({
    rows = 6,
}: PaymentHistoryTableSkeletonProps) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-44" />
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array.from({ length: rows }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-4 w-40" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-4 w-44" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}