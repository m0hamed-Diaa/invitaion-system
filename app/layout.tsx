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
    'facebook-domain-verification': 'your-facebook-domain-verification-code',
    'fb:app_id': 'your-facebook-app-id',
    'fb:admins': 'your-facebook-admin-id',  
  },
  icons: {
    icon: "/images/logo.png"
  },
  openGraph: {
    title: "انفى - نظام دعوات إلكترونية احترافي",
    description: "أطلق دعواتك الإلكترونية بكل احترافية",
    type: "website",
    url: "https://your-domain.com",
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
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InternetConnectionServicesProvider>
          {children}
        </InternetConnectionServicesProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
