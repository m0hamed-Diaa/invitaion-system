"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import {
    createReminderAction,
} from "@/lib/actions/reminders";
import AppDialog from "@/components/shared/DialogDemo";
import { uploadFile } from "@/lib/supabase/storage";

interface Props {
    eventId: string;

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;
}

export default function ReminderDialog({
    eventId,
    open,
    onOpenChange,
}: Props) {

    const [
        target,
        setTarget,
    ] = useState<
        "all"
        | "attending"
        | "declined"
    >("all");

    const [
        contentType,
        setContentType,
    ] = useState<
        "text"
        | "image"
    >("text");

    const [
        message,
        setMessage,
    ] = useState("");

    const [
        image,
        setImage,
    ] = useState<File | null>(null);

    const [
        loading,
        setLoading,
    ] = useState(false);


    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        if (!message.trim()) {

            toast.error(
                "اكتب نص التذكير"
            );

            return;
        }

        if (
            contentType === "image"
            && !image
        ) {

            toast.error(
                "اختر صورة التذكير"
            );

            return;
        }
        try {

            setLoading(true);

            const imageUrl =
                contentType === "image" && image
                    ? await uploadFile(
                        image,
                        "reminders"
                    )
                    : null;

            const result =
                await createReminderAction({
                    eventId,

                    target,

                    contentType,

                    message,

                    image:
                        imageUrl,
                });

            if (!result.success) {

                toast.error(
                    result.message
                );

                return;
            }

            toast.success(
                "تم إنشاء التذكير بنجاح"
            );
            setLoading(false);

            setMessage("");

            setImage(null);

            setContentType(
                "text"
            );

            setTarget(
                "all"
            );

            onOpenChange(false);

        } catch {

            toast.error(
                "حدث خطأ أثناء إنشاء التذكير"
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AppDialog open={open} onOpenChange={onOpenChange} title="ارسال تذكير للمدعوين" >
                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-6"
                >

                    {/* المستهدفين */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            المستهدفون

                        </label>

                        <Select
                            value={target}
                            onValueChange={(
                                value
                            ) =>
                                setTarget(
                                    value as never
                                )
                            }
                        >

                            <SelectTrigger>

                                <SelectValue>اختر</SelectValue>

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    كل المدعوين
                                </SelectItem>

                                <SelectItem value="attending">
                                    من سيحضر
                                </SelectItem>

                                <SelectItem value="declined">
                                    من اعتذر
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>


                    {/* نوع المحتوى */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            نوع التذكير

                        </label>

                        <Select
                            value={
                                contentType
                            }
                            onValueChange={(
                                value
                            ) =>
                                setContentType(
                                    value as
                                    | "text"
                                    | "image"
                                )
                            }
                        >

                            <SelectTrigger>

                                <SelectValue>اختر</SelectValue>

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="text">
                                    نص فقط
                                </SelectItem>

                                <SelectItem value="image">
                                    نص + صورة
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>


                    {/* الرسالة */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            نص التذكير

                        </label>

                        <Textarea
                            value={message}
                            onChange={(
                                e
                            ) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                            placeholder="اكتب رسالة التذكير..."
                            rows={5}
                        />

                    </div>


                    {/* الصورة */}

                    {contentType ===
                        "image"
                        && (

                            <div className="space-y-2">

                                <label className="text-sm font-medium">

                                    صورة التذكير

                                </label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(
                                        e
                                    ) =>
                                        setImage(
                                            e.target.files?.[0]
                                            ?? null
                                        )
                                    }
                                />

                            </div>

                        )}

                    <Button
                        type="submit"
                        disabled={
                            loading
                        }
                        className="w-full"
                    >

                        {loading
                            ? "جاري الإرسال..."
                            : "إرسال التذكير"}

                    </Button>

                </form>
            </AppDialog>
        </>

    );
}


/***
 * 
 * 
 *  <Dialog
                open={open}
                onOpenChange={
                    onOpenChange
                }
            >

                <DialogContent>

                    <DialogHeader>

                        <DialogTitle>
                            إرسال تذكير
                        </DialogTitle>

                    </DialogHeader>


                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="space-y-6"
                    >


                        <div className="space-y-2">

                            <label className="text-sm font-medium">

                                المستهدفون

                            </label>

                            <Select
                                value={target}
                                onValueChange={(
                                    value
                                ) =>
                                    setTarget(
                                        value as never
                                    )
                                }
                            >

                                <SelectTrigger>

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="all">
                                        كل المدعوين
                                    </SelectItem>

                                    <SelectItem value="attending">
                                        من سيحضر
                                    </SelectItem>

                                    <SelectItem value="declined">
                                        من اعتذر
                                    </SelectItem>

                                    <SelectItem value="pending">
                                        بانتظار الرد
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>


                        <div className="space-y-2">

                            <label className="text-sm font-medium">

                                نوع التذكير

                            </label>

                            <Select
                                value={
                                    contentType
                                }
                                onValueChange={(
                                    value
                                ) =>
                                    setContentType(
                                        value as
                                        | "text"
                                        | "image"
                                    )
                                }
                            >

                                <SelectTrigger>

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="text">
                                        نص فقط
                                    </SelectItem>

                                    <SelectItem value="image">
                                        نص + صورة
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>



                        <div className="space-y-2">

                            <label className="text-sm font-medium">

                                نص التذكير

                            </label>

                            <Textarea
                                value={message}
                                onChange={(
                                    e
                                ) =>
                                    setMessage(
                                        e.target.value
                                    )
                                }
                                placeholder="اكتب رسالة التذكير..."
                                rows={5}
                            />

                        </div>



                        {contentType ===
                            "image"
                            && (

                                <div className="space-y-2">

                                    <label className="text-sm font-medium">

                                        صورة التذكير

                                    </label>

                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(
                                            e
                                        ) =>
                                            setImage(
                                                e.target.files?.[0]
                                                ?? null
                                            )
                                        }
                                    />

                                </div>

                            )}


                        <Button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="w-full"
                        >

                            {loading
                                ? "جاري الإرسال..."
                                : "إرسال التذكير"}

                        </Button>

                    </form>

                </DialogContent>

            </Dialog>
 */