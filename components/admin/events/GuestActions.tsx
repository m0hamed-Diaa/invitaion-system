"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Delete,
    Edit,
    MoreHorizontal,
} from "lucide-react";

import AppDialog from "@/components/shared/DialogDemo";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
    deleteGuestAction,
    updateGuestStatus,
} from "@/lib/actions/quests";

type GuestStatus =
    | "pending"
    | "attending"
    | "declined";

interface IGuest {
    id: string;
    status: GuestStatus;
}

const statusLabels: Record<GuestStatus, string> = {
    pending: "بانتظار الرد",
    attending: "سيحضر",
    declined: "اعتذر",
};

export default function GuestActions({
    id,
    status,
}: IGuest) {

    const router = useRouter();

    const [openDelete, setDeleteOpen] =
        useState(false);

    const [openUpdate, setUpdateOpen] =
        useState(false);

    const [selectedStatus, setSelectedStatus] =
        useState<GuestStatus>(status);

    const [loading, setLoading] =
        useState(false);

    async function handleDelete() {

        try {

            setLoading(true);

            const res =
                await deleteGuestAction(id);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);

            setDeleteOpen(false);

            router.refresh();

        } catch (error) {

            console.error(error);

            toast.error(
                "حدث خطأ أثناء حذف المدعو"
            );

        } finally {

            setLoading(false);

        }
    }

    async function handleUpdateStatus() {

        try {

            setLoading(true);

            const res =
                await updateGuestStatus(
                    id,
                    selectedStatus
                );

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);

            setUpdateOpen(false);

            router.refresh();

        } catch (error) {

            console.error(error);

            toast.error(
                "حدث خطأ أثناء تعديل الحالة"
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="
                        duration-200
                        hover:border
                        rounded-full
                        cursor-pointer
                        p-1
                    "
                >
                    <MoreHorizontal
                        className="h-5 w-5"
                    />
                </DropdownMenuTrigger>


                <DropdownMenuContent align="end">

                    <DropdownMenuItem
                        onClick={() => {
                            setSelectedStatus(status);
                            setUpdateOpen(true);
                        }}
                        className="cursor-pointer"
                    >
                        <Edit size={18} />

                        تعديل الحالة يدويا
                    </DropdownMenuItem>


                    <DropdownMenuItem
                        onClick={() =>
                            setDeleteOpen(true)
                        }
                        className="
                            cursor-pointer
                            duration-200
                            hover:text-red-600
                        "
                    >
                        <Delete size={18} />

                        حذف المدعو
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>


            {/* Delete Dialog */}

            <AppDialog
                open={openDelete}
                onOpenChange={setDeleteOpen}
                title="هل أنت متأكد من حذف المدعو؟"
                description="
                    إذا قمت بحذف المدعو، فلن يظهر معك
                    في التقرير النهائي.
                "
                confirmText={
                    loading
                        ? "جاري الحذف..."
                        : "حذف"
                }
                confirmVariant="destructive"
                onConfirm={handleDelete}
            />


            {/* Update Status Dialog */}

            <AppDialog
                open={openUpdate}
                onOpenChange={setUpdateOpen}
                title="تعديل حالة المدعو"
                description="
                    يمكنك تغيير حالة المدعو يدويًا.
                "
                showFooter={false}
            >

                <div className="space-y-5">

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            حالة المدعو
                        </label>

                        <Select
                            value={selectedStatus}
                            onValueChange={(value) =>
                                setSelectedStatus(
                                    value as GuestStatus
                                )
                            }
                        >

                            <SelectTrigger>

                                <SelectValue>{statusLabels[selectedStatus]}</SelectValue>

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="pending">
                                    بانتظار الرد
                                </SelectItem>

                                <SelectItem value="attending">
                                    سيحضر
                                </SelectItem>

                                <SelectItem value="declined">
                                    اعتذر
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>


                    <Button
                        className="w-full"
                        onClick={
                            handleUpdateStatus
                        }
                        disabled={loading}
                    >
                        {loading
                            ? "جاري الحفظ..."
                            : "حفظ التعديل"
                        }
                    </Button>

                </div>

            </AppDialog>
        </>
    );
}