"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ReminderTarget =
    | "all"
    | "attending"
    | "declined"
    | "pending";

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

    const { data, error } = await supabase
        .from("reminders")
        .insert({
            event_id: values.eventId,
            target: values.target,
            message: values.message,
            image: values.image ?? null,
        })
        .select()
        .single();

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    /*
     * هنا بعد حفظ التذكير
     * تستدعي n8n
     *
     * مثال:
     *
     * await fetch(process.env.N8N_REMINDER_WEBHOOK_URL!, {
     *     method: "POST",
     *     headers: {
     *         "Content-Type": "application/json",
     *     },
     *     body: JSON.stringify({
     *         reminder_id: data.id,
     *         event_id: values.eventId,
     *         target: values.target,
     *         message: values.message,
     *         image: values.image ?? null,
     *     }),
     * });
     */

    revalidatePath(
        `/admin/clients`
    );

    return {
        success: true,
        message: "تم إنشاء التذكير بنجاح",
        data,
    };
}


export async function getRemindersByEvent(
    eventId: string
) {
    const supabase = await createClient();

    const {
        data,
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

    return data;
}