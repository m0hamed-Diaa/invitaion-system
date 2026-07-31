import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Phone, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-4xl mx-auto">
                <Badge className="mb-4 bg-primary/10 text-primary border-0">عن الخدمة</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    نظام دعوات إلكترونية
                    <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                        بلمسة خليجية
                    </span>
                </h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-600 leading-relaxed">
                        انفى Pro هو نظام دعوات إلكترونية متطور صممناه خصيصاً عشان يخدم السوق الخليجي.
                        النظام مخصص <span className="text-primary font-semibold">للأدمن فقط</span>،
                        العملاء يتواصلون معك بسهولة عبر واتساب.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg">وش هي الفكرة؟</h3>
                                <p className="text-gray-600">
                                    نظام متكامل لإدارة الدعوات الإلكترونية. الأدمن يتحكم بكل شيء، العملاء يتواصلون معه مباشرة عبر واتساب. بسيطة وسريعة!
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg">ليش واتساب؟</h3>
                                <p className="text-gray-600">
                                    الواتساب هو التطبيق الأكثر استخداماً في الخليج. لذا خليّنا التواصل سهل ومباشر بدون تعقيد.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">ليش تختارنا؟</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>تصاميم فخمة:</strong> قوالب دعوات مصممة بأعلى جودة تناسب الأفراح والمناسبات الخليجية</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>تواصل واتساب:</strong> المستخدمين يتواصلون معك بضغطة زر بدون تعقيد</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>إدارة كاملة:</strong> نظام متكامل للأدمن لإدارة الدعوات والحضور والإحصائيات</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>دعم فوري:</strong> فريقنا على الواتساب يرد عليك خلال دقائق</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>اللهجة الخليجية:</strong> الموقع كامل باللهجة اللي تفهمها وتتأقلم معها</span>
                        </li>
                    </ul>

                    <div className="mt-8 p-6 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
                        <h3 className="font-bold text-lg mb-2">جاهز تبدأ؟</h3>
                        <p className="text-gray-600">
                            تواصل معنا على واتساب واحنا نجهز لك نظام الدعوات الإلكترونية حق مناسبتك.
                            الرد خلال دقائق!
                        </p>
                        <a
                            href="https://wa.me/96551662001?text=السلام+عليكم+ابغى+استفسر+عن+نظام+الدعوات+الإلكترونية"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-[#25D366] font-semibold hover:underline"
                        >
                            <Phone className="w-4 h-4" />
                            تواصل واتساب
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}