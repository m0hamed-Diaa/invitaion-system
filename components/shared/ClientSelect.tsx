"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface IClient {
    id: string;
    name: string;
}

interface Props {
    clients: IClient[];
    value?: string;
    placeholder?: string;
}

export default function ClientSelect({
    clients,
    value,
    placeholder = "اختر العميل...",
}: Props) {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="border rounded-md w-30 flex items-center justify-between gap-2">
                {value
                    ? clients.find(c => c.id === value)?.name
                    : placeholder}

                <ChevronsUpDown className="opacity-50 size-4" />

            </PopoverTrigger>

            <PopoverContent className="w-100 p-0">

                <Command>

                    <CommandInput placeholder="ابحث عن العميل..." />

                    <CommandEmpty>
                        لا يوجد عميل
                    </CommandEmpty>

                    <CommandGroup>

                        {clients.map(client => (

                            <CommandItem
                                key={client.id}
                                value={client.name}
                                onSelect={() => {

                                    router.push(`/admin/events/new?client=${client.id}`);

                                    setOpen(false);

                                }}
                            >

                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === client.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />

                                {client.name}

                            </CommandItem>

                        ))}

                    </CommandGroup>

                </Command>

            </PopoverContent>

        </Popover>
    );
}