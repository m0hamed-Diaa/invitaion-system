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
import { clientSchema } from "@/lib/validation/client.schema";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ClientFormValues =
    z.infer<typeof clientSchema>;

interface ClientFormProps {
    defaultValues?: ClientFormValues;
    submitText?: string;
    successMessage?: string;

    onSubmit: (
        values: ClientFormValues
    ) => Promise<void> | void;
}

export default function EventAddForm({
    defaultValues,
    submitText = "حفظ",
    successMessage = "تم الحفظ بنجاح",
    onSubmit,
}: ClientFormProps) {
    const router = useRouter();

    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),

        defaultValues: defaultValues ?? {
            name: "",
            phone: "",
            expected_guests: 1,
        },
    });

    const [loading, setLoading] =
        React.useState(false);

    async function submit(values: ClientFormValues) {
        try {
            setLoading(true);

            await onSubmit(values);

            toast.success(successMessage);

            form.reset();
            router.push("/admin/clients");
        } catch {
            toast.error("حدث خطأ، حاول مرة أخرى.");
        } finally {
            setLoading(false);
        }
    }

    return (

        <Card className="w-full max-w-xl">

            <CardHeader>

                <CardTitle>
                    بيانات العميل
                </CardTitle>

                <CardDescription>

                    أدخل بيانات العميل الأساسية.

                </CardDescription>

            </CardHeader>

            <CardContent>

                <form
                    id="client-form"
                    onSubmit={form.handleSubmit(submit)}
                >

                    <FieldGroup>

                        {/* Name */}

                        <Controller

                            control={form.control}

                            name="name"

                            render={({ field, fieldState }) => (

                                <Field
                                    data-invalid={
                                        fieldState.invalid
                                    }
                                >

                                    <FieldLabel>

                                        اسم العميل

                                    </FieldLabel>

                                    <Input

                                        {...field}

                                        dir="rtl"

                                        placeholder="اسم العميل..."

                                    />

                                    {

                                        fieldState.invalid && (

                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
                                            />

                                        )

                                    }

                                </Field>
                            )}
                        />

                        {/* Phone */}
                        <Controller
                            control={form.control}

                            name="phone"

                            render={({ field, fieldState }) => (

                                <Field
                                    data-invalid={
                                        fieldState.invalid
                                    }
                                >

                                    <FieldLabel>

                                        رقم الهاتف

                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        dir="rtl"
                                        placeholder="+96550000000"
                                    />

                                    {

                                        fieldState.invalid && (

                                            <FieldError
                                                errors={[
                                                    fieldState.error,
                                                ]}
                                            />

                                        )

                                    }

                                </Field>

                            )}
                        />
                        {/* Quest  */}
                        <Controller
                            control={form.control}
                            name="expected_guests"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>عدد المدعوين للمناسبة</FieldLabel>

                                    <Input
                                        type="number"
                                        placeholder="250"
                                        value={field.value ?? 1}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
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

                    form="client-form"

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