import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, User } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Admin Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Profile",
        href: "/admin-dashboard/profile",
        icon: User,
    },
    {
        label: "All Users",
        href: "/admin-dashboard/all-users",
        icon: FileText
    },
]