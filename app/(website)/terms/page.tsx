import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Shield,
    CheckCircle2,
    AlertCircle,
    Scale,
    FileText,
    Users,
    Phone,
    Sparkles,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Badge className="mb-4 bg-primary/10 text-primary border-0 gap-2">
                        <Scale className="w-4 h-4" />
                        الشروط والأحكام
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        الشروط والأحكام
                        <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-2xl md:text-3xl mt-2">
                            انفى Pro
                        </span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        آخر تحديث: {new Date().toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Quick Navigation */}
                <Card className="mb-8 border-2 border-primary/10 bg-linear-to-r from-primary/5 to-secondary/5">
                    <CardContent className="p-6">
                        <p className="font-semibold mb-3 text-gray-700">اقرا بسرعة:</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: "قبول الشروط", href: "#acceptance" },
                                { label: "استخدام الخدمة", href: "#usage" },
                                { label: "الملكية الفكرية", href: "#intellectual" },
                                { label: "الدفع والإلغاء", href: "#payment" },
                                { label: "حدود المسؤولية", href: "#liability" },
                                { label: "التواصل", href: "#contact" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm bg-white px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors shadow-sm"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Content */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <Card id="acceptance" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">١. قبول الشروط</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        باستخدامك لخدمة <span className="text-primary font-semibold">انفى Pro</span>،
                                        فأنت توافق على هذي الشروط والأحكام بالكامل. لو ما توافق، لا تستخدم الخدمة.
                                    </p>
                                    <div className="mt-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm text-yellow-800 flex items-start gap-2">
                                            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                                            <span>
                                                <strong>ملاحظة مهمة:</strong> النظام مخصص للأدمن فقط. المستخدمين يتواصلون
                                                مع الأدمن عبر واتساب ولا يسجلون بيانات في الموقع.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 2 */}
                    <Card id="usage" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٢. استخدام الخدمة</h2>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>الخدمة متاحة <strong>للأدمن فقط</strong> لإدارة الدعوات الإلكترونية</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>المستخدمين يتواصلون مع الأدمن عبر <strong>واتساب</strong> فقط</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>ما نسمح باستخدام الخدمة لأغراض غير قانونية أو مخالفة للأنظمة</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>أنت مسؤول عن محتوى الدعوات اللي تنشئها عبر النظام</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>الخدمة متاحة في <strong>السوق الخليجي</strong> (السعودية، الإمارات، الكويت، قطر، البحرين، عمان)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 3 */}
                    <Card id="intellectual" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٣. الملكية الفكرية</h2>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>جميع التصاميم والقوالب في النظام محمية بحقوق الطبع والنشر</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>ما يجوز نسخ أو إعادة توزيع أي محتوى من الموقع بدون إذن خطي</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>اسم <span className="text-primary font-semibold">انفى Pro</span> وشعاره علامة تجارية مسجلة</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>المستخدم يحتفظ بحقوق المحتوى اللي ينشئه (الدعوات الخاصة به)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 4 */}
                    <Card id="payment" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٤. الدفع والإلغاء</h2>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>الخدمة مدفوعة للأدمن حسب الباقة المختارة</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>التواصل مع العملاء يتم عبر <strong>واتساب</strong> لتنسيق الدفع والاشتراك</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>في حالة الإلغاء، يتم إيقاف الخدمة فوراً بدون استرداد للمدفوعات</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>الأسعار قابلة للتغيير مع إشعار مسبق</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 5 */}
                    <Card id="liability" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٥. حدود المسؤولية</h2>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>نحن نقدم الخدمة كما هي بدون ضمانات إضافية</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>ما نتحمل مسؤولية أي أضرار ناتجة عن استخدام الخدمة أو انقطاعها</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>ما نضمن استمرارية الخدمة بدون انقطاع أو أخطاء</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>المستخدم يتحمل مسؤولية محتوى دعواته ومدى التزامها بالأنظمة</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 6 */}
                    <Card id="contact" className="border-2 border-primary/20 shadow-sm">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٦. التواصل</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        لأي استفسار بخصوص الشروط والأحكام، تواصل معنا عبر:
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <a
                                            href="https://wa.me/96551662001?text=السلام+عليكم+استفسار+عن+الشروط+والأحكام"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#128C7E] transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            واتساب
                                        </a>
                                        <a
                                            href="mailto:invieqr@gmail.com"
                                            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            البريد الإلكتروني
                                        </a>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-3">
                                        راح نرد عليك خلال ٢٤ ساعة إن شاء الله
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Note */}
                <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex items-start gap-3">
                        <Scale className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                <strong>ملاحظة:</strong> هذي الشروط والأحكام قابلة للتحديث من وقت لآخر.
                                آخر تحديث كان في {new Date().toLocaleDateString('ar-SA', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}. ننصحك تراجع الصفحة بشكل دوري عشان تكون على اطلاع بأي تغييرات.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            رجوع للرئيسية
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}