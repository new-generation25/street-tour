import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScriptLoadProvider } from "@/context/ScriptLoadContext";
import { TreasureProvider } from "@/context/TreasureContext";
import LayoutClient from "@/components/LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Street Tour - 골목 탐험",
  description: "QR 코드로 골목을 탐험하고 보물을 찾는 모바일 게임",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Street Tour"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Street Tour" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <TreasureProvider>
        <ScriptLoadProvider>
          <LayoutClient className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
          </LayoutClient>
        </ScriptLoadProvider>
      </TreasureProvider>
    </html>
  );
}
