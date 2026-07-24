"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    href: string;
    label: string;
    icon: React.ElementType;
    isCollapsed: boolean;
    onClick: () => void;
}

export default function SidebarItem({
    href,
    label,
    icon: Icon,
    isCollapsed,
    onClick
}: SidebarItemProps) {
    const pathname = usePathname();

    const isActive =
        href === "/admin"
            ? pathname === href
            : pathname.startsWith(href);

    return (
        <Link
            onClick={onClick}
            href={href}
            className={`
        flex items-center gap-3 rounded-xl px-1 py-5 text-sm
        transition-all duration-200 hover:scale-[1.02]
        ${isActive
                    ? `
              bg-primary
              text-primary-foreground
              shadow-lg
            `
                    : `
              hover:bg-accent
              hover:text-accent-foreground
            `
                }
      `}
        >
            {isCollapsed ? (
                <Icon className="h-5 w-5" />
            ) : (
                <>
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                </>
            )}
        </Link>
    );
}