"use client";

import { ReactNode } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title: string;
    description?: string;

    children?: ReactNode;

    showFooter?: boolean;

    confirmText?: string;
    cancelText?: string;

    confirmVariant?:
    | "default"
    | "destructive"
    | "secondary"
    | "outline"
    | "ghost";

    loading?: boolean;

    onConfirm?: () => void;
}

export default function AppDialog({
    open,
    onOpenChange,
    title,
    description,
    children,

    showFooter = true,

    confirmText = "تأكيد",
    cancelText = "إلغاء",

    confirmVariant = "default",

    loading = false,

    onConfirm,
}: DialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                dir="rtl"
                className="[&>button]:left-4 [&>button]:right-auto"
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {children}

                {showFooter && (
                    <div className="flex justify-end gap-3 mt-6">

                        <DialogClose
                            render={<Button variant="outline" />}
                        >
                            {cancelText}
                        </DialogClose>

                        {onConfirm && (
                            <Button
                                variant={confirmVariant}
                                onClick={onConfirm}
                                disabled={loading}
                            >
                                {loading ? "جارى التنفيذ..." : confirmText}
                            </Button>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}