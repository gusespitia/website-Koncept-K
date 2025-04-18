// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Footer from "./footer";
import CookieBanner from '@/components/features/CookieBanner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koncept K",
  description: "Koncept K",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 tracking-tight`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main> {/* Eliminado container y padding */}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}