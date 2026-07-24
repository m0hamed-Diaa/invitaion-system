import { Badge } from "@/components/ui/badge";

interface Reminder {
    id: string;
    target:
    | "all"
    | "attending"
    | "declined"
    | "pending";

    message: string;

    image: string | null;

    created_at: string;
}

interface Props {
    reminders: Reminder[];
}

const targetLabels = {
    all: "كل المدعوين",
    attending: "من سيحضر",
    declined: "من اعتذر",
    pending: "بانتظار الرد",
};

export default function ReminderTable({
    reminders,
}: Props) {

    if (reminders.length === 0) {
        return (
            <div className="rounded-xl border p-10 text-center">

                <p className="font-medium">
                    لا توجد تذكيرات حتى الآن
                </p>

                <p className="text-sm text-muted-foreground mt-2">
                    يمكنك إنشاء أول تذكير للمدعوين من زرار التذكير اعلى الصفحة
                </p>
            </div>
        );
    }
    return (
        <div className="rounded-xl border overflow-hidden">

            <table className="w-full">

                <thead className="bg-muted/50">

                    <tr>

                        <th className="p-4 text-right">
                            المستهدفون
                        </th>

                        <th className="p-4 text-right">
                            المحتوى
                        </th>

                        <th className="p-4 text-right">
                            طريقة الارسال
                        </th>

                        <th className="p-4 text-right">
                            التاريخ
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {reminders.map(
                        (reminder) => (

                            <tr
                                key={reminder.id}
                                className="border-t"
                            >

                                <td className="p-4">

                                    <Badge variant="secondary">

                                        {
                                            targetLabels[
                                            reminder.target
                                            ]
                                        }

                                    </Badge>

                                </td>

                                <td className="p-4 max-w-md">

                                    <p className="truncate">

                                        {
                                            reminder.message
                                        }

                                    </p>

                                </td>

                                <td className="p-4">

                                    {reminder.image
                                        ? "نص + صورة"
                                        : "نص فقط"}

                                </td>

                                <td className="p-4 text-sm text-muted-foreground">

                                    {new Date(
                                        reminder.created_at
                                    ).toLocaleDateString(
                                        "ar-EG"
                                    )}

                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}