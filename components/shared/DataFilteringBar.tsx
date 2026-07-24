"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useTableFilters } from "@/hooks/useTableFilters";
import PageLoading from "@/app/admin/loading";

interface Props {
    placeholder?: string;
    statusFilter?: boolean;
    statusAttendFilter?: boolean;
}

export default function DataToolbar({
    placeholder = "الاسم",
    statusFilter = false,
    statusAttendFilter = false,
}: Props) {
    const {

        search,

        setSearch,

        sort,

        setSort,

        status,

        setStatus,

        isPending,

    } = useTableFilters();

    if (isPending) {
        return <PageLoading text="جاري تحديث البيانات..." />
    }

    return (
        <div className="flex gap-3">
            <div className="relative w-80">

                <Search
                    className="absolute hidden sm:flex left-3 top-1/2 -translate-y-1/2"
                    size={18}
                />

                <Input
                    value={search}
                    placeholder={`بحث عن ${placeholder}`}
                    onChange={(e) => setSearch(e.target.value)}

                    disabled={isPending}
                />
            </div>

            <Select
                value={sort}
                onValueChange={(value) =>
                    setSort(value as "asc" | "desc")
                }
            >
                <SelectTrigger className="w-40">
                    <SelectValue >ترتيب</SelectValue>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="desc">
                        الأحدث
                    </SelectItem>

                    <SelectItem value="asc">
                        الأقدم
                    </SelectItem>
                </SelectContent>
            </Select>

            {
                statusFilter && (

                    <Select
                        value={status}
                        onValueChange={(value) => {
                            setStatus(
                                (value ?? "all") as
                                | "all"
                                | "pending"
                                | "attending"
                                | "declined"
                            );
                        }}
                    >

                        <SelectTrigger className="w-44">

                            <SelectValue>ترتيب حسب الحالة</SelectValue>

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="all">
                                الكل
                            </SelectItem>

                            <SelectItem value="pending">
                                بانتظار الرد
                            </SelectItem>

                            <SelectItem value="attending">
                                سيحضر
                            </SelectItem>

                            <SelectItem value="declined">
                                اعتذر
                            </SelectItem>

                        </SelectContent>

                    </Select>

                )
            }

            {
                statusAttendFilter && (

                    <Select
                        value={status}
                        onValueChange={(value) => {
                            setStatus(
                                (value ?? "all") as
                                | "all"
                                | "qr"
                                | "manual"
                            );
                        }}
                    >

                        <SelectTrigger className="w-44">

                            <SelectValue>ترتيب حسب الحالة</SelectValue>

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="all">
                                الكل
                            </SelectItem>

                            <SelectItem value="qr">
                                QR
                            </SelectItem>

                            <SelectItem value="manual">
                                دخول يدوى
                            </SelectItem>

                        </SelectContent>

                    </Select>

                )
            }

        </div >
    );
}