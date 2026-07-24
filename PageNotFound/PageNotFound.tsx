import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import { ReactNode } from "react";
interface IProps {
    path: string;
    children?: ReactNode;
}
const PageNotFound = ({ path, children }: IProps) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 p-4">
            <div className="max-w-4xl w-full">
                <div className="flex flex-col items-center justify-center gap-12">
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                        </div>

                        <div className="relative text-center">
                            <h1 className="text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 leading-none text-center animate-in zoom-in duration-700">
                                404
                            </h1>
                            <div
                                className="absolute top-1/4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                                className="absolute bottom-1/4 -right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-6 animate-in slide-in-from-right duration-700">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                حدث خطا! الصفحة غير موجودة
                            </h2>
                            <div className="h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-2"></div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                            الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                            <Link href={`${path}`} className="w-full sm:w-fit">
                                <Button
                                    size="lg"
                                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    العودة إلى الصفحة الرئيسية
                                </Button>
                            </Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;