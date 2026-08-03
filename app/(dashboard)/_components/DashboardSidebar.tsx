// "use client";

// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem
// } from "@/components/ui/sidebar";
// import { ISidebarItem, NavbarProps } from "@/lib/types";
// import { Newspaper } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { sidebarMenuItems } from "../_config/SidebarMenuItems";


// export default function DashboardSidebar({ user }: NavbarProps) {
//     const pathname = usePathname();

//     // const navItems = sidebarMenuItems.USER;

//     let navItems: ISidebarItem[] = [];

//     if (user.data.profile.role === "CUSTOMER") {
//         navItems = sidebarMenuItems.CUSTOMER
//     } else if (user.data.profile.role === "TECHNICIAN") {
//         navItems = sidebarMenuItems.TECHNICIAN;
//     } else if (user.data.profile.role === "ADMIN") {
//         navItems = sidebarMenuItems.ADMIN;
//     }

//     return (
//         <Sidebar
//             collapsible="none"
//             className=" h-[calc(100svh-0rem)] border-r border-sidebar-border"
//         >
//             <SidebarContent>
//                 <SidebarGroup>
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             {navItems.map((item) => (
//                                 <SidebarMenuItem key={item.href}>
//                                     <SidebarMenuButton
//                                         asChild
//                                         isActive={pathname === item.href}
//                                     >
//                                         <Link href={item.href}>
//                                             <item.icon />
//                                             <span>{item.label}</span>
//                                         </Link>
//                                     </SidebarMenuButton>
//                                 </SidebarMenuItem>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     );
// }

"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { NavbarProps, ISidebarItem } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/SidebarMenuItems";


export default function DashboardSidebar({ user }: NavbarProps) {
    const pathname = usePathname();

    let navItems: ISidebarItem[] = [];

    if (user.data.profile.role === "CUSTOMER") {
        navItems = sidebarMenuItems.CUSTOMER;
    } else if (user.data.profile.role === "TECHNICIAN") {
        navItems = sidebarMenuItems.TECHNICIAN;
    } else if (user.data.profile.role === "ADMIN") {
        navItems = sidebarMenuItems.ADMIN;
    }


    return (
        <Sidebar
            collapsible="icon"
            className="h-[calc(100svh-4rem)] border-r border-sidebar-border"
        >

            {/* Sidebar Header */}
            <SidebarHeader>
                <div className="flex justify-end">
                    <SidebarTrigger />
                </div>
            </SidebarHeader>


            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupContent>

                        <SidebarMenu>

                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>

                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.label}
                                    >

                                        <Link href={item.href}>

                                            <item.icon />

                                            <span>
                                                {item.label}
                                            </span>

                                        </Link>

                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

        </Sidebar>
    );
}