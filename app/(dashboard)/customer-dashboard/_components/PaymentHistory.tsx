"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Payment {
    id: string;
    transactionId: string;
    amount: number;
    status: string;
    createdAt: string;
    booking: {
        service: {
            title: string;
        };
    };
}

interface PaymentHistoryTableProps {
    payments: Payment[];
}

export default function PaymentHistoryTable({
    payments,
}: PaymentHistoryTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
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
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell className="font-medium">
                                    {payment.booking.service.title}
                                </TableCell>

                                <TableCell className="font-mono text-xs">
                                    {payment.transactionId}
                                </TableCell>

                                <TableCell>
                                    ৳{payment.amount.toLocaleString()}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            payment.status === "COMPLETED"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : payment.status === "FAILED"
                                                    ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                        }
                                    >
                                        {payment.status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        payment.createdAt
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}

                        {payments.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No payment history found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}