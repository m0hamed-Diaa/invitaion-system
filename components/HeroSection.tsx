"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Users, Calendar, Sparkles, Phone, CheckCircle2, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { InvitationCard } from "./InvitationCard";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-linear-to-br from-primary/5 via-transparent to-secondary/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <Badge className="px-4 py-2 text-sm bg-linear-to-r from-primary/20 to-secondary/20 text-white border-0 gap-2">
                            <Sparkles className="w-4 h-4" />
                            نظام دعوات إلكترونية احترافي
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                دعواتك الإلكترونية
                            </span>
                            <br />
                            <span className="text-gray-800">بأعلى جودة</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            وَلّع مناسباتك بدعوات إلكترونية مبهرة. نظام متكامل لإدارة الدعوات
                            <span className="text-primary font-semibold"> للأدمن فقط</span>،
                            والمستخدمين يتواصلون معك بسهولة عبر واتساب.
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                <Users className="w-5 h-5 text-primary" />
                                <span className="font-bold text-lg">+10K</span>
                                <span className="text-gray-500 text-sm">عميل</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                <Calendar className="w-5 h-5 text-secondary" />
                                <span className="font-bold text-lg">+50K</span>
                                <span className="text-gray-500 text-sm">دعوة</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="font-bold mr-2 text-sm">4.9</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="gap-2 bg-[#25D366] hover:bg-[#128C7E] text-lg px-8 shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all">
                                    <Phone className="w-5 h-5" />
                                    تواصل واتساب
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </a>
                            <Link href="/video">
                                <Button>مشاهدة الفديو التوضيحى <PlayCircle /></Button>
                            </Link>
                        </div>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                تصميم احترافي
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                تواصل واتساب
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                دعم فوري
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden">

                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                            <InvitationCard />
                            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center animate-pulse">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">تواصل واتساب</p>
                                    <p className="text-xs text-gray-500">رد فوري 24/7</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}