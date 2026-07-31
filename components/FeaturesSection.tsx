"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Palette,
  Share2,
  Users,
  BarChart3,
  Shield,
  Smartphone,
  Globe,
  Zap,
  Phone,
  Sparkles as SparklesIcon,
  Layout
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const features = [
  {
    icon: Palette,
    title: "تصاميم فخمة",
    description: "مكتبة ضخمة من قوالب الدعوات المصممة بأعلى جودة تناسب الأفراح والمناسبات الخليجية.",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    icon: Phone,
    title: "تواصل واتساب",
    description: "المستخدمين يتواصلون معك مباشرة عبر واتساب بضغطة زر. نظام مبسط وسريع.",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10"
  },
  {
    icon: Share2,
    title: "مشاركة سهلة",
    description: "شارك دعواتك عبر واتساب، بنظام حماية كامل للبيانات مع إمكانية التتبع.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: Users,
    title: "إدارة الحضور",
    description: "نظام متكامل لإدارة قائمة المدعوين مع تأكيد الحضور، الأعتذار مع تقرير نهائى للمدعوين.",
    color: "text-green-500",
    bg: "bg-green-50"
  },
  {
    icon: BarChart3,
    title: "تحليلات متقدمة",
    description: "تقارير مفصلة عن نسبة المشاهدة والتفاعل عشان تعرف وش يسوي جمهورك.",
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    icon: Shield,
    title: "أمان وحماية",
    description: "حماية متقدمة للبيانات مع تشفير كامل وخصوصية تامة للمعلومات.",
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    icon: Smartphone,
    title: "متجاوب مع الجوال",
    description: "تصميم يشتغل بشكل مثالي على جميع الأجهزة والجوالات المختلفة.",
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    icon: Globe,
    title: "دعم اللهجة الخليجية",
    description: "الموقع بالكامل باللهجة الخليجية عشان يكون قريب من قلب المستخدم.",
    color: "text-cyan-500",
    bg: "bg-cyan-50"
  },
  {
    icon: Zap,
    title: "سرعة فائقة",
    description: "نظام سريع ومبني بأحدث التقنيات عشان ما تنتظر شوية في التحميل.",
    color: "text-yellow-500",
    bg: "bg-yellow-50"
  },
  {
    icon: Layout,
    title: "واجهة سهلة",
    description: "واجهة مستخدم بسيطة ومباشرة عشان أي أحد يقدر يستخدمها بدون تعقيد.",
    color: "text-pink-500",
    bg: "bg-pink-50"
  },
  {
    icon: SparklesIcon,
    title: "تحديثات مستمرة",
    description: "نضيف ميزات جديدة باستمرار عشان نواكب احتياجات السوق الخليجي.",
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">مميزات الخدمة</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            وش اللي يميز <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">نظامنا</span>؟
          </h2>
          <p className="text-xl text-gray-600">
            مجموعة متكاملة من الميزات المصممة خصيصاً عشان دعواتك تكون مميزة وفخمة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
              <Phone className="w-7 h-7 text-[#25D366]" />
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">تبغى تبدأ؟</p>
              <p className="text-gray-500">تواصل معنا على واتساب واحنا نخدمك</p>
            </div>
            <a
              href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2">
                <Phone className="w-4 h-4" />
                تواصل الآن
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}