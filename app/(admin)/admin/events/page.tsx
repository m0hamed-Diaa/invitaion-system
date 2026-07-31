import { Eye, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import DataToolbar from "@/components/shared/DataFilteringBar";
import PaginationComponent from "@/components/shared/PaginationDemo";
import { formatTimeAgo } from "@/lib/utils/TimeFormat";
import { getEvents } from "@/lib/actions/events";

interface Props {
    searchParams: Promise<{
        page?: string;
        search?: string;
        sort?: "asc" | "desc";
    }>;
}

export default async function ClientsPage({
    searchParams,
}: Props) {

    const {
        page = "1",
        search = "",
        sort = "desc",
    } = await searchParams;
    const currentPage = Number(page);

    const {
        data: Events,
        total,
        totalPages,
    } = await getEvents({
        page: currentPage,
        limit: 10,
        search,
        sort,
    });
    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        العملاء
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        دير شغل عملاء الفرح بتوعك.
                    </p>
                </div>

                <Link href={"/admin/events/new"}>
                    <Button>
                        اضافة مناسبة جديد
                        <Plus className="mr-2 h-4 w-4" />
                    </Button>
                </Link>

            </div>

            <DataToolbar
                placeholder="مناسبة"
            />

            <Card>
                <CardHeader>

                    <CardTitle>
                        قائمة المناسبات
                    </CardTitle>

                    <CardDescription>
                        يوجد {total} مناسبة
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead className="text-start">
                                    اسم المناسبة
                                </TableHead>

                                <TableHead className="text-center">
                                    اسم العميل
                                </TableHead>
                                <TableHead className="text-center">
                                    سجل منذ
                                </TableHead>

                                <TableHead className="text-center">
                                    العمليات
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {Events.length ? Events.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium text-start">
                                        {client.title}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {client.clients.name}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {formatTimeAgo(client.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/admin/events/${client.clients.id}`}>
                                            <Button variant={"outline"}>
                                                عرض التفاصيل <Eye size={15} />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell className="mx-auto text-destructive font-bold"> لا يوجد مناسبات للعرض!</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {
                totalPages > 1 && (
                    <PaginationComponent totalPages={totalPages} />
                )
            }

        </div>
    );
}
