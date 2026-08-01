import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems"
import { TECHNICIAN_SIDEBAR_ITEMS } from "./technicianSidebarItems"


const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/customer-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Bookings",
        href: "/customer-dashboard/my-bookings",
        icon: FileText
    },
]


export const sidebarMenuItems = {
    CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
    TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
    ADMIN: ADMIN_SIDEBAR_ITEMS
}