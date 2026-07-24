import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
    const supabase = await createClient();

    const [
        clientsResult,
        eventsResult,
        guestsResult,
        attendingResult,
        pendingResult,
        declinedResult,
    ] = await Promise.all([
        supabase
            .from("clients")
            .select("id", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("events")
            .select("id", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("guests")
            .select("id", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("guests")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("status", "attending"),

        supabase
            .from("guests")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("status", "pending"),

        supabase
            .from("guests")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("status", "declined"),
    ]);

    if (clientsResult.error) {
        throw clientsResult.error;
    }

    if (eventsResult.error) {
        throw eventsResult.error;
    }

    if (guestsResult.error) {
        throw guestsResult.error;
    }

    if (attendingResult.error) {
        throw attendingResult.error;
    }

    if (pendingResult.error) {
        throw pendingResult.error;
    }

    if (declinedResult.error) {
        throw declinedResult.error;
    }

    return {
        clients: clientsResult.count ?? 0,

        events: eventsResult.count ?? 0,

        guests: guestsResult.count ?? 0,

        attending: attendingResult.count ?? 0,

        pending: pendingResult.count ?? 0,

        declined: declinedResult.count ?? 0,
    };
}