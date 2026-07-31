"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { resendInvitationsAction } from "@/lib/actions/events";
import { toast } from "sonner";


interface Props {
    event_Id: string;
}

export default function ResendButton({
    event_Id,
}: Props) {

    const [loading, setLoading] =
        useState(false);

    const handleResend = async () => {

        try {

            setLoading(true);

            const result =
                await resendInvitationsAction(
                    event_Id
                );

            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }

        } catch {
            toast.error("حدث خطأ أثناء إعادة إرسال الدعوات");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleResend}
            disabled={loading}
            className="w-full sm:w-fit"
        >
            {loading
                ? "جاري إعادة الإرسال..."
                : "إعادة إرسال غير المرسلة"}
        </Button>
    );
}