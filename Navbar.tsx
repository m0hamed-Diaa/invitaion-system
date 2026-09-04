import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FacebookIcon } from "./icons/FacebookIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { WhatsAppIcon } from "./icons/WhatsapIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { TikTokIcon } from "./icons/TiktokIcon";

const footerLinks = {
    "الخدمة": [
        { label: "الميزات", href: "/#features" },
        { label: "الأسعار", href: "/pricing" },
    ],
    "الشركة": [
        { label: "من نحن", href: "/about" },
        { label: "اتصل بنا", href: "/contact" },
    ],
    "القانونية": [
        { label: "سياسة الخصوصية", href: "/privacy" },
        { label: "الشروط والأحكام", href: "/terms" }
    ],
};

const socialLinks = [
    {
        icon: FacebookIcon,
        href: "https://facebook.com",
        label: "فيسبوك",
        color: "bg-[#1877F2] hover:bg-[#166FE5]"
    },
    {
        icon: InstagramIcon,
        href: "https://instagram.com",
        label: "إنستغرام",
        color: "bg-[#E4405F] hover:bg-[#D03D56]"
    },
    {
        icon: YoutubeIcon,
        href: "https://youtube.com",
        label: "يوتيوب",
        color: "bg-[#FF0000] hover:bg-[#E60000]"
    },
    {
        icon: WhatsAppIcon,
        href: "https://wa.me/966500000000",
        label: "واتساب",
        color: "bg-[#25D366] hover:bg-[#20BD5A]"
    },
    {
        icon: TwitterIcon,
        href: "https://twitter.com",
        label: "تويتر",
        color: "bg-[#000000] hover:bg-[#1a1a1a]"
    },
    {
        icon: TikTokIcon,
        href: "https://tiktok.com",
        label: "تيك توك",
        color: "bg-[#000000] hover:bg-[#1a1a1a]"
    },
];
export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="h-8 w-8 text-primary" />
                            <span className="font-bold text-2xl">انفى</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            نظام دعوات إلكترونية احترافي يساعدك على إنشاء دعوات مبهرة لجميع مناسباتك.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`p-2.5 rounded-xl ${social.color} text-white transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-black/20`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon size={14} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">الخدمة</h3>
                        <ul className="space-y-2">
                            {footerLinks["الخدمة"].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">الشركة</h3>
                        <ul className="space-y-2">
                            {footerLinks["الشركة"].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">القانونية</h3>
                        <ul className="space-y-2">
                            {footerLinks["القانونية"].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-gray-800" />

                <div className="flex flex-wrap justify-between items-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} انفى. جميع الحقوق محفوظة</p>
                    <div className="flex gap-6">
                        <Link href="/privacy">سياسة الخصوصية</Link>
                        <Link href="/terms">الشروط والأحكام</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
