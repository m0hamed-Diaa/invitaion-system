import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, RefreshCw, AlertCircle } from "lucide-react";

interface IProps {
    statusCode?: number;
    title?: string;
    message?: string;
    path: string;
}

const ErrorHandler = ({
    path,
    statusCode = 500,
    title = "خطأ في الخادم الداخلي",
    message = "حدث خطأ في الخادم الداخلي. حاول تحديث الصفحة أو تواصل معنا إذا استمرت المشكلة.",
}: IProps) => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 absolute top-0 left-0 z-999999">
            <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-950/30 animate-ping opacity-75"></div>

                        <div className="relative inline-flex rounded-full bg-red-50 dark:bg-red-950/50 p-6 backdrop-blur-sm">
                            <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-5">
                                <AlertCircle
                                    className="w-10 h-10 md:w-16 md:h-16 text-red-600 dark:text-red-400"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Code */}
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-8xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        {statusCode}
                    </h1>
                    <div className="h-1 w-24 bg-red-500 mx-auto rounded-full"></div>
                </div>

                {/* Error Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                    {title}
                </h2>

                {/* Error Message */}
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                    {message}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href={`${path}`} className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            العودة إلى الصفحة الرئيسية
                        </Button>
                    </Link>

                    <Button
                        onClick={handleRefresh}
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                    >
                        <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        تحديث الصفحة
                    </Button>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        تريد مساعدة؟ {" "}
                        <Link
                            href="/contact"
                            className="pointer-events-none text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            اتصل بنا
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorHandler;