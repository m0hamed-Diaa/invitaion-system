import ScanQRClient from "@/components/admin/scan-qr/ScanQRClient";
import { createClient } from "@/lib/supabase/server";

export default async function ScanQRPage() {

    const supabase =
        await createClient();
    const {
        data: clients,
        error,
    } = await supabase
        .from("clients")
        .select(`
            id,
            name
        `)
        .order(
            "name",
            {
                ascending: true,
            }
        );


    if (error) {

        return (
            <div className="p-6 text-center">
                حدث خطأ أثناء تحميل العملاء
            </div>
        );
    }


    return (
        <div
            className="container mx-auto p-4 sm:p-6"
            dir="rtl"
        >

            <div className="mb-6">

                <h1 className="text-2xl font-bold">
                    تسجيل حضور المدعوين
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    اختر العميل لبدء تسجيل حضور المدعوين
                </p>

            </div>


            <ScanQRClient
                clients={
                    clients ?? []
                }
            />

        </div>
    );
}