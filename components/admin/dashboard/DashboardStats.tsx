import {
    Users,
    CalendarDays,
    UserRoundCheck,
    UserRound,
    UserPen,
    UserX
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
    stats: {
        clients: number;
        events: number;
        guests: number;
        attending: number;
        sending: number;
        notSending: number;
    };
}

export default function DashboardStats({
    stats,
}: Props) {
    const cards = [
        {
            title: "إجمالي العملاء",
            value: stats.clients,
            icon: Users,
            link: "/admin/clients"
        },
        {
            title: "إجمالي المناسبات",
            value: stats.events,
            icon: CalendarDays,
            link: "/admin/events"
        },
        {
            title: "إجمالي المدعوين",
            value: stats.guests,
            icon: UserRound,
            link: ""
        },
        {
            title: "إجمالي الحضور",
            value: stats.attending,
            icon: UserRoundCheck,
            link: ""
        },
        {
            title: "إجمالي رسائل المدعوين المرسلة عبر الوتساب",
            value: stats.sending,
            icon: UserPen,
            link: ""
        },
        {
            title: "إجمالي رسائل المدعوين فى حالة الأرسال عبر الوتساب",
            value: stats.notSending,
            icon: UserX,
            link: ""
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {cards.map((card) => {
                const Icon = card.icon;

                const cardContent = (
                    <Card
                        className={
                            card.link
                                ? "cursor-pointer transition-shadow hover:shadow-md"
                                : ""
                        }
                    >
                        <CardContent className="flex items-center justify-between p-6">

                            <div className="space-y-2">

                                <p className="text-sm text-muted-foreground">
                                    {card.title}
                                </p>

                                <p className="text-3xl font-bold">
                                    {card.value.toLocaleString("ar-EG")}
                                </p>

                            </div>

                            <div className="rounded-xl bg-muted p-3">
                                <Icon className="h-6 w-6" />
                            </div>

                        </CardContent>
                    </Card>
                );

                return card.link ? (
                    <Link
                        key={card.title}
                        href={card.link}
                        className="block"
                    >
                        {cardContent}
                    </Link>
                ) : (
                    <div key={card.title}>
                        {cardContent}
                    </div>
                );
            })}
        </div>
    );
}