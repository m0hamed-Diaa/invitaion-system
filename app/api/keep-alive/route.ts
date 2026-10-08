import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const { error } = await supabase
        .from("guests")
        .select("id")
        .limit(1);

    if (error) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

    return Response.json({ success: true });
}