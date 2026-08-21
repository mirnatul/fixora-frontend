import { ISidebarItem } from "@/lib/types";
import {
	CreditCard,
	FileText,
	Home,
	LayoutDashboard,
	User,
} from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { TECHNICIAN_SIDEBAR_ITEMS } from "./technicianSidebarItems";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
	{
		label: "Back to Home",
		href: "/",
		icon: Home,
	},
	{
		label: "Dashboard",
		href: "/customer-dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Profile",
		href: "/customer-dashboard/profile",
		icon: User,
	},
	{
		label: "My Bookings",
		href: "/customer-dashboard/my-bookings",
		icon: FileText,
	},
	{
		label: "Payment History",
		href: "/customer-dashboard/payment-history",
		icon: CreditCard,
	},
];

export const sidebarMenuItems = {
	CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
	TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
	ADMIN: ADMIN_SIDEBAR_ITEMS,
};
