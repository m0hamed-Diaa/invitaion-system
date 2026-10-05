import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import InternetConnectionServicesProvider from "@/providers/InternetConnections";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "انفى | نظام دعوات إلكترونية احترافي",
  description: "أطلق دعواتك الإلكترونية بكل احترافية مع انفى",
  keywords: "دعوات الكترونية, تصميم دعوات, مناسبات, ادارة فعاليات",
  verification: {
    google: "your-google-verification-code",
  },

  other: {

    'facebook-domain-verification': 'pfd25qxxnzgtb9qa9sxd94up92qgle',
    'fb:app_id': 'your-facebook-app-id',      // ✅ عشان تربط التطبيق بميتا
    'fb:admins': 'your-facebook-admin-id',    // ✅ عشان تحدد الأدمن


  },
  icons: {
    icon: "/images/logo.png"
  },
  openGraph: {
    title: "انفى - نظام دعوات إلكترونية احترافي",
    description: "أطلق دعواتك الإلكترونية بكل احترافية",
    siteName: "انفى",
    type: "website",
    url: "https://www.invieq8.com/",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <InternetConnectionServicesProvider>
        <body
          className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="top-center" richColors />
        </body>
      </InternetConnectionServicesProvider>
    </html>
  );
}
