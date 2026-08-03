// import { SidebarProvider } from "@/components/ui/sidebar";
// import { getMe } from "@/service/getMe";
// import DashboardSidebar from "./_components/DashboardSidebar";
// import { Navbar } from "@/components/shared/Navbar";

// const DashboardLayout = async (
//     {
//         children
//     }: {
//         children: React.ReactNode
//     }
// ) => {
//     const user = await getMe();
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar user={user} />
//             <SidebarProvider>
//                 <div className="flex flex-1">
//                     <DashboardSidebar user={user} />
//                     <main className="flex-1 min-w-0">{children}</main>
//                 </div>
//             </SidebarProvider>
//         </div>
//     );
// };

// export default DashboardLayout


// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { getMe } from "@/service/getMe";
// import DashboardSidebar from "./_components/DashboardSidebar";
// import { Navbar } from "@/components/shared/Navbar";

// const DashboardLayout = async ({
//     children,
// }: {
//     children: React.ReactNode;
// }) => {
//     const user = await getMe();

//     return (
//         <TooltipProvider>
//             <SidebarProvider>

//                 <div className="min-h-screen flex flex-col w-full">

//                     <Navbar user={user} />

//                     <div className="flex flex-1">

//                         <DashboardSidebar user={user} />

//                         <main className="flex-1 min-w-0">

//                             {/* Sidebar Toggle */}
//                             <div className="flex items-center h-12 border-b px-4">
//                                 <SidebarTrigger />
//                             </div>

//                             <div className="p-4">
//                                 {children}
//                             </div>

//                         </main>

//                     </div>

//                 </div>

//             </SidebarProvider>
//         </TooltipProvider>
//     );
// };

// export default DashboardLayout;

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getMe } from "@/service/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";
import { Navbar } from "@/components/shared/Navbar";

const DashboardLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = await getMe();

    return (
        <TooltipProvider>
            <SidebarProvider>

                <div className="min-h-screen flex flex-col w-full">

                    <Navbar user={user} />

                    <div className="flex flex-1">

                        <DashboardSidebar user={user} />

                        <main className="flex-1 min-w-0">

                            {/* Only visible when sidebar is closed (mobile) */}
                            <div className="md:hidden flex items-center h-12 border-b px-4">
                                <SidebarTrigger />
                            </div>

                            <div className="p-4">
                                {children}
                            </div>

                        </main>

                    </div>

                </div>

            </SidebarProvider>
        </TooltipProvider>
    );
};

export default DashboardLayout;