import { getAllUsers } from "../../_actions/getAllUsers";
import Pagination from "../../_components/admin/Pagination";
import UserSearch from "../../_components/admin/UserSearch";
import UserTable from "../../_components/admin/UserTable";

interface Props {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        searchTerm?: string;
    }>;
}

export default async function AllUsersPage({ searchParams }: Props) {
    const params = await searchParams;

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const searchTerm = params.searchTerm || "";

    const users = await getAllUsers({
        page,
        limit,
        searchTerm,
    });

    return (
        <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">All Users</h1>
                    <p className="text-muted-foreground">
                        Manage all registered users.
                    </p>
                </div>

                <div className="w-full max-w-sm">
                    <UserSearch />
                </div>
            </div>

            <div className="flex-1 rounded-lg border overflow-auto">
                <UserTable users={users.data} />
            </div>

            <Pagination meta={users.meta} />
        </div>
    );
}