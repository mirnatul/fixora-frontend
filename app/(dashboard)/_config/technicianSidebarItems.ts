import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/technician-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Bookings I Get",
        href: "/technician-dashboard/bookings-i-get",
        icon: FileText
    },
]