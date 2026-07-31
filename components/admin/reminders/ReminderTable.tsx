"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    MoreHorizontal,
    RefreshCw,
    Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppDialog from "@/components/shared/DialogDemo";

import {
    deleteReminderAction,
    retryReminderAction,
} from "@/lib/actions/reminders";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

interface Reminder {
    id: string;

    target:
    | "all"
    | "attending"
    | "declined";

    message: string;

    image: string | null;

    status:
    | "pending"
    | "sending"
    | "completed"
    | "failed";

    sent_count: number;
    // statistics
    totalTargeted: number;
    sentCount: number;
    failedCount: number;
    pendingCount: number;

    sent_at: string | null;

    created_at: string;
}

interface Props {
    reminders: Reminder[];
}

const targetLabels = {
    all: "كل المدعوين",
    attending: "من سيحضر",
    declined: "من اعتذر",
    pending: "بانتظار الرد",
};

function ReminderStatus({
    status,
}: {
    status: Reminder["status"];
}) {
    if (status === "completed") {
        return (
            <Badge className="gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                تم الإرسال
            </Badge>
        );
    }

    if (status === "sending") {
        return (
            <Badge
                variant="secondary"
                className="gap-2"
            >
                <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
                جاري الإرسال
            </Badge>
        );
    }

    if (status === "failed") {
        return (
            <Badge
                variant="destructive"
                className="gap-2"
            >
                <span className="h-2 w-2 rounded-full bg-red-500" />
                حدثت مشكلة
            </Badge>
        );
    }

    return (
        <Badge
            variant="secondary"
            className="gap-2"
        >
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            بانتظار الإرسال
        </Badge>
    );
}

function ReminderDeliveryStats({
    total,
    sent,
    failed,
    pending,
}: {
    total: number;
    sent: number;
    failed: number;
    pending: number;
}) {
    // كل المستهدفين تم إرسال التذكير لهم
    if (sent >= total) {
        return (
            <span className="font-medium text-green-600">
                {sent.toLocaleString("ar-EG")} تم الإرسال
            </span>
        );
    }

    return (
        <div className="flex flex-col gap-1 text-sm whitespace-nowrap">

            {sent > 0 && (
                <span className="text-green-600">
                    {sent.toLocaleString("ar-EG")}
                </span>
            )}

            {failed > 0 && (
                <span className="text-red-600">
                    {failed.toLocaleString("ar-EG")} 
                </span>
            )}

            {pending > 0 && (
                <span className="text-orange-600">
                    {pending.toLocaleString("ar-EG")}
                </span>
            )}

        </div>
    );
}

