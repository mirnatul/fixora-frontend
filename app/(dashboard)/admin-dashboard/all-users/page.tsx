import { getAllUsers } from "../../_actions/getAllUsers";
import UserTable from "../../_components/admin/UserTable";

export default async function AllUsersPage() {
    const users = await getAllUsers();

    return (
        <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">All Users</h1>
                <p className="text-muted-foreground">
                    Manage all registered users.
                </p>
            </div>

            <div className="flex-1 rounded-lg border overflow-auto">
                <UserTable users={users.data.users} />
            </div>
        </div>
    );
}