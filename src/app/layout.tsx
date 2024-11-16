import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";

const josefinSans = localFont({
  src: "assets/fonts/JosefinSans.ttf",
  variable: "--font-josefin-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Micka & Cécile ",
  description: "15.11.2025",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
