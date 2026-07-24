import Image from "next/image";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { getClientById } from "@/lib/actions/clients";
import { getEventByClient, getInvitationStats } from "@/lib/actions/events";
import { getGuestsByEvent, getGuestStatsByEvent } from "@/lib/actions/quests";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationComponent from "@/components/shared/PaginationDemo";
import DataToolbar from "@/components/shared/DataFilteringBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReminderButton from "@/components/admin/reminders/ReminderButton";
import { redirect } from "next/navigation";
import ReminderSection from "@/components/admin/reminders/ReminderSection";
import GuestTable from "@/components/admin/events/GuestsTable";
// import AttendanceTable from "@/components/admin/events/AttendanceTable";
// import ResendButton from "@/components/admin/reminders/ResendEvent";

interface Props {
    params: Promise<{
        id: string;
    }>;

    searchParams: Promise<{
        page?: string;
        search?: string;
        sort?: "asc" | "desc";
        status?: "all" | "attending" | "declined";
    }>;
}

export default async function GuestsPage({
    params,
    searchParams
}: Props) {
    const { id } = await params;
    const {
        page = "1",
        search = "",
        sort = "desc",
        status = "all",
    } = await searchParams;


    const client =
        await getClientById(id);

    const event =
        await getEventByClient(id);

    if (!event) {
        redirect("/admin/events/new");
    }

    const [
        {
            data: guests,
            totalPages,
        },
        stats,
    ] = await Promise.all([
        getGuestsByEvent({
            eventId: event.id,
            page: Number(page),
            limit: 10,
            search,
            sort,
            status,
        }),

        getGuestStatsByEvent(event.id),
    ]);

    const [{ sent, failed }] = await Promise.all([
        getInvitationStats(event.id)
    ])

    return (

        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row items-center gap-2">
                <ReminderButton
                    eventId={event.id}
                />

                {/* {failed !== 0 && (
                    <ResendButton event_Id={event.id}>
                        إعادة إرسال غير المرسلة
                    </ResendButton>
                )} */}
                <Button className={"w-full sm:w-fit"} disabled>
                    تحميل تقرير بالمدعوين
                </Button>

                <Link className={"w-full sm:w-fit"} href="/admin/clients">
                    <Button className={"w-full"}>
                        الذهاب لصفحة العملاء
                    </Button>
                </Link>
            </div>

            <Card>

                <CardHeader>

                    <CardTitle>
                        بيانات العميل
                    </CardTitle>

                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-4">

                    <div>

                        <p className="text-sm text-muted-foreground">
                            اسم العميل
                        </p>

                        <p className="font-semibold">
                            {client.name}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">
                            رقم الهاتف
                        </p>

                        <p className="font-semibold">
                            {client.phone}
                        </p>

                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            عدد المدعوين
                        </p>

                        <Badge>
                            {client.expected_guests}
                        </Badge>
                    </div>

                </CardContent>

            </Card>

            {event || guests.length !== 0 ? (
                <>
                    {/* بيانات المناسبة */}

                    <Card className="">

                        <CardHeader>

                            <CardTitle>

                                بيانات المناسبة

                            </CardTitle>

                        </CardHeader>

                        <CardContent className="lg:flex items-center justify-between gap-8">

                            <div className="space-y-4 mb-4">

                                <div>

                                    <p className="text-sm text-muted-foreground">

                                        عنوان المناسبة

                                    </p>

                                    <p className="font-semibold">

                                        {event.title}

                                    </p>

                                </div>

                                <Separator />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        رسالة الدعوة
                                    </p>

                                    <div className="max-h-80 lg:max-w-100 overflow-y-auto rounded-lg border bg-muted/30 p-4">
                                        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7">
                                            {event.invitation_message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Image
                                src={event.invitation_image}
                                alt={event.title}
                                loading="eager"
                                width={320}
                                height={420}
                                className="rounded-xl border object-cover mx-auto lg:mx-0"
                            />

                        </CardContent>

                    </Card>

                    {/* الاحصائيات */}

                    <div className="grid md:grid-cols-4 gap-4">

                        <Card>

                            <CardContent className="py-6 text-center">

                                <p className="text-muted-foreground">

                                    إجمالى المدعوين

                                </p>

                                <p className="text-3xl font-bold">

                                    {stats.total}

                                </p>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="py-6 text-center">

                                <p className="text-muted-foreground">

                                    تم الإرسال

                                </p>

                                <p className="text-3xl font-bold">

                                    {sent}

                                </p>

                            </CardContent>

                        </Card>
                        <Card>

                            <CardContent className="py-6 text-center">

                                <p className="text-muted-foreground">

                                    لم يتم الإرسال

                                </p>

                                <p className="text-3xl font-bold text-red-600">

                                    {failed}

                                </p>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="py-6 text-center">

                                <p className="text-muted-foreground">

                                    بانتظار الرد

                                </p>

                                <p className="text-3xl font-bold text-yellow-500">

                                    {stats.pending}

                                </p>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="py-6 text-center">

                                <p className="text-muted-foreground">

                                    سيحضر

                                </p>

                                <p className="text-3xl font-bold text-green-600">

                                    {stats.attending}

                                </p>

                            </CardContent>

                        </Card>

                        <Card>

                            <CardContent className="py-6 text-center">

                                <p className="text-muted-foreground">

                                    اعتذر

                                </p>

                                <p className="text-3xl font-bold text-red-600">

                                    {stats.declined}

                                </p>

                            </CardContent>

                        </Card>


                    </div>
                    <hr />

                    <Tabs defaultValue="guests" className="w-full">

                        <TabsList className="grid w-full grid-cols-2">

                            <TabsTrigger value="guests">
                                المدعوون
                            </TabsTrigger>

                            {/* <TabsTrigger value="attendances">
                                الحضور
                            </TabsTrigger> */}

                            <TabsTrigger value="reminders">
                                التذكيرات
                            </TabsTrigger>

                        </TabsList>

                        {/* جدول المدعوين */}
                        <TabsContent
                            value="guests"
                            className="space-y-6 mt-6"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-xl font-bold">
                                        المدعوون
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        إدارة بيانات وحالة المدعوين
                                    </p>

                                </div>

                            </div>


                            <DataToolbar
                                statusFilter
                                placeholder="الاسم أو الهاتف ..."
                            />

                            <GuestTable
                                guests={guests}
                            />


                            <PaginationComponent
                                totalPages={totalPages}
                            />

                        </TabsContent>

                        {/* جدول الحضور */}
                        {/* <TabsContent
                            value="attendances"
                            className="space-y-6 mt-6"
                        >

                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">
                                        الحضور
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        إدارة بيانات وحالة الحضور
                                    </p>
                                </div>
                            </div>

                            <DataToolbar
                                statusAttendFilter
                                placeholder="الاسم أو الهاتف ..."
                            />

                            <AttendanceTable
                                guests={guests}
                            />


                            <PaginationComponent
                                totalPages={totalPages}
                            />

                        </TabsContent> */}

                        {/* جدول التذكيرات */}
                        <TabsContent
                            value="reminders"
                            className="mt-6"
                        >

                            <ReminderSection
                                eventId={event.id}
                            />

                        </TabsContent>

                    </Tabs>
                </>
            ) : <h1 className="mr-2">لايوجد مناسبة حالية لهذا العميل
                <Link href="/admin/events/new">
                    <Button variant={"outline"}>انشاء مناسبة</Button></Link>
            </h1>}
        </div >
    );
}