import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl items-center justify-between py-32 px-16 bg-white sm:items-start">
        مرحبا بك الى نظام الدعوات الالكترونى لخدمة السوق الخليجى
        <Link href="/login">
          <Button>تسجيل دخول</Button>
        </Link>
      </main>
    </div>
  );
}
