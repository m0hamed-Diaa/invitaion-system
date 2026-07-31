"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

export default function RefreshButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <Button
            onClick={() => {
                setLoading(true);
                router.refresh()
                toast.info("تم تحديث الصفحة");
                setLoading(false);
            }}
            disabled={loading}
            className="w-full sm:w-fit"
        >
            {loading
                ? ""
                : <RefreshCcw />}
        </Button>
    );
}