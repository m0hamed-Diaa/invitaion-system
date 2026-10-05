"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import PageLoading from "@/app/(admin)/admin/loading";

interface Props {
    eventId: string;
}

export default function DownLoadButton({
    eventId,
}: Props) {

    const [
        loading,
        setLoading,
    ] = useState(false);

    async function handleDownload() {

        setLoading(true);

        try {

            const response = await fetch(
                `/api/events/${eventId}/report`
            );

            if (!response.ok) {

                let message = "حدث خطأ أثناء إنشاء التقرير";

                try {
                    const data = await response.json();
                    if (data?.error) message = data.error;
                } catch {
                    // الاستجابة مش JSON، سيب الرسالة الافتراضية
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            const contentDisposition = response.headers.get(
                "Content-Disposition"
            );

            let fileName = "تقرير.pdf";

            if (contentDisposition) {
                const match = contentDisposition.match(
                    /filename\*=UTF-8''(.+)/
                );
                if (match?.[1]) {
                    fileName = decodeURIComponent(match[1]);
                }
            }

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("تم تحميل التقرير بنجاح");

        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "فشل تحميل التقرير، حاول مرة أخرى"
            );

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <PageLoading text="جاري تحميل التقرير، برجاء الانتظار..." />
    }

    return (
        <Button
            onClick={handleDownload}
            disabled={loading}
            className="w-full sm:w-fit"
        >
            {loading ? <>
                <Spinner />
                جاري تحميل التقرير...
            </>
                : <>تحميل تقرير بالمدعوين</>}
        </Button>
    );
}