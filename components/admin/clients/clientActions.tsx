"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Delete,
    Edit,
    Eye,
    MoreHorizontal,
} from "lucide-react";

import AppDialog from "@/components/shared/DialogDemo";
import ClientAddForm from "./ClientAddForm";

import {
    deleteClientAction,
    updateClientAction,
} from "@/lib/actions/clients";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Props {
    client: {
        id: string;
        name: string;
        phone: string;
        expected_guests: number;
    };
}

export default function ClientsActions({ client }: Props) {
    const router = useRouter();

    const [openDelete, setDeleteOpen] = useState(false);
    const [openUpdate, setUpdateOpen] = useState(false);

    const {
        id,
        name,
        phone,
        expected_guests,
    } = client;

    async function handleDelete() {
        const res = await deleteClientAction(id);

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);

        setDeleteOpen(false);

        router.refresh();
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="duration-200 hover:border rounded-full cursor-pointer">
                    <MoreHorizontal className="h-5 w-5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                    <DropdownMenuItem
                        className="cursor-pointer"
                    >
                        <Link href={`/admin/events/${client.id}`} className="flex items-center gap-1">
                            <Eye size={18} />
                            عرض التفاصيل
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setUpdateOpen(true)}
                        className="cursor-pointer"
                    >
                        <Edit size={18} />
                        تعديل
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setDeleteOpen(true)}
                        className="cursor-pointer text-red-600"
                    >
                        <Delete size={18} />
                        حذف
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <AppDialog
                open={openDelete}
                onOpenChange={setDeleteOpen}
                title={`هل أنت متأكد من حذف العميل ${client.name}؟`}
                description="سيتم حذف المناسبة والمدعوين والتذكيرات وسجل الدخول والملفات المرتبطة بهذا العميل نهائيًا."
                confirmText="حذف"
                confirmVariant="destructive"
                onConfirm={handleDelete}
            />

            <AppDialog
                open={openUpdate}
                onOpenChange={setUpdateOpen}
                title="تعديل العميل"
                showFooter={false}
            >
                <ClientAddForm
                    defaultValues={{
                        name,
                        phone,
                        expected_guests,
                    }}
                    submitText="حفظ التعديلات"
                    successMessage="تم تعديل العميل بنجاح"
                    onSubmit={async (data) => {
                        const res = await updateClientAction(id, data);

                        if (!res.success) {
                            throw new Error(res.message);
                        }

                        toast.success(res.message);

                        setUpdateOpen(false);

                        router.refresh();
                    }}
                />
            </AppDialog>
        </>
    );
}