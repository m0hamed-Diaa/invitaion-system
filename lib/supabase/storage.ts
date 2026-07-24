"use server";

import { createClient } from "./server";


export async function uploadFile(
    file: File,
    folder: "images" | "excel" | "reminders"
) {
    const supabase = await createClient();

    const extension =
        file.name.split(".").pop();

    const fileName =
        `${crypto.randomUUID()}.${extension}`;

    const path =
        `${folder}/${fileName}`;

    const { error } =
        await supabase.storage
            .from("invitations")
            .upload(path, file, {
                upsert: false,
            });
    if (error)
        throw error;

    const {
        data: { publicUrl },
    } =
        supabase.storage
            .from("invitations")
            .getPublicUrl(path);

    return publicUrl;
}

export async function deleteFile(url: string) {

    const supabase =
        await createClient();

    const path =
        url.split("/object/public/invitations/")[1];

    await supabase.storage
        .from("invitations")
        .remove([path]);
}