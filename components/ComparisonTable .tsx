"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    XCircle,
    Sparkles,
    ArrowLeft,
    Zap,
    Users,
    Calendar,
    Image,
    RefreshCw,
    Leaf,
    DollarSign,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";

const comparisonData = [
    {
        feature: "تسليم فوري",
        icon: Zap,
        description: "وصول الدعوة للضيف فور إرسالها",
        digital: true,
        traditional: false,
    },
    {
        feature: "تتبع تلقائي لتأكيد الحضور",
        icon: Users,
        description: "معرفة من حضر ومن لا في لحظتها",
        digital: true,
        traditional: false,
    },
    {
        feature: "جمع تفضيلات الضيوف",
        icon: Calendar,
        description: "معرفة رغبات الضيوف مسبقاً",
        digital: true,
        traditional: false,
    },
    {
        feature: "جداول الفعاليات متعددة الأيام",
        icon: Clock,
        description: "جدول زمني كامل للفعالية",
        digital: true,
        traditional: false,
    },
    {
        feature: "مشاركة الصور المدمجة",
        icon: Image,
        description: "إضافة صور مباشرة",
        digital: true,
        traditional: false,
    },
    {
        feature: "تحديثات فورية",
        icon: RefreshCw,
        description: "تغييرات تنعكس مباشرة عند الضيوف",
        digital: true,
        traditional: false,
    },
    {
        feature: "بدون تكاليف طباعة",
        icon: DollarSign,
        description: "وفر فلوس الطباعة والشحن",
        digital: true,
        traditional: false,
    },
    {
        feature: "صديق للبيئة",
        icon: Leaf,
        description: "لا ورق ولا هدر للبيئة",
        digital: true,
        traditional: false,
    },
];

export function ComparisonTable() {
    return (
        <section className="py-20 bg-linear-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <Badge className="mb-4 bg-primary/10 text-primary border-0 gap-2 text-sm px-4 py-2">
                        <Sparkles className="w-4 h-4" />
                        مقارنة سريعة
                    </Badge>

                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        ليش تختار <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">الإلكتروني</span> بدل الورقي؟
                    </h2>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        شوف كيف نظام الدعوات الإلكترونية يفوق الدعوات الورقية في كل شيء
                    </p>
                </motion.div>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Traditional Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-2 border-red-100 bg-linear-to-br from-red-50/50 to-white h-full">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-700">الدعوات الورقية</h3>
                                        <p className="text-sm text-gray-500">طريقة تقليدية</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {comparisonData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-red-100"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-600">
                                                    {item.feature}
                                                </span>
                                            </div>
                                            <XCircle className="w-5 h-5 text-red-400" />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                                    <p className="text-sm text-red-600 text-center">
                                        ⚠️ محدودية في كل شيء
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Digital Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/5 to-secondary/5 h-full relative overflow-hidden">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-primary/10 to-secondary/10 rounded-full blur-3xl" />

                            <CardContent className="p-6 relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-linear-to-r from-primary to-secondary flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            انفى Pro
                                        </h3>
                                        <p className="text-sm text-gray-500">نظام دعوات إلكترونية</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {comparisonData.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                    <item.icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {item.feature}
                                                    </span>
                                                    <p className="text-xs text-gray-400 hidden sm:block">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                                    <p className="text-sm text-primary/80 text-center font-medium">
                                        ✨ كل الميزات في منصة واحدة
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="inline-flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold">٨ أسباب تخليك تختار الإلكتروني</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                        <a
                            href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-linear-to-r from-primary to-secondary hover:opacity-90 gap-2">
                                <Sparkles className="w-4 h-4" />
                                جرب النظام الحين
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { label: "ميزة حصرية", value: "٨", icon: Sparkles },
                        { label: "توفير في التكاليف", value: "٨٠٪", icon: DollarSign },
                        { label: "أسرع في التسليم", value: "١٠٠٪", icon: Zap },
                        { label: "صديق للبيئة", value: "١٠٠٪", icon: Leaf },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center"
                        >
                            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}