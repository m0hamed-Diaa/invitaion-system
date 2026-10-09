"use server";

import { createClient } from "@/lib/supabase/server";



export async function getEventByClient(
    clientId: string
) {
    const supabase = await createClient();

    const {
        data: event,
        error,
    } = await supabase
        .from("events")
        .select(`
            id,
            title,
            client_id
        `)
        .eq(
            "client_id",
            clientId
        )
        .maybeSingle();

    if (error) {
        return {
            success: false,
            message:
                "حدث خطأ أثناء جلب المناسبة",
            event: null,
        };
    }

    if (!event) {
        return {
            success: false,
            message:
                "لا توجد مناسبة لهذا العميل",
            event: null,
        };
    }

    return {
        success: true,
        message: "",
        event,
    };
}

export async function checkInGuest(
    eventId: string,
    guestCode: number,
    method: "qr" | "manual"
) {
    const supabase = await createClient();

    if (!eventId) {
        return {
            success: false,
            reason: "invalid_event",
            message:
                "المناسبة غير محددة",
        };
    }

    if (
        !Number.isInteger(
            guestCode
        ) ||
        guestCode <= 0
    ) {
        return {
            success: false,
            reason: "invalid_code",
            message:
                "كود المدعو غير صحيح",
        };
    }


    const {
        data: guest,
        error: guestError,
    } = await supabase
        .from("guests")
        .select(`
            id,
            guest_code,
            name,
            phone,
            status,
            attend_confirmation,
            confirmed_at,
            scanned_at,
            method
        `)
        .eq(
            "event_id",
            eventId
        )
        .eq(
            "guest_code",
            guestCode
        )
        .maybeSingle();


    if (guestError) {

        return {
            success: false,
            reason: "database_error",
            message:
                "حدث خطأ أثناء البحث عن المدعو",
        };
    }
    if (!guest) {

        return {
            success: false,
            reason: "not_found",
            message:
                "هذا الكود غير موجود في هذه المناسبة",
        };
    }

    if (
        guest.attend_confirmation === true
    ) {

        return {
            success: false,
            reason: "already_checked_in",
            message:
                "تم تسجيل حضور هذا المدعو بالفعل",
            guest: {
                id: guest.id,
                guest_code: guest.guest_code,
                name: guest.name,
                phone: guest.phone,
                status: guest.status,
                attend_confirmation: guest.attend_confirmation,
                confirmed_at: guest.confirmed_at,
                scanned_at: guest.scanned_at,
                method: guest.method,
            }
        };
    }

    const now =
        new Date().toISOString();


    const {
        data: updatedGuest,
        error: updateError,
    } = await supabase
        .from("guests")
        .update({
            attend_confirmation:
                true,

            confirmed_at:
                now,

            scanned_at:
                now,

            method:
                method,

            status:
                "attending",

            updated_at:
                now,
        })
        .eq(
            "id",
            guest.id
        )
        .eq(
            "event_id",
            eventId
        )
        .eq(
            "attend_confirmation",
            false
        )
        .select(`
            id,
            guest_code,
            name,
            phone,
            status,
            attend_confirmation,
            confirmed_at,
            scanned_at,
            method
        `)
        .maybeSingle();


    if (updateError) {
        return {
            success: false,
            reason: "database_error",
            message:
                "حدث خطأ أثناء تسجيل الحضور",
        };
    }
    if (!updatedGuest) {

        return {
            success: false,
            reason: "already_checked_in",
            message:
                "تم تسجيل حضور هذا المدعو بالفعل",
        };
    }

    return {
        success: true,
        reason: "checked_in",
        message:
            "تم تسجيل حضور المدعو بنجاح",

        guest: updatedGuest,
    };
}