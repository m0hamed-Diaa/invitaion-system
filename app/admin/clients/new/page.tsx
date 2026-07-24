"use client"

import ClientAddForm from "@/components/admin/clients/ClientAddForm";
import { createClientAction } from "@/lib/actions/clients";

export default function NewClientPage() {

    return (

        <div className="space-y-6 max-w-3xl mx-auto">

            <div>

                <h1 className="text-3xl font-bold">
                    إنشاء عميل جديد
                </h1>

                <p className="text-muted-foreground mt-2">
                    أدخل بيانات العميل ليتم إنشاء مناسبة خاصة به لاحقًا.
                </p>
            </div>

            <ClientAddForm
                submitText="إضافة العميل"
                successMessage="تم اضافة العميل بنجاح"
                onSubmit={async (data) => {
                    await createClientAction(data);
                }}
            />
        </div>
    );
}