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
    invitation_sent_at: string;
    attend_confirmation: boolean;
    confirmed_at: string;
    method: string;
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
                <TableRow className="text-center">

                    <TableHead className="text-center">الكود</TableHead>

                    <TableHead className="text-center">الاسم</TableHead>

                    <TableHead className="text-center">الهاتف</TableHead>

                    <TableHead className="text-center">الحالة</TableHead>

                    <TableHead className="text-center">الدعوة</TableHead>
                    <TableHead className="text-center">تاكيد الدخول </TableHead>
                    <TableHead className="text-center">طريقة الدخول</TableHead>
                    <TableHead className="text-center">وقت الدخول</TableHead>

                    <TableHead className="text-center">العمليات</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {guests.length ? guests.map((guest) => (
                    <TableRow key={guest.id} className="text-center">

                        <TableCell className="font-semibold">
                            {guest.guest_code}
                        </TableCell>

                        <TableCell>
                            {guest.name}
                        </TableCell>

                        <TableCell dir="ltr">
                            {guest.phone}
                        </TableCell>

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

                        <TableCell className="text-center">
                            {guest.invitation_sent ? "تم الإرسال" : "لم ترسل"}
                        </TableCell>

                        <TableCell>{guest.attend_confirmation ? "✔" : "-"}</TableCell>
                        <TableCell>{guest.method ? guest.method === "qr" ? "QR" : "يدوى" : "-"}</TableCell>
                        <TableCell>{guest.scanned_at ? new Date(guest.scanned_at).toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                        }) : "-"}</TableCell>

                        <TableCell>
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