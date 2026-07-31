import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Lock,
    Shield,
    Eye,
    Database,
    UserCheck,
    Mail,
    Phone,
    Trash2,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Badge className="mb-4 bg-primary/10 text-primary border-0 gap-2">
                        <Lock className="w-4 h-4" />
                        سياسة الخصوصية
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        سياسة الخصوصية
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

                {/* Quick Summary Card */}
                <Card className="mb-8 border-2 border-primary/10 bg-linear-to-r from-primary/5 to-secondary/5">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-6 h-6 text-primary" />
                            <h2 className="font-bold text-lg">نبذة سريعة</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            في <span className="text-primary font-semibold">انفى Pro</span>،
                            خصوصيتك مهمة بالنسبة لنا. النظام مصمم بحيث <strong>ما يخزن أي بيانات</strong> عن المستخدمين،
                            لأن التواصل كله عبر واتساب. البيانات الوحيدة المخزنة هي للأدمن فقط لإدارة الدعوات.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>ما نخزن بيانات المستخدمين</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>التوكلن عبر واتساب</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>بيانات مشفرة بالكامل</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content */}
                <div className="space-y-6">
                    {/* Section 1 */}
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">١. وش البيانات اللي نجمعها؟</h2>
                                    <p className="text-gray-600 leading-relaxed mb-3">
                                        بما إن النظام مخصص <strong>للأدمن فقط</strong>، البيانات اللي نجمعها محدودة جداً:
                                    </p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span><strong>للأدمن:</strong> اسم، بريد إلكتروني، معلومات الدعوات اللي ينشئها</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span><strong>للمستخدمين:</strong> <span className="text-red-500 font-semibold">ما نجمع أي بيانات</span> - لأنهم يتواصلون فقط عبر واتساب</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>بيانات الاستخدام الأساسية (مثل عدد الزيارات للصفحة)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>ملفات تعريف الارتباط (كوكيز) لتحسين تجربة التصفح</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 2 */}
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٢. كيف نستخدم البيانات؟</h2>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>نستخدم بيانات الأدمن لتشغيل وإدارة الدعوات الإلكترونية</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>نرسل رسائل للمدعوين عبر الوتساب (بناءً على طلب الأدمن)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>نحلل بيانات الاستخدام عشان نحسن أداء الموقع</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span><strong>ما نستخدم</strong> بيانات المستخدمين لأنه ما عندنا بيانات أساساً!</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 3 */}
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٣. حماية البيانات</h2>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>نستخدم تشفير متقدم (SSL/TLS) لحماية جميع البيانات</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>البيانات مخزنة في خوادم آمنة بجدران حماية متطورة</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>نحدث أنظمة الأمان باستمرار عشان نحمي من الاختراقات</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>ما نشارك بياناتك مع أي طرف ثالث بدون إذنك</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 4 */}
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٤. حقوقك</h2>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>لك الحق في <strong>معرفة</strong> وش البيانات المخزنة عنك</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>لك الحق في <strong>تصحيح</strong> أي بيانات غير صحيحة</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>لك الحق في <strong>طلب حذف</strong> بياناتك بالكامل من النظام</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>لك الحق في <strong>سحب الموافقة</strong> على استخدام بياناتك في أي وقت</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>لتطبيق حقوقك، تواصل معنا عبر واتساب أو البريد الإلكتروني</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 5 */}
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٥. حذف البيانات</h2>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>تقدر تطلب حذف بياناتك في أي وقت</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>بنحذف البيانات خلال <strong>٣٠ يوم</strong> من تاريخ الطلب</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>بعض البيانات ممكن نضطر نحتفظ فيها لأسباب قانونية أو تنظيمية</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary font-bold">•</span>
                                            <span>بيانات المستخدمين ما نحتاج نحذفها لأن <strong>ما عندنا بيانات</strong> من الأساس!</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 6 */}
                    <Card className="border-2 border-primary/20 shadow-sm bg-linear-to-r from-primary/5 to-secondary/5">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">٦. التواصل</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        لأي استفسار بخصوص سياسة الخصوصية، أو عشان تطلب حذف بياناتك، تواصل معنا:
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <a
                                            href="https://wa.me/966500000000?text=السلام+عليكم+استفسار+عن+سياسة+الخصوصية"
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
                                            <Mail className="w-4 h-4" />
                                            البريد الإلكتروني
                                        </a>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-3">
                                        بنرد عليك خلال ٢٤ ساعة إن شاء الله
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Note */}
                <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex items-start gap-3">
                        <Lock className="w-6 h-6 text-gray-400  mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                <strong>ملاحظة مهمة:</strong> سياسة الخصوصية حقنا مصممة عشان تكون شفافة وواضحة.
                                نؤمن بأن <span className="text-primary font-semibold">خصوصية</span> عملائنا خط أحمر،
                                ولهذا صممنا النظام بحيث <strong>ما يخزن أي بيانات</strong> عن المستخدمين العاديين.
                                آخر تحديث كان في {new Date().toLocaleDateString('ar-SA', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}.
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