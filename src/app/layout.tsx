import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyAbroad 2027 — Plan your study abroad with real, updated numbers",
  description:
    "The complete 74-page reference for Indian students — costs, visa rules, scholarships and stay-back rights across 15 countries. Updated Nov 2026. Instant PDF download, Rs 251.",
  keywords: [
    "study abroad",
    "Indian students",
    "study abroad 2027",
    "student visa",
    "scholarships",
    "stay-back",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "StudyAbroad 2027 — The Complete Book",
    description:
      "74 pages · 15 countries · Updated Nov 2026. Plan your study abroad with real, updated numbers.",
    siteName: "StudyAbroad",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
