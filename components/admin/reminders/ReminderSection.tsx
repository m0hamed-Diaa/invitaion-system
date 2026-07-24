import {
    getRemindersByEvent,
} from "@/lib/actions/reminders";
import ReminderTable from "./ReminderTable";


interface Props {
    eventId: string;
}

export default async function ReminderSection({
    eventId,
}: Props) {

    const reminders =
        await getRemindersByEvent(eventId);

    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-xl font-bold">
                    التذكيرات
                </h2>

                <p className="text-sm text-muted-foreground">
                    إدارة التذكيرات التي تم إرسالها للمدعوين
                </p>
            </div>

            <ReminderTable
                reminders={reminders}
            />

        </div>
    );
}