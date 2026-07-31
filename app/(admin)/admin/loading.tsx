"use client";

import { LoaderCircle } from "lucide-react";

interface PageLoadingProps {
    text?: string;
}

export default function PageLoading({
    text = "جاري تحميل البيانات..."
}: PageLoadingProps) {

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">

                <LoaderCircle
                    className="h-10 w-10 animate-spin text-primary"
                />

                <p className="text-sm font-medium text-muted-foreground">
                    {text}
                </p>

            </div>
        </div>
    );
}