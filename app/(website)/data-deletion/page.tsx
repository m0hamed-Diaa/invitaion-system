"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, Trash2, Mail } from "lucide-react";

export default function DataDeletionPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        reason: "",
        confirmDelete: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.confirmDelete) return;
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen  bg-linear-to-b from-background to-muted/30 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8 pt-10">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-2">
                        <Trash2 className="w-8 h-8 text-destructive" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        حذف البيانات
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        نلتزم في نظام الدعوات الإلكترونية بحماية خصوصيتك. يمكنك طلب حذف
                        جميع بياناتك الشخصية نهائيًا من نظامنا.
                    </p>
                </div>

                {isSubmitted ? (
                    <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                <CardTitle className="text-green-900 dark:text-green-100">
                                    تم استلام طلبك بنجاح
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <p>
                                شكرًا لك، تم استلام طلب حذف البيانات الخاص بالبريد:{" "}
                                <strong className="font-mono">{formData.email}</strong>
                            </p>
                            <p>
                                سيتم معالجة طلبك خلال <strong>7 أيام عمل</strong>. ستصلك رسالة
                                تأكيد على بريدك الإلكتروني بعد إتمام العملية.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData({ email: "", reason: "", confirmDelete: false });
                                }}
                            >
                                إرسال طلب جديد
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <>
                        <Alert variant="destructive" dir="rtl">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle className="text-right">تحذير</AlertTitle>
                            <AlertDescription className="text-right">
                                حذف البيانات نهائي ولا يمكن التراجع عنه. سيتم حذف جميع دعواتك،
                                جهات الاتصال، والردود المرتبطة بحسابك بشكل دائم.
                            </AlertDescription>
                        </Alert>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    ما الذي سيتم حذفه؟
                                </CardTitle>
                                <CardDescription>
                                    عند الموافقة على الحذف، سيتم إزالة البيانات التالية نهائيًا:
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    {[
                                        "معلومات الحساب (الاسم، البريد الإلكتروني، رقم الهاتف)",
                                        "جميع الدعوات الإلكترونية المُرسلة",
                                        "قوائم جهات الاتصال والضيوف",
                                        "الردود وتأكيدات الحضور",
                                        "سجل النشاط والتفضيلات",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <form onSubmit={handleSubmit}>
                                <CardHeader>
                                    <CardTitle>نموذج طلب حذف البيانات</CardTitle>
                                    <CardDescription>
                                        يرجى تعبئة البيانات التالية لطلب الحذف
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            البريد الإلكتروني المرتبط بالحساب{" "}
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="example@email.com"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            dir="rtl"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="reason">
                                            سبب الحذف (اختياري)
                                        </Label>
                                        <Textarea
                                            id="reason"
                                            placeholder="أخبرنا بسبب رغبتك في حذف البيانات، يساعدنا ذلك على تحسين خدماتنا..."
                                            rows={4}
                                            value={formData.reason}
                                            onChange={(e) =>
                                                setFormData({ ...formData, reason: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                                        <Checkbox
                                            id="confirm"
                                            checked={formData.confirmDelete}
                                            onCheckedChange={(checked: boolean) =>
                                                setFormData({
                                                    ...formData,
                                                    confirmDelete: checked as boolean,
                                                })
                                            }
                                        />
                                        <Label
                                            htmlFor="confirm"
                                            className="text-sm leading-relaxed cursor-pointer font-normal"
                                        >
                                            أُقر بأنني قرأت وفهمت أن حذف البيانات نهائي ولا يمكن
                                            التراجع عنه، وأوافق على حذف جميع بياناتي من نظام الدعوات
                                            الإلكترونية.
                                        </Label>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        disabled={!formData.confirmDelete || isSubmitting}
                                        className="w-full sm:w-auto"
                                    >
                                        {isSubmitting ? "جاري المعالجة..." : "إرسال طلب الحذف"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full sm:w-auto"
                                        onClick={() => window.history.back()}
                                    >
                                        إلغاء
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>

                        <Card className="bg-muted/30">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">
                                            هل تواجه مشكلة في تقديم الطلب؟
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني:{" "}
                                            <a
                                                href="mailto:invieqr@gmail.com"
                                                className="text-primary hover:underline font-medium"
                                                dir="ltr"
                                            >
                                                invieqr@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center text-xs text-muted-foreground space-y-1">
                            <p>
                                لمزيد من التفاصيل، يرجى الاطلاع على{" "}
                                <a href="/privacy-policy" className="text-primary hover:underline">
                                    سياسة الخصوصية
                                </a>
                            </p>
                            <p>آخر تحديث: {new Date().toLocaleDateString("ar-EG")}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}