import AppSidebar from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentAdmin } from "@/lib/database/GetCurrentAdmin";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = await getCurrentAdmin();

    if (!admin) {

        redirect("/login");
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="min-h-screen container mx-auto p-4 overflow-x-auto">
                <div>
                    <SidebarTrigger title="Ctrl+B" />
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}