export default function ReminderTable({
    reminders,
}: Props) {
    const [selectedReminder, setSelectedReminder] =
        useState<Reminder | null>(null);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [retryOpen, setRetryOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    if (reminders.length === 0) {
        return (
            <div className="rounded-xl border p-10 text-center">
                <p className="font-medium">
                    لا توجد تذكيرات حتى الآن
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    يمكنك إنشاء أول تذكير للمدعوين من زرار التذكير أعلى الصفحة
                </p>
            </div>
        );
    }

    async function handleDelete() {
        if (!selectedReminder) return;

        try {
            setLoading(true);

            const result =
                await deleteReminderAction(
                    selectedReminder.id
                );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            setDeleteOpen(false);
            setSelectedReminder(null);

        } catch {
            toast.error(
                "حدثت مشكلة أثناء حذف التذكير"
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleRetry() {
        if (!selectedReminder) return;

        try {
            setLoading(true);

            const result =
                await retryReminderAction(
                    selectedReminder.id
                );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            setRetryOpen(false);
            setSelectedReminder(null);

        } catch {
            toast.error(
                "حدثت مشكلة أثناء إعادة إرسال التذكير"
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <>

            <Table className="w-full">

                <TableHeader className="bg-muted/50">

                    <TableRow>

                        <TableHead className="p-4 text-right whitespace-nowrap">
                            المستهدفون
                        </TableHead>

                        <TableHead className="p-4 text-right">
                            المحتوى
                        </TableHead>

                        <TableHead className="p-4 text-right whitespace-nowrap">
                            طريقة الإرسال
                        </TableHead>

                        <TableHead className="p-4 text-right whitespace-nowrap">
                            الصورة
                        </TableHead>

                        <TableHead className="p-4 text-right whitespace-nowrap">
                            الحالة
                        </TableHead>

                        <TableHead className="p-4 text-right whitespace-nowrap">
                            عدد المرسل لهم
                        </TableHead>

                        <TableHead className="p-4 text-right whitespace-nowrap">
                            التاريخ
                        </TableHead>

                        <TableHead className="p-4 text-right">
                            الإجراءات
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {reminders.map(
                        (reminder) => {

                            const canRetry =
                                reminder.status ===
                                "failed";

                            const canDelete =
                                reminder.status !==
                                "sending";

                            return (
                                <TableRow
                                    key={reminder.id}
                                    className="border-t"
                                >

                                    {/* Target */}

                                    <TableCell className="p-4">

                                        <Badge variant="secondary">
                                            {
                                                targetLabels[
                                                reminder.target
                                                ]
                                            }
                                        </Badge>

                                    </TableCell>

                                    {/* Message */}

                                    <TableCell className="p-4 max-w-sm">

                                        <p className="truncate" title={reminder.message}>
                                            {
                                                reminder.message.slice(0, 40) + "..."
                                            }
                                        </p>

                                    </TableCell>

                                    {/* Content Type */}

                                    <TableCell className="p-4 whitespace-nowrap">

                                        {reminder.image
                                            ? "نص + صورة"
                                            : "نص فقط"}

                                    </TableCell>
                                    {/* Image */}
                                    <TableCell className="p-4 whitespace-nowrap">
                                        {reminder.image
                                            ? <>
                                                <Image
                                                    src={reminder.image}
                                                    alt={reminder.message}
                                                    loading="eager"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-xl border object-cover mx-auto lg:mx-0"
                                                />
                                            </>
                                            : "-"}
                                    </TableCell>

                                    {/* Status */}

                                    <TableCell className="p-4">

                                        <ReminderStatus
                                            status={
                                                reminder.status
                                            }
                                        />

                                    </TableCell>

                                    {/* Sent Count */}

                                    <TableCell className="p-4">

                                        {/* <span className="font-medium">
                                            {reminder.sent_count.toLocaleString(
                                                "ar-EG"
                                            )}
                                        </span> */}
                                        <TableCell className="p-4">
                                            <ReminderDeliveryStats
                                                total={
                                                    reminder.totalTargeted
                                                }
                                                sent={
                                                    reminder.sentCount
                                                }
                                                failed={
                                                    reminder.failedCount
                                                }
                                                pending={
                                                    reminder.pendingCount
                                                }
                                            />
                                        </TableCell>
                                    </TableCell>

                                    {/* Date */}

                                    <TableCell className="p-4 text-sm text-muted-foreground whitespace-nowrap">

                                        {new Date(
                                            reminder.created_at
                                        ).toLocaleDateString(
                                            "ar-EG"
                                        )}

                                    </TableCell>

                                    {/* Actions */}

                                    <TableCell className="p-4">

                                        <DropdownMenu>

                                            <DropdownMenuTrigger>
                                                <MoreHorizontal className="h-5 w-5" />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                            >

                                                {/* Retry */}

                                                {canRetry && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedReminder(
                                                                reminder
                                                            );

                                                            setRetryOpen(
                                                                true
                                                            );
                                                        }}
                                                    >

                                                        <RefreshCw className="ml-2 h-4 w-4" />

                                                        إعادة إرسال التذكير

                                                    </DropdownMenuItem>
                                                )}

                                                {/* Delete */}

                                                {canDelete && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                                        onClick={() => {
                                                            setSelectedReminder(
                                                                reminder
                                                            );

                                                            setDeleteOpen(
                                                                true
                                                            );
                                                        }}
                                                    >

                                                        <Trash2 className="ml-2 h-4 w-4" />

                                                        حذف التذكير

                                                    </DropdownMenuItem>
                                                )}

                                            </DropdownMenuContent>

                                        </DropdownMenu>

                                    </TableCell>

                                </TableRow>
                            );
                        }
                    )}

                </TableBody>

            </Table>


            {/* Delete Dialog */}

            <AppDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="حذف التذكير"
                description="هل أنت متأكد من حذف هذا التذكير؟ لا يمكن التراجع عن هذه العملية."
                confirmText={
                    loading
                        ? "جاري الحذف..."
                        : "حذف التذكير"
                }
                confirmVariant="destructive"
                onConfirm={handleDelete}
            />

            {/* Retry Dialog */}

            <AppDialog
                open={retryOpen}
                onOpenChange={setRetryOpen}
                title="إعادة إرسال التذكير"
                description="حدثت مشكلة أثناء إرسال هذا التذكير. هل تريد إعادة محاولة إرساله؟"
                confirmText={
                    loading
                        ? "جاري إعادة الإرسال..."
                        : "إعادة الإرسال"
                }
                onConfirm={handleRetry}
            />
        </>
    );
}