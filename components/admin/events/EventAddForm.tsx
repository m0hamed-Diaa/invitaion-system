"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";

import {
    eventSchema,
} from "@/lib/validation/event.scheme";

export type EventFormValues =
    z.infer<typeof eventSchema>;

interface ActionResult {
    success: boolean;
    message: string;
    data?: unknown;
}

interface EventFormProps {
    defaultValues?: Partial<EventFormValues>;

    submitText?: string;

    successMessage?: string;

    onSubmit: (
        values: EventFormValues
    ) => Promise<ActionResult>;
    clientIdFromSearchParams: string | undefined;
}

export default function EventForm({
    submitText = "حفظ",
    successMessage = "تم الحفظ بنجاح",
    onSubmit,
    clientIdFromSearchParams
}: EventFormProps) {
    const router = useRouter();

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),

        defaultValues: {
            client_id: clientIdFromSearchParams,
            title: "",
            invitation_message: "",
        },
    });

    const [loading, setLoading] =
        React.useState(false);
    React.useEffect(() => {
        if (clientIdFromSearchParams) {
            form.setValue(
                "client_id",
                clientIdFromSearchParams
            );
        } else {
            toast.error("يجب ان تختار عميل اولا!");
        }
    }, [form, clientIdFromSearchParams]);
    async function submit(values: EventFormValues) {
        if (!clientIdFromSearchParams) {
            toast.error("يجب ان تختار عميل اولا!");
            return;
        }
        try {
            setLoading(true);

            await onSubmit(values);

            toast.success(successMessage);

            form.reset();

            router.push("/admin/events");
        } catch {
            toast.error("حدث خطأ");
        } finally {
            setLoading(false);
        }
    }

    return (

        <Card className="w-full max-w-xl">
            {!clientIdFromSearchParams && (<h1 className="text-destructive font-bold mr-4">ضيف عميل للمناسبة اولا من اعلى الصفحة</h1>)}

            <CardHeader>

                <CardTitle>
                    بيانات المناسبة
                </CardTitle>

                <CardDescription>

                    أدخل بيانات المناسبة الأساسية.

                </CardDescription>

            </CardHeader>

            <CardContent>
                <form
                    id="event-form"
                    onSubmit={form.handleSubmit(submit)}
                >
                    <FieldGroup>

                        {/* عنوان المناسبة */}
                        <Controller
                            control={form.control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>عنوان المناسبة</FieldLabel>

                                    <Input
                                        {...field}
                                        dir="rtl"
                                        placeholder="مثال: حفل زفاف محمد و هنا"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* رسالة الدعوة */}

                        < Controller
                            control={form.control}
                            name="invitation_message"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>رسالة الدعوة</FieldLabel>

                                    <textarea
                                        {...field}
                                        dir="rtl"
                                        rows={6}
                                        placeholder="اكتب رسالة الدعوة..."
                                        className="w-full rounded-md border px-3 py-2"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* صورة الدعوة */}


                        <Controller
                            control={form.control}
                            name="invitation_image"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>صورة الدعوة</FieldLabel>

                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.files?.[0] ?? null
                                            )
                                        }
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* ملف المدعوين */}

                        <Controller
                            control={form.control}
                            name="guests_excel"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>ملف Excel</FieldLabel>

                                    <Input
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.files?.[0] ?? null
                                            )
                                        }
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="justify-end">
                <Button
                    type="submit"
                    form="event-form"
                    disabled={loading}
                >
                    {
                        loading
                            ? <>
                                <Spinner />
                                جارى الحفظ...
                            </>
                            : submitText
                    }
                </Button>
            </CardFooter>
        </Card>
    );
}