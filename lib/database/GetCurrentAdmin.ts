import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCurrentAdmin = cache(async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;

    return {
        id: user.id,
        email: user.email,
        initial: user.email.charAt(0).toUpperCase(),
    };
});