import { ISidebarItem } from "@/lib/types";
import {
	FileText,
	LayoutDashboard,
	User,
	Briefcase,
	CalendarCheck,
	Home,
} from "lucide-react";

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
	{
		label: "Back to Home",
		href: "/",
		icon: Home,
	},
	{
		label: "Dashboard",
		href: "/technician-dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Profile",
		href: "/technician-dashboard/profile",
		icon: User,
	},
	{
		label: "Bookings I Get",
		href: "/technician-dashboard/bookings-i-get",
		icon: FileText,
	},
	{
		label: "My Services",
		href: "/technician-dashboard/my-services",
		icon: Briefcase,
	},
	{
		label: "Availability",
		href: "/technician-dashboard/availability",
		icon: CalendarCheck,
	},
];
