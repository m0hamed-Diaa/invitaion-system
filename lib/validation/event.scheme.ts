import { z } from "zod";

export const eventSchema = z.object({
    client_id: z
        .string()
        .uuid("يجب اختيار عميل"),

    title: z
        .string()
        .trim()
        .min(3, "اسم المناسبة مطلوب"),

    invitation_message: z
        .string()
        .trim()
        .min(5, "اكتب رسالة الدعوة"),

    invitation_image: z.instanceof(File, {
        message: "اختر صورة الدعوة",
    }),

    guests_excel: z.instanceof(File, {
        message: "اختر ملف Excel",
    }),
});

export type EventFormValues = z.infer<typeof eventSchema>;