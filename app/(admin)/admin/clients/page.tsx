import { Plus } from "lucide-react";

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
import ClientActions from "@/components/admin/clients/clientActions";
import DataToolbar from "@/components/shared/DataFilteringBar";
import PaginationComponent from "@/components/shared/PaginationDemo";
import { getClients } from "@/lib/actions/clients";
import { formatTimeAgo } from "@/lib/utils/TimeFormat";

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
        data: clients,
        total,
        totalPages,
    } = await getClients({
        page: currentPage,
        limit: 10,
        search,
        sort,
    });

    return (
        <div className="space-y-6">

            <div className="sm:flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        العملاء
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        دير شغل عملاء الفرح بتوعك.
                    </p>
                </div>

                <div className="md:flex items-center">
                    <Link href={"/admin/clients/new"}>
                        <Button>
                            اضافة عميل جديد
                            <Plus className="mr-2 h-4 w-4" />
                        </Button>
                    </Link>

                    {total > 0 && (<Link href={"/admin/events/new"}>
                        <Button>
                            اضافة مناسبة لعميل
                            <Plus className="mr-2 h-4 w-4" />
                        </Button>
                    </Link>)}
                </div>
            </div>

            <DataToolbar
                placeholder="عميل"
            />

            <Card>
                <CardHeader>

                    <CardTitle>
                        قائمة العملاء
                    </CardTitle>

                    <CardDescription>
                        يوجد {total} عميل
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead className="text-start">
                                    اسم العميل
                                </TableHead>

                                <TableHead className="text-center">
                                    رقم العميل
                                </TableHead>

                                <TableHead className="text-center">
                                    عدد المدعوين
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
                            {clients.length ? clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium text-start">
                                        {client.name}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {client.phone}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {client.expected_guests}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {formatTimeAgo(client.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        <ClientActions key={client.id} client={client} />
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow className="text-destructive">
                                <TableCell> لا يوجد عملاء للعرض!</TableCell></TableRow>}

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