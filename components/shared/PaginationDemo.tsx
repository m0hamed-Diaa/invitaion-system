"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useTransition } from "react";
import PageLoading from "@/app/admin/loading";

interface Props {
    totalPages: number;
}

export default function PaginationComponent({
    totalPages,
}: Props) {
    const router = useRouter();
    const params = useSearchParams();

    const [
        isPending,
        startTransition,
    ] = useTransition();

    const currentPage = Number(params.get("page") ?? "1");

    function changePage(page: number) {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage ||
            isPending
        ) {
            return;
        }
        const newParams = new URLSearchParams(params.toString());

        newParams.set("page", page.toString());

        router.replace(`?${newParams.toString()}`);
        startTransition(() => {
            router.replace(
                `?${newParams.toString()}`
            );
        });

    }

    const pages = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    );

    if (isPending) {
        return <PageLoading text="جاري تحديث البيانات..." />
    }

    return (
        <Pagination className={
            isPending
                ? "pointer-events-none opacity-50"
                : "mt-8"
        }>
            <PaginationContent className="overflow-x-auto w-full">
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() =>
                            currentPage > 1 &&
                            changePage(currentPage - 1)
                        }
                        className={
                            currentPage === 1
                                ? "pointer-events-none  opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                {/* Pages */}

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => changePage(page)}
                            className="cursor-pointer"
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            currentPage < totalPages &&
                            changePage(currentPage + 1)
                        }
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}



// "use client";

// import {
//     useRouter,
//     useSearchParams,
// } from "next/navigation";

// import {
//     useTransition,
// } from "react";

// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination";

// interface Props {
//     totalPages: number;
// }

// export default function PaginationComponent({
//     totalPages,
// }: Props) {

//     const router = useRouter();

//     const params =
//         useSearchParams();

//     const [
//         isPending,
//         startTransition,
//     ] = useTransition();

//     const currentPage =
//         Number(
//             params.get("page") ?? "1"
//         );

//     function changePage(page: number) {

//         if (
//             page < 1 ||
//             page > totalPages ||
//             page === currentPage ||
//             isPending
//         ) {
//             return;
//         }

//         const newParams =
//             new URLSearchParams(
//                 params.toString()
//             );

//         newParams.set(
//             "page",
//             page.toString()
//         );

//         startTransition(() => {
//             router.replace(
//                 `?${newParams.toString()}`
//             );
//         });
//     }

//     if (totalPages <= 1) {
//         return null;
//     }

//     return (
//         <Pagination
//             className={
//                 isPending
//                     ? "pointer-events-none opacity-50"
//                     : "mt-8"
//             }
//         >
//             <PaginationContent>

//                 <PaginationItem>

//                     <PaginationPrevious
//                         onClick={() =>
//                             changePage(
//                                 currentPage - 1
//                             )
//                         }
//                         className={
//                             currentPage === 1
//                                 ? "pointer-events-none opacity-50"
//                                 : "cursor-pointer"
//                         }
//                     />

//                 </PaginationItem>

//                 {Array.from(
//                     {
//                         length: totalPages,
//                     },
//                     (_, index) =>
//                         index + 1
//                 ).map((page) => (

//                     <PaginationItem
//                         key={page}
//                     >

//                         <PaginationLink
//                             isActive={
//                                 page === currentPage
//                             }
//                             onClick={() =>
//                                 changePage(page)
//                             }
//                             className="cursor-pointer"
//                         >
//                             {page}
//                         </PaginationLink>

//                     </PaginationItem>

//                 ))}

//                 <PaginationItem>

//                     <PaginationNext
//                         onClick={() =>
//                             changePage(
//                                 currentPage + 1
//                             )
//                         }
//                         className={
//                             currentPage ===
//                                 totalPages
//                                 ? "pointer-events-none opacity-50"
//                                 : "cursor-pointer"
//                         }
//                     />

//                 </PaginationItem>

//             </PaginationContent>
//         </Pagination>
//     );
// }