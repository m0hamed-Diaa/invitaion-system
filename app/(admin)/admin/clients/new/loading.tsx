import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="space-y-2 flex items-center justify-end">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
            </div>


            {/* Toolbar */}

            <div className="flex gap-3">
                <Skeleton className="h-10 w-80" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-44" />
            </div>


            {/* Table */}

            <div className="rounded-xl border">

                <div className="space-y-4 p-5">

                    {Array.from({
                        length: 8,
                    }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <Skeleton className="h-5 w-20" />

                            <Skeleton className="h-5 w-32" />

                            <Skeleton className="h-5 w-40" />

                            <Skeleton className="h-5 w-28" />

                            <Skeleton className="h-8 w-8 rounded-full" />

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}