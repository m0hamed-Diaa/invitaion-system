import { eventSchema } from "@/lib/validation/event.scheme";
import { z } from "zod";

export type EventFormValues =
    z.infer<typeof eventSchema>;