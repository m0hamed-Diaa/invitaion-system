"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
                    <p className="text-xl text-gray-600">
                        احنا هنا عشان نخدمك. تواصل معنا على واتساب
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        <Card className="border-2 border-primary/10">
                            <CardContent className="p-6 space-y-6">
                                <h2 className="text-2xl font-bold mb-4">طرق التواصل</h2>

                                <div className="flex items-center gap-4 p-4 bg-[#25D366]/5 rounded-xl border border-[#25D366]/20">
                                    <div className="p-3 bg-[#25D366]/10 rounded-lg text-[#25D366]">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">واتساب - الأسرع</p>
                                        <p className="text-gray-500 text-sm">رد فوري خلال دقائق</p>
                                    </div>
                                    <a
                                        href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="bg-[#25D366] hover:bg-[#128C7E]">
                                            تواصل
                                        </Button>
                                    </a>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">البريد الإلكتروني</p>
                                        <p className="text-gray-500">invieqr@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">المقر الرئيسي</p>
                                        <p className="text-gray-500">الكويت، دولة الكويت</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">أوقات العمل</p>
                                        <p className="text-gray-500">الأحد - الخميس: 9 ص - 6 م</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}