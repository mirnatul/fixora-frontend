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
import UserRowActions from "./UserActions";

interface User {
    id: string;
    name: string;
    email: string;
    city: string | null;
    role: string;
    status: string;
    createdAt: string;
}

export default function UserTable({
    users,
}: {
    users: User[];
}) {
    return (
        <div className="rounded-lg border bg-background">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-10"></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                {user.name}
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>{user.city || "-"}</TableCell>

                            <TableCell>{user.role}</TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        user.status === "ACTIVE"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>

                            <TableCell>{user.createdAt}</TableCell>

                            <TableCell>
                                <UserRowActions user={user} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}