import { ISidebarItem } from "@/lib/types";
import {
	LayoutDashboard,
	User,
	Users,
	Wrench,
	CalendarCheck,
	Tags,
	Home,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
	{
		label: "Back to Home",
		href: "/",
		icon: Home,
	},
	{
		label: "Admin Dashboard",
		href: "/admin-dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Profile",
		href: "/admin-dashboard/profile",
		icon: User,
	},
	{
		label: "All Users",
		href: "/admin-dashboard/all-users",
		icon: Users,
	},
	{
		label: "All Categories",
		href: "/admin-dashboard/all-categories",
		icon: Tags,
	},
];
