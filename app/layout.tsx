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
  title: "نظام ادارة الدعوات الالكترونية",
  description: "دير نظام الدعوات الالكترونية",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InternetConnectionServicesProvider>
          {/* <OnOpenHomePage /> */}
          {children}
        </InternetConnectionServicesProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
