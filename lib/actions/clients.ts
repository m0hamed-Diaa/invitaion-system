"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ClientFormValues } from "@/components/admin/clients/ClientAddForm";
import { getStoragePath } from "../supabase/getStoragePath";

interface GetClientsProps {
    page?: number;
    limit?: number;
    search?: string;
    sort?: "asc" | "desc";
}

export async function getClients({
    page = 1,
    limit = 10,
    search = "",
    sort = "desc",
}: GetClientsProps = {}) {
    const supabase = await createClient();

    let query = supabase
        .from("clients")
        .select("*", { count: "exact" });

    if (search) {
        query = query.or(
            `name.ilike.%${search}%,phone.ilike.%${search}%`
        );
    }

    query = query.order("created_at", {
        ascending: sort === "asc",
    });

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

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

export async function getClientById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function createClientAction(values: ClientFormValues) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("clients")
        .insert(values)
        .select()
        .single();

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    revalidatePath("/admin/clients");

    return {
        success: true,
        message: "تم إضافة العميل بنجاح",
        data,
    };
}

export async function updateClientAction(
    id: string,
    values: ClientFormValues
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("clients")
        .update(values)
        .eq("id", id);

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    revalidatePath("/admin/clients");

    return {
        success: true,
        message: "تم تعديل العميل بنجاح",
    };
}



export async function deleteClientAction(
    clientId: string
) {
    const supabase = await createClient();

    try {
        const {
            data: event,
            error: eventError,
        } = await supabase
            .from("events")
            .select(
                "id, invitation_image, guests_excel"
            )
            .eq("client_id", clientId)
            .maybeSingle();

        if (eventError) {
            throw eventError;
        }


        let reminderImages: string[] = [];

        if (event) {

            const {
                data: reminders,
                error: remindersError,
            } = await supabase
                .from("reminders")
                .select("image")
                .eq("event_id", event.id)
                .not("image", "is", null);

            if (remindersError) {
                throw remindersError;
            }

            reminderImages =
                reminders
                    ?.map(
                        reminder => reminder.image
                    )
                    .filter(
                        Boolean
                    ) ?? [];
        }

        const files = [
            event?.invitation_image,
            event?.guests_excel,
            ...reminderImages,
        ].filter(
            (file): file is string =>
                Boolean(file)
        );

        const paths = files
            .map(getStoragePath)
            .filter(
                (path): path is string =>
                    Boolean(path)
            );

        if (paths.length > 0) {

            const {
                error: storageError,
            } = await supabase
                .storage
                .from("invitations")
                .remove(paths);

            if (storageError) {
                throw storageError;
            }
        }

        const {
            error: deleteError,
        } = await supabase
            .from("clients")
            .delete()
            .eq("id", clientId);

        if (deleteError) {
            throw deleteError;
        }
        
        revalidatePath("/admin/clients");
        revalidatePath("/admin/events");


        return {
            success: true,
            message:
                "تم حذف العميل وجميع البيانات المرتبطة به بنجاح",
        };

    } catch (error) {

        console.error(
            "Delete Client Error:",
            error
        );

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "حدث خطأ أثناء حذف العميل",
        };
    }
}