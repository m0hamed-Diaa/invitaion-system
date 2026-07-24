import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import GuestActions from "../events/GuestActions";
import { Badge } from "@/components/ui/badge";

type Guest = {
    id: string;
    guest_code: number;
    name: string;
    phone: string;
    status: "pending" | "attending" | "declined";
    invitation_sent: boolean;
    scanned_at: string;
};

interface Props {
    guests: Guest[];
}

export default function GuestTable({
    guests,
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>

                    <TableHead>الكود</TableHead>

                    <TableHead>الاسم</TableHead>

                    <TableHead>الهاتف</TableHead>

                    <TableHead>الحالة</TableHead>

                    <TableHead>الدعوة</TableHead>

                    <TableHead>العمليات</TableHead>

                </TableRow>
            </TableHeader>

            <TableBody>

                {guests.length ? guests.map((guest) => (
                    <TableRow key={guest.id}>

                        {/* الكود */}
                        <TableCell className="font-semibold">
                            {guest.guest_code}
                        </TableCell>

                        {/* الاسم */}
                        <TableCell>
                            {guest.name}
                        </TableCell>

                        {/* الهاتف */}
                        <TableCell dir="ltr">
                            {guest.phone}
                        </TableCell>

                        {/* الحالة */}
                        <TableCell>
                            {guest.status === "pending" && (
                                <Badge className="bg-yellow-400">بانتظار الرد</Badge>
                            )}

                            {guest.status === "attending" && (
                                <Badge className="bg-green-400">سيحضر</Badge>
                            )}

                            {guest.status === "declined" && (
                                <Badge className="bg-red-400">اعتذر</Badge>
                            )}
                        </TableCell>

                        {/* تم إرسال الدعوة */}
                        <TableCell className="text-center">
                            {guest.invitation_sent ? "تم الإرسال" : "لم ترسل"}
                        </TableCell>

                        {/* العمليات */}
                        <TableCell className="text-right">
                            <GuestActions key={guest.id} id={guest.id} status={guest.status} />
                        </TableCell>
                    </TableRow>
                )) : <TableRow className="text-center text-destructive font-bold">
                    <TableCell >
                        لا يوجد مدعويين للعرض!
                    </TableCell>
                </TableRow>}
            </TableBody>
        </Table>
    );
}