"use client";

import { motion } from "framer-motion";
import {
    Sparkles,
    Heart,
    Camera,
    Music,
    Calendar,
    Grid2x2Check,
    Users,
    QrCode,
    ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function InvitationCard() {
    const scrollToNextSection = () => {
        window.scrollBy({
            top: 800,
            behavior: 'smooth'
        });
    };
    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-12 relative overflow-hidden">
            <FloatingBackgroundElements />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-lg shadow-black/10"
            >
                <div className="relative w-full aspect-4/5 max-h-150">
                    <Image
                        src="/images/posterImage.png"
                        alt="دعوة زفاف"
                        fill
                        className="object-cover"
                        priority
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                    <FloatingOverlayElements />

                    <div className="absolute bottom-4 left-4 right-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-2 text-white/80"
                        >
                            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px]">
                                <Camera className="w-3 h-3" />
                                <span>صور حية</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px]">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                <span>مباشر</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        className="absolute top-3 right-3"
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/30">
                            <div className="flex flex-col items-center gap-0.5">
                                <div className="w-12 h-12 bg-linear-to-br from-rose-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <QrCode className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-[8px] font-bold text-gray-700 tracking-tight">SCAN RSVP</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-6"
                onClick={scrollToNextSection}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex flex-col items-center text-gray-400 cursor-pointer text-xs"
                >
                    <span>تمرير</span>
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </div>
    );
}

function FloatingBackgroundElements() {
    const elements = [
        { icon: Heart, color: "text-rose-200/50", size: 5, x: "5%", y: "10%", delay: 0 },
        { icon: Sparkles, color: "text-purple-200/50", size: 4, x: "88%", y: "15%", delay: 1 },
        { icon: Music, color: "text-rose-200/50", size: 4.5, x: "3%", y: "75%", delay: 2 },
        { icon: Camera, color: "text-purple-200/50", size: 4, x: "92%", y: "80%", delay: 0.5 },
        { icon: Heart, color: "text-pink-200/40", size: 3.5, x: "45%", y: "5%", delay: 1.5 },
        { icon: Sparkles, color: "text-rose-200/40", size: 3, x: "80%", y: "50%", delay: 0.8 },
        { icon: Calendar, color: "text-purple-200/40", size: 3.5, x: "15%", y: "90%", delay: 2.5 },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {elements.map((el, i) => (
                <motion.div
                    key={i}
                    className={cn("absolute", el.color)}
                    style={{
                        left: el.x,
                        top: el.y,
                    }}
                    animate={{
                        y: [0, -20, 0, 20, 0],
                        x: [0, 15, 0, -15, 0],
                        rotate: [0, 8, -8, 5, 0],
                    }}
                    transition={{
                        duration: 6 + i * 1.5,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "easeInOut",
                    }}
                >
                    <el.icon
                        className="opacity-60"
                        style={{ width: el.size * 4, height: el.size * 4 }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

function FloatingOverlayElements() {
    const elements = [
        { icon: Heart, label: "Love", x: "10%", y: "12%", delay: 0 },
        { icon: Camera, label: "Live", x: "78%", y: "18%", delay: 0.8 },
        { icon: Grid2x2Check, label: "Easly", x: "85%", y: "72%", delay: 0.4 },
        { icon: Users, label: "RSVP", x: "8%", y: "82%", delay: 1.2 },
    ];

    return (
        <>
            {elements.map((el, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/15 backdrop-blur-sm rounded-lg p-1.5 shadow-lg border border-white/20"
                    style={{
                        left: el.x,
                        top: el.y,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0, 8, 0],
                    }}
                    transition={{
                        opacity: { delay: 0.3 + i * 0.15 },
                        scale: { delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 },
                        y: {
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <div className="flex flex-col items-center gap-0">
                        <el.icon className="w-4 h-4 text-white drop-shadow-lg" />
                        <span className="text-[7px] font-medium text-white/90 tracking-tight">
                            {el.label}
                        </span>
                    </div>
                </motion.div>
            ))}
        </>
    );
}