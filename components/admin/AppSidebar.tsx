"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Calendar,
    LayoutDashboard,
    MailCheck,
    Users,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useCurrentAdmin } from "@/lib/database/useCurrentAdmin";
import { toast } from "sonner";
import { useState } from "react";
import DialogDemo from "../shared/DialogDemo";


export default function AppSidebar() {
    const { state, isMobile, setOpenMobile } = useSidebar();
    const isCollapsed = state === "collapsed";
    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    const { admin } = useCurrentAdmin();
    const router = useRouter();

    const [openDilaog, setOpenDilaog] = useState(false);

    async function handleLogout() {
        const supabase = createClient();

        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            toast.success("تم تسجيل الخروج بنجاح");

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("فشل تسجيل الخروج");
        }
    }

    const navItems = [
        {
            href: "/admin", label: "الداشبورد",
            icon: LayoutDashboard,
        },
        {
            href: "/admin/clients", label: "العملاء",
            icon: Users,
        },
        {
            href: "/admin/events", label: "المناسبات",
            icon: Calendar,
        }
    ];

    return (
        <>
            <Sidebar side={"right"}
                collapsible="icon"
            >
                <SidebarHeader className="p-4 font-bold text-lg">
                    {isCollapsed ? <>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="outline">
                                <Avatar>
                                    <AvatarFallback>{admin?.initial}</AvatarFallback>
                                </Avatar>
                            </Button>} />
                            <DropdownMenuContent className="w-fit" align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>حسابى</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <MailCheck />
                                        {admin?.email}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => setOpenDilaog(true)}>
                                            تسجيل الخروج
                                            <LogOut />
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </> : <> صفحة الداشبورد</>}
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarItem
                                    onClick={handleClick}
                                    key={item.label}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    isCollapsed={isCollapsed}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="p-2 text-sm text-muted-foreground">
                    <Button
                        variant="destructive"
                        onClick={() => setOpenDilaog(true)}
                        className="cursor-pointer"
                    >
                        {!isCollapsed ?
                            <>
                                تسجيل الخروج
                                <LogOut className="size-4 ml-2" />
                            </>
                            :
                            <LogOut className="size-4" />
                        }
                    </Button>
                </SidebarFooter>
            </Sidebar >
            <DialogDemo open={openDilaog} title="هل تريد تسجيل الخروج" description="اذا سجلت الخروج، ستحتاج لاعادة تسجيل الدخول مرة اخري" onOpenChange={setOpenDilaog} onConfirm={handleLogout} confirmText="تسجيل الخروج" />
        </>
    );
}