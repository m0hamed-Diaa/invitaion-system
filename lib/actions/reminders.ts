"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getStoragePath } from "../supabase/getStoragePath";

export type ReminderTarget =
    | "all"
    | "attending"
    | "declined";

export type ReminderContentType =
    | "text"
    | "image";

interface CreateReminderInput {
    eventId: string;
    target: ReminderTarget;
    contentType: ReminderContentType;
    message: string;
    image?: string | null;
}


export async function createReminderAction(
    values: CreateReminderInput
) {
    const supabase = await createClient();

    if (!values.message.trim()) {
        return {
            success: false,
            message: "اكتب نص التذكير",
        };
    }

    if (
        values.contentType === "image" &&
        !values.image
    ) {
        return {
            success: false,
            message: "يجب رفع صورة التذكير",
        };
    }

    const {
        data: reminder,
        error: reminderError,
    } = await supabase
        .from("reminders")
        .insert({
            event_id: values.eventId,
            target: values.target,
            message: values.message.trim(),
            image: values.image ?? null,
            status: "pending",
            sent_count: 0,
        })
        .select()
        .single();


    if (
        reminderError ||
        !reminder
    ) {
        console.error(
            "Create reminder DB error:",
            reminderError
        );

        return {
            success: false,
            message:
                "حدثت مشكلة أثناء تسجيل التذكير في قاعدة البيانات. لم يتم بدء الإرسال.",
        };
    }

    try {

        const n8nUrl =
            process.env
                .N8N_SEND_REMINDER_WEBHOOK;

        const webhookSecret =
            process.env
                .N8N_WEBHOOK_SECRET;

        if (
            !n8nUrl ||
            !webhookSecret
        ) {
            throw new Error(
                "n8n environment variables are missing"
            );
        }

        const response =
            await fetch(
                n8nUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "x-api-key":
                            webhookSecret,
                    },

                    body: JSON.stringify({
                        reminder_id:
                            reminder.id,

                        event_id:
                            reminder.event_id,
                        action: "send"
                    }),

                    cache: "no-store",
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                `n8n returned ${response.status}: ${errorText}`
            );
        }

        await supabase
            .from("reminders")
            .update({
                status: "sending",
            })
            .eq(
                "id",
                reminder.id
            );

        revalidatePath(
            "/admin/clients"
        );

        return {
            success: true,
            message:
                "تم تسجيل التذكير وبدء الإرسال",
            data: reminder,
        };

    } catch (error) {

        console.error(
            "n8n reminder webhook error:",
            error
        );

        const {
            error: updateError,
        } = await supabase
            .from("reminders")
            .update({
                status: "failed",
            })
            .eq(
                "id",
                reminder.id
            );

        revalidatePath(
            "/admin/clients"
        );

        if (updateError) {

            console.error(
                "Failed to update reminder status:",
                updateError
            );

            return {
                success: false,
                message:
                    "تم تسجيل التذكير، ولكن حدثت مشكلة أثناء الاتصال بـ n8n ولم نتمكن من تحديث حالة التذكير. راجع التذكير في القائمة.",
                data: reminder,
            };
        }

        return {
            success: false,

            message:
                "تم تسجيل التذكير ولكن تعذر بدء الإرسال. يمكنك إعادة إرسال التذكير من قائمة التذكيرات.",

            data: reminder,
        };
    }
}

export async function getRemindersByEvent(
    eventId: string
) {
    const supabase = await createClient();

    const {
        data: reminders,
        error,
    } = await supabase
        .from("reminders")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw error;
    }

    if (!reminders || reminders.length === 0) {
        return [];
    }

    const remindersWithStats =
        await Promise.all(
            reminders.map(
                async (reminder) => {
                    let guestsQuery =
                        supabase
                            .from("guests")
                            .select("id", {
                                count: "exact",
                                head: true,
                            })
                            .eq(
                                "event_id",
                                reminder.event_id
                            );

                    if (
                        reminder.target ===
                        "attending"
                    ) {
                        guestsQuery =
                            guestsQuery.eq(
                                "status",
                                "attending"
                            );
                    }

                    if (
                        reminder.target ===
                        "declined"
                    ) {
                        guestsQuery =
                            guestsQuery.eq(
                                "status",
                                "declined"
                            );
                    }

                    const {
                        count: totalTargeted,
                        error:
                        guestsError,
                    } = await guestsQuery;

                    if (guestsError) {
                        throw guestsError;
                    }

                    const total =
                        totalTargeted ?? 0;

                    const sent =
                        reminder.sent_count ?? 0;

                    const remaining =
                        Math.max(
                            total - sent,
                            0
                        );

                    let failed = 0;
                    let pending = 0;

                    if (
                        reminder.status ===
                        "sending"
                    ) {
                        pending =
                            remaining;
                    }

                    else if (
                        reminder.status ===
                        "failed"
                    ) {
                        failed =
                            remaining;
                    }

                    return {
                        ...reminder,

                        totalTargeted:
                            total,

                        sentCount:
                            sent,

                        failedCount:
                            failed,

                        pendingCount:
                            pending,
                    };
                }
            )
        );

    return remindersWithStats;
}

export async function retryReminderAction(
    reminderId: string
) {
    const supabase = await createClient();

    const {
        data: reminder,
        error,
    } = await supabase
        .from("reminders")
        .select(
            "id, event_id, status"
        )
        .eq("id", reminderId)
        .single();

    if (error || !reminder) {
        return {
            success: false,
            message:
                "لم يتم العثور على التذكير",
        };
    }

    if (
        reminder.status === "completed"
    ) {
        return {
            success: false,
            message:
                "تم إرسال هذا التذكير بالفعل",
        };
    }

    try {

        const response = await fetch(
            process.env
                .N8N_SEND_REMINDER_WEBHOOK!,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "x-api-key":
                        process.env
                            .N8N_WEBHOOK_SECRET!,
                },

                body: JSON.stringify({
                    reminder_id:
                        reminder.id,

                    event_id:
                        reminder.event_id,
                    action: "retry"
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                "n8n request failed"
            );
        }

        await supabase
            .from("reminders")
            .update({
                status: "sending",
            })
            .eq(
                "id",
                reminder.id
            );

        revalidatePath(
            "/admin/clients"
        );

        return {
            success: true,
            message:
                "تمت إعادة إرسال التذكير إلى n8n",
        };

    } catch (error) {

        console.error(
            "Retry reminder error:",
            error
        );

        // يفضل أن يظل Failed
        await supabase
            .from("reminders")
            .update({
                status: "failed",
            })
            .eq(
                "id",
                reminder.id
            );

        revalidatePath(
            "/admin/clients"
        );

        return {
            success: false,
            message:
                "حدثت مشكلة، حاول مرة أخرى لاحقًا",
        };
    }
}

export async function deleteReminderAction(
    reminderId: string
) {
    const supabase = await createClient();

    try {
        const {
            data: reminder,
            error: reminderError,
        } = await supabase
            .from("reminders")
            .select("id, image")
            .eq("id", reminderId)
            .maybeSingle();

        if (reminderError) {
            throw reminderError;
        }

        if (!reminder) {
            return {
                success: false,
                message:
                    "التذكير غير موجود أو تم حذفه بالفعل",
            };
        }

        const path = reminder.image
            ? getStoragePath(
                reminder.image
            )
            : null;

        if (path) {
            const {
                error: storageError,
            } = await supabase
                .storage
                .from("invitations")
                .remove([path]);

            if (storageError) {
                throw storageError;
            }
        }

        const {
            error: deleteError,
        } = await supabase
            .from("reminders")
            .delete()
            .eq(
                "id",
                reminderId
            );

        if (deleteError) {
            throw deleteError;
        }

        revalidatePath(
            "/admin/clients"
        );

        return {
            success: true,
            message:
                "تم حذف التذكير والصورة بنجاح",
        };

    } catch (error) {

        console.error(
            "Delete Reminder Error:",
            error
        );

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "حدث خطأ أثناء حذف التذكير",
        };
    }
}

export async function getReminderTargetCount(
    eventId: string,
    target: "all" | "attending" | "declined"
) {
    const supabase = await createClient();

    let query = supabase
        .from("guests")
        .select("id", {
            count: "exact",
            head: true,
        })
        .eq("event_id", eventId);

    if (target === "attending") {
        query = query.eq(
            "status",
            "attending"
        );
    }

    if (target === "declined") {
        query = query.eq(
            "status",
            "declined"
        );
    }

    const {
        count,
        error,
    } = await query;

    if (error) {
        throw error;
    }

    return count ?? 0;
}