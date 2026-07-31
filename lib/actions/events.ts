"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { importGuests } from "../excel/importQuests";
import { createGuestsAction } from "./quests";
import { uploadFile } from "../supabase/storage";
import { EventFormValues } from "../validation/event.scheme";

interface GetEventsProps {
    page?: number;
    limit?: number;
    search?: string;
    sort?: "asc" | "desc";
}

export async function getEvents({
    page = 1,
    limit = 10,
    search = "",
    sort = "desc",
}: GetEventsProps = {}) {

    const supabase = await createClient();

    let query = supabase
        .from("events")
        .select(
            `
            *,
            clients(
                id,
                name,
                phone
            )
            `,
            {
                count: "exact",
            }
        );

    if (search) {
        query = query.or(`
            title.ilike.%${search}%,
            invitation_message.ilike.%${search}%
        `);
    }

    query = query.order("created_at", {
        ascending: sort === "asc",
    });

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } =
        await query.range(from, to);

    if (error) throw error;

    return {
        data,
        total: count ?? 0,
        totalPages: Math.max(
            1,
            Math.ceil((count ?? 0) / limit)
        ),
    };
}

export async function getEventById(id: string) {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("events")
        .select(
            `
            *,
            clients(
                id,
                name,
                phone
            )
            `
        )
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

export async function createEventAction(
    values: EventFormValues
) {
    const supabase = await createClient();

    try {
        const guests = await importGuests(
            values.guests_excel
        );

        const imageUrl = await uploadFile(
            values.invitation_image,
            "images"
        );

        const excelUrl = await uploadFile(
            values.guests_excel,
            "excel"
        );

        const {
            data: event,
            error,
        } = await supabase
            .from("events")
            .insert({
                client_id:
                    values.client_id,

                title:
                    values.title,

                invitation_message:
                    values.invitation_message,

                invitation_image:
                    imageUrl,

                guests_excel:
                    excelUrl,
            })
            .select()
            .single();

        if (error || !event) {
            console.error(
                "Create event error:",
                error
            );

            throw new Error(
                "فشل في إنشاء المناسبة"
            );
        }

        await createGuestsAction(
            event.id,
            guests
        );

        revalidatePath(
            "/admin/events"
        );

        try {
            const webhookUrl =
                process.env
                    .N8N_SEND_INVITATIONS_WEBHOOK;

            const webhookSecret =
                process.env
                    .N8N_WEBHOOK_SECRET;

            if (
                !webhookUrl ||
                !webhookSecret
            ) {
                console.error(
                    "Missing n8n environment variables"
                );

                return {
                    success: true,

                    eventCreated: true,

                    n8nSuccess: false,

                    message:
                        "تم إنشاء المناسبة بنجاح، ولكن لم يتم بدء إرسال الدعوات",

                    data: event,
                };
            }

            const response =
                await fetch(
                    webhookUrl,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "x-api-key":
                                webhookSecret,
                        },

                        body: JSON.stringify(
                            {
                                event_id:
                                    event.id,
                            }
                        ),

                        cache:
                            "no-store",
                    }
                );

            if (
                !response.ok
            ) {
                const errorText =
                    await response.text();

                console.error(
                    "n8n Error:",
                    {
                        status:
                            response.status,

                        statusText:
                            response.statusText,

                        body:
                            errorText,
                    }
                );

                return {
                    success: true,

                    eventCreated: true,

                    n8nSuccess: false,

                    message:
                        "تم إنشاء المناسبة بنجاح، ولكن لم يتم بدء إرسال الدعوات",

                    data: event,
                };
            }

            return {
                success: true,

                eventCreated: true,

                n8nSuccess: true,

                message:
                    "تم إنشاء المناسبة وبدأ إرسال الدعوات",

                data: event,
            };

        } catch (n8nError) {
            console.error(
                "n8n connection error:",
                n8nError
            );

            return {
                success: true,

                eventCreated: true,

                n8nSuccess: false,

                message:
                    "تم إنشاء المناسبة بنجاح، ولكن لم يتم بدء إرسال الدعوات",

                data: event,
            };
        }

    } catch (error) {

        console.error(
            "Create event error:",
            error
        );

        throw new Error(
            "حدث خطأ أثناء إنشاء المناسبة"
        );
    }
}

export async function updateEventAction(
    id: string,
    values: EventFormValues
) {

    const supabase = await createClient();

    const { error } = await supabase
        .from("events")
        .update(values)
        .eq("id", id);

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    revalidatePath("/admin/events");

    return {
        success: true,
        message: "تم تعديل المناسبة",
    };
}

export async function deleteEventAction(
    id: string
) {

    const supabase = await createClient();

    const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    revalidatePath("/admin/events");

    return {
        success: true,
        message: "تم حذف المناسبة",
    };
}

export async function getEventByClient(clientId: string) {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("client_id", clientId)
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function getInvitationStats(
    eventId: string
) {
    const supabase = await createClient();

    const { count: sent } = await supabase
        .from("guests")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("event_id", eventId)
        .eq("invitation_sent", true);

    const { count: failed } = await supabase
        .from("guests")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("event_id", eventId)
        .eq("invitation_sent", false);

    return {
        sent: sent ?? 0,
        failed: failed ?? 0,
    };
}


export async function resendInvitationsAction(
    eventId: string
) {
    try {
        const webhookUrl =
            process.env.N8N_SEND_INVITATIONS_WEBHOOK;

        const webhookSecret =
            process.env.N8N_WEBHOOK_SECRET;

        if (!webhookUrl || !webhookSecret) {
            console.error(
                "Missing n8n environment variables"
            );

            return {
                success: false,
                message:
                    "إعدادات نظام الإرسال غير مكتملة",
            };
        }

        const response = await fetch(
            webhookUrl,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "x-api-key":
                        webhookSecret,
                },

                body: JSON.stringify({
                    event_id: eventId,
                }),

                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errorText =
                await response.text();

            console.error(
                "n8n Error:",
                response.status,
                errorText
            );

            return {
                success: false,
                message:
                    "فشل في إعادة إرسال الدعوات",
            };
        }

        return {
            success: true,
            message:
                "تم بدء إعادة إرسال الدعوات غير المرسلة",
        };

    } catch (error) {

        console.error(
            "Resend invitations error:",
            error
        );

        return {
            success: false,
            message:
                "حدث خطأ أثناء الاتصال بنظام الإرسال",
        };
    }
}