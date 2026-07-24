"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import ReminderDialog from "./ReminderDialog";


interface Props {
    eventId: string;
}

export default function ReminderButton({
    eventId,
}: Props) {

    const [
        open,
        setOpen,
    ] = useState(false);

    return (
        <>
            <Button
                onClick={() =>
                    setOpen(true)
                }
                disabled
                className={"w-full sm:w-fit"}
            >
                إرسال تذكير للمدعوين
            </Button>

            <ReminderDialog
                eventId={eventId}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}