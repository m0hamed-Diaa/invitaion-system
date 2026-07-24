"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateGuestCode } from "../utils/generateGuestCode";

interface ExcelGuest {
    name: string;
    phone: string;
}

export async function createGuestsAction(
    eventId: string,
    guests: ExcelGuest[]
) {
    const supabase = await createClient();

    const payload = [];

    for (const guest of guests) {

        let guestCode: number;

        while (true) {

            guestCode = generateGuestCode();

            const { data } = await supabase
                .from("guests")
                .select("id")
                .eq("guest_code", guestCode)
                .maybeSingle();

            if (!data) {
                break;
            }
        }

        payload.push({

            event_id: eventId,

            guest_code: guestCode,

            name: guest.name,

            phone: guest.phone,

            status: "pending",

            qr_code: null,

            invitation_sent: false,

            scanned_at: null,

        });
    }

    const { error } = await supabase
        .from("guests")
        .insert(payload);

    if (error) {
        throw error;
    }
}

interface GetGuestsProps {
    eventId: string;
    page?: number;
    limit?: number;
    search?: string;
    sort?: "asc" | "desc";
    status?: "all" | "pending" | "attending" | "declined";
}

export async function getGuestsByEvent({
    eventId,
    page = 1,
    limit = 10,
    search = "",
    sort = "desc",
    status = "all",
}: GetGuestsProps) {

    const supabase = await createClient();

    let query = supabase
        .from("guests")
        .select("*", {
            count: "exact",
        })
        .eq("event_id", eventId);

    if (status !== "all") {
        query = query.eq("status", status);
    }

    if (search.trim()) {
        const value = search.trim();

        const filters = [
            `name.ilike.%${value}%`,
            `phone.ilike.%${value}%`,
        ];

        // البحث بالكود إذا كان رقمًا
        if (/^\d{2,}$/.test(value)) {
            filters.push(
                `guest_code.eq.${Number(value)}`
            );
        }

        query = query.or(
            filters.join(",")
        );
    }

    query = query.order("created_at", {
        ascending: sort === "asc",
    });

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const {
        data,
        error,
        count,
    } = await query.range(from, to);

    if (error) {
        throw error;
    }

    const total = count ?? 0;

    return {
        data: data ?? [],
        total,
        totalPages: Math.max(
            1,
            Math.ceil(total / limit)
        ),
    };
}

export async function getGuestById(
    id: string
) {
    const supabase =
        await createClient();

    const { data, error } =
        await supabase
            .from("guests")
            .select("*")
            .eq("id", id)
            .single();

    if (error)
        throw error;

    return data;
}


type GuestStatus =
    | "pending"
    | "attending"
    | "declined";

export async function updateGuestAction(
    id: string,
    values: {
        name: string;
        phone: string;
    }
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("guests")
        .update({
            name: values.name,
            phone: values.phone,
        })
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
        message: "تم تعديل بيانات المدعو بنجاح",
    };
}


export async function deleteGuestAction(
    id: string
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("guests")
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
        message: "تم حذف المدعو بنجاح",
    };
}


export async function updateGuestStatus(
    id: string,
    status: GuestStatus
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("guests")
        .update({
            status,
        })
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
        message: "تم تعديل حالة المدعو بنجاح",
    };
}


export async function getGuestStatsByEvent(eventId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("guests")
        .select("status")
        .eq("event_id", eventId);

    if (error) {
        throw error;
    }

    const total = data.length;

    const pending = data.filter(
        (guest) => guest.status === "pending"
    ).length;

    const attending = data.filter(
        (guest) => guest.status === "attending"
    ).length;

    const declined = data.filter(
        (guest) => guest.status === "declined"
    ).length;

    return {
        total,
        pending,
        attending,
        declined,
    };
}