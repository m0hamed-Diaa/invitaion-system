"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const galleryImages = [
    {
        src: "/images/inve1.jpeg",
        title: "دعوة حفل زفاف",
        category: "زفاف",
        width: 400,
        height: 500
    },
    {
        src: "/images/inve2.jpeg",
        title: "دعوة عقد قران ",
        category: "مناسبات",
        width: 400,
        height: 500
    },
    {
        src: "/images/inve3.jpeg",
        title: "دعوة عقد قران",
        category: "مناسبات",
        width: 400,
        height: 500
    },
    {
        src: "/images/inve4.jpeg",
        title: "دعوة عقد قران",
        category: "مناسبات",
        width: 400,
        height: 500
    },
    {
        src: "/images/inve5.jpeg",
        title: "دعوة استقبال",
        category: "مناسبة",
        width: 400,
        height: 500
    }
];

export function GallerySection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        معرض <span className="text-primary">الدعوات</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        اكتشف تشكيلتنا المتنوعة من تصاميم الدعوات الإلكترونية
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-xl"
                        >
                            <Card className="overflow-hidden border-0">
                                <div className="relative aspect-4/5">
                                    <Image
                                        src={image.src}
                                        alt={image.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="font-semibold">{image.title}</p>
                                        <p className="text-sm text-white/80">{image.category}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}