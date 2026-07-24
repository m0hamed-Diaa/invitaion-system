import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

export default function AttendanceTable({
    guests,
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>

                    <TableHead>الكود</TableHead>

                    <TableHead>الاسم</TableHead>

                    <TableHead>الهاتف</TableHead>

                    <TableHead>طريقة الدخول</TableHead>

                    <TableHead>وقت الدخول</TableHead>

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

                        {/* طريقة الدخول */}
                        <TableCell>
                            {guest.status === "pending" && (
                                <Badge className="bg-yellow-400">QR</Badge>
                            )}

                            {guest.status === "attending" && (
                                <Badge className="bg-green-400">يدوى</Badge>
                            )}
                        </TableCell>

                        {/* وقت الدخول */}
                        <TableCell className="text-center">
                            {guest.invitation_sent || "10 PM"}
                        </TableCell>

                    </TableRow>
                )) : <TableRow className="text-center text-destructive font-bold">
                    <TableCell >
                        لا يوجد حضور للعرض!
                    </TableCell>
                </TableRow>}
            </TableBody>
        </Table>
    );
}