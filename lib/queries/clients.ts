import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getClients = cache(async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) throw new Error(error.message);

    return data;
});

export const getClientById = cache(
    async (id: string) => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("clients")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);

        return data;
    }
);