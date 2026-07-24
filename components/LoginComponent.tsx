"use client";

import { useState } from "react";
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
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const loginSchema = z.object({
    email: z
        .email("البريد الإلكتروني غير صحيح")
        .min(1, "البريد الإلكتروني مطلوب"),

    password: z
        .string()
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginComponent() {

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },

        mode: "onBlur",
    });

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const supabase = createClient();

    async function submit(values: LoginFormValues) {
        try {
            setLoading(true);

            const { error } =
                await supabase.auth.signInWithPassword({
                    email: values.email,
                    password: values.password,
                });

            if (error) {
                toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                return;
            }

            toast.success("تم تسجيل الدخول بنجاح");

            router.replace("/admin");
            router.refresh();

        } catch (error) {
            console.error(error);

            toast.error("حدث خطأ أثناء تسجيل الدخول");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>

                    <CardTitle>
                        اهلا بك، تسجيل الدخول
                    </CardTitle>

                    <CardDescription>
                        قم بتسجيل الدخول للوصول إلى لوحة التحكم.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form
                        id="login-form"
                        onSubmit={form.handleSubmit(submit)}
                    >

                        <FieldGroup>

                            {/* Email */}

                            <Controller
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (

                                    <Field
                                        data-invalid={fieldState.invalid}
                                    >

                                        <FieldLabel>
                                            البريد الإلكتروني
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            disabled={loading}
                                            type="email"
                                            dir="rtl"
                                            placeholder="admin@example.com"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}

                                    </Field>

                                )}
                            />

                            {/* Password */}

                            <Controller
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (

                                    <Field
                                        data-invalid={fieldState.invalid}
                                    >

                                        <FieldLabel>
                                            كلمة المرور
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            disabled={loading}
                                            type="password"
                                            dir="rtl"
                                            placeholder="********"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}

                                    </Field>

                                )}
                            />

                        </FieldGroup>

                    </form>

                </CardContent>

                <CardFooter>

                    <Button
                        className="w-full"
                        type="submit"
                        form="login-form"
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <Spinner />
                                جارٍ تسجيل الدخول...
                            </>
                        ) : (
                            "تسجيل الدخول"
                        )}

                    </Button>

                </CardFooter>
            </Card>
        </div>
    );
}