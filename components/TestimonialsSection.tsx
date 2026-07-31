"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "أحمد محمد",
        role: "منظم حفلات",
        avatar: "/images/avatar1.jpg",
        content: "أفضل نظام دعوات الكترونية استخدمته على الإطلاق! سهولة الاستخدام والتصاميم الاحترافية جعلت عملائي سعداء جداً.",
        rating: 5
    },
    {
        name: "سارة علي",
        role: "مصممة جرافيك",
        avatar: "/images/avatar2.jpg",
        content: "مذهل! مكتبة التصاميم ضخمة ومتنوعة. واجهة المستخدم سلسة وسهلة حتى للمبتدئين.",
        rating: 5
    },
    {
        name: "خالد عبدالله",
        role: "مدير تسويق",
        avatar: "/images/avatar3.jpg",
        content: "أداة رائعة لإنشاء دعوات احترافية بسرعة. أحببت خاصية التتبع والتحليلات المتقدمة.",
        rating: 4
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-linear-to-br from-primary/5 via-transparent to-secondary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ماذا يقول <span className="text-primary">عملاؤنا</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        آراء حقيقية من عملاء استخدموا نظام الدعوات الإلكترونية
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="relative overflow-hidden">
                                <CardContent className="p-6">
                                    <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={testimonial.avatar} />
                                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4">{testimonial.content}</p>

                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}