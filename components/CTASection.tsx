"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Phone, MessageCircle, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-secondary/60" />

            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        جهز دعوتك الإلكترونية الحين!
                    </h2>

                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        تواصل معنا على واتساب واحنا نساعدك تطلق دعواتك الإلكترونية بأعلى جودة.
                        <span className="block text-white/70 text-lg mt-2">
                            النظام مخصص للأدمن فقط - المستخدمين يتواصلون معك بسهولة
                        </span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <CheckCircle className="w-5 h-5" />
                            <span>دعم فوري</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Clock className="w-5 h-5" />
                            <span>خدمة 24/7</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Shield className="w-5 h-5" />
                            <span>خصوصية تامة</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 gap-3 shadow-xl">
                                <Phone className="w-5 h-5" />
                                تواصل واتساب
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </a>
                    </div>

                    <p className="text-white/60 text-sm mt-6">
                        * الرد خلال دقائق. نشتغل من الأحد للخميس
                    </p>
                </motion.div>
            </div>
        </section>
    );
}