import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().trim().min(3, "الاسم مطلوب"),

    phone: z.string().trim().min(8, "رقم الهاتف غير صحيح"),

    expected_guests: z.number().min(1, "عدد المدعون يجب ان يكون اكبر من 0"),

});