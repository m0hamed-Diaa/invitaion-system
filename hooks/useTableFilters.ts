"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function useTableFilters() {

    const router = useRouter();

    const params = useSearchParams();

    const [isPending, startTransition] =
        useTransition();

    const [search, setSearch] = useState(
        params.get("search") ?? ""
    );

    const [sort, setSort] = useState<"asc" | "desc">(
        (params.get("sort") as "asc" | "desc") ?? "desc"
    );

    const [status, setStatus] = useState(
        params.get("status") ?? "all"
    );

    const debouncedSearch =
        useDebounce(search, 700);

    useEffect(() => {

        const query =
            new URLSearchParams();

        if (debouncedSearch.trim())
            query.set("search", debouncedSearch.trim());

        query.set("sort", sort);
        query.set("page", "1");

        if (status !== "all")
            query.set("status", status);

        const next =
            `?${query.toString()}`;

        if (
            next ===
            window.location.search
        )
            return;

        startTransition(() => {
            router.replace(next);
        });

    }, [
        debouncedSearch,
        sort,
        status,
        router,
    ]);

    return {

        search,

        setSearch,

        sort,
        status,

        setSort,


        setStatus,

        isPending,

    };

}