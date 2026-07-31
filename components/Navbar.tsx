"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "عن الخدمة" },
    { href: "/contact", label: "تواصل" },
    { href: "/privacy", label: "سياسة الخصوصية" },
    { href: "/terms", label: "الشروط والأحكام" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
                    : "bg-white/80 backdrop-blur-sm border-b border-gray-100/50"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <span className="font-bold text-2xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                انفى
                            </span>
                            <span className="block text-[10px] text-gray-400 font-medium tracking-wider">
                                نظام دعوات إلكترونية
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                                        isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-gray-600 hover:text-primary hover:bg-primary/5"
                                    )}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-linear-to-r from-primary to-secondary rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* WhatsApp Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                        >
                            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 gap-2">
                                <Phone className="w-4 h-4" />
                                تواصل واتساب
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-75 sm:w-100 p-0">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between p-6 border-b">
                                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                        <Sparkles className="h-6 w-6 text-primary" />
                                        <span className="font-bold text-xl">انفى</span>
                                    </Link>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="flex flex-col gap-2">
                                        {navLinks.map((link) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={cn(
                                                        "px-4 py-3 rounded-lg text-base font-medium transition-all",
                                                        isActive
                                                            ? "bg-primary/10 text-primary"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                                    )}
                                                >
                                                    {link.label}
                                                    {isActive && (
                                                        <span className="float-left text-primary">←</span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8 pt-8 border-t">
                                        <a
                                            href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 gap-2">
                                                <Phone className="w-4 h-4" />
                                                تواصل واتساب
                                            </Button>
                                        </a>

                                        <div className="mt-6 space-y-3">
                                            <p className="text-sm text-gray-500 text-center">تابعنا</p>
                                            <div className="flex justify-center gap-4">
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                                    <span className="sr-only">فيسبوك</span>
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                                    <span className="sr-only">تويتر</span>
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                                    <span className="sr-only">انستقرام</span>
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}