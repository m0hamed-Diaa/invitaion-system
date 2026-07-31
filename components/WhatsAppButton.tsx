"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-6 right-6 z-50 group"
        >
            <div className="relative">
                {/* Pulsing animation */}
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-50" />

                {/* Button */}
                <div className="relative w-16 h-16 rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/50 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg">
                        تواصل واتساب
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                </div>
            </div>
        </motion.a>
    );
}