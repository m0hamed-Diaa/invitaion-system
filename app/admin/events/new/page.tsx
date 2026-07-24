
import EventForm from "@/components/admin/events/EventAddForm";
import ClientSelect from "@/components/shared/ClientSelect";
import { Button } from "@/components/ui/button";
import { getClients } from "@/lib/actions/clients";
import { createEventAction, getEventByClient } from "@/lib/actions/events";
import Link from "next/link";

export default async function NewClientPage({
    searchParams,
}: {
    searchParams: Promise<{
        client?: string;
    }>;
}) {
    const { client } = await searchParams;

    const { data: clients } = await getClients();

    const event =
        client
            ? await getEventByClient(client)
            : null;

    return (

        <div className="space-y-6 max-w-3xl mx-auto">

            <ClientSelect
                clients={clients}
                value={client}
            />
            {event ? (
                <>
                    <div>
                        <h1 className="text-3xl font-bold">
                            يوجد مناسبة حالية بالفعل لهذا العميل
                        </h1>
                    </div>
                    <Link href={`/admin/events/${client}`}>
                        <Button variant={"secondary"}>عرض المناسبة</Button>
                    </Link>
                </>
            ) : <EventForm
                submitText="إنشاء المناسبة"
                successMessage="تم إنشاء المناسبة"
                clientIdFromSearchParams={client}
                onSubmit={createEventAction}
            />}
        </div>
    );
}


/**
 * 
 * <EventForm
    mode="update"
    defaultValues={{
        title: event.title,
    }}
    submitText="حفظ"
    successMessage="تم تعديل المناسبة"
    onSubmit={(data) =>
        updateEventAction(
            event.id,
            data as UpdateEventFormValues
        )
    }
/>
 */