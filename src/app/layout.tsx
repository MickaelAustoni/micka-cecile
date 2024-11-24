import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "@/styles/globals.css";

const josefinSans = localFont({
  src: "../../public/assets/fonts/JosefinSans.ttf",
  variable: "--font-josefin-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: true,
});

export const metadata: Metadata = {
  title: "Micka & Cécile",
  description: "15.11.2025",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <link rel="icon" href="/assets/images/favicon.ico" sizes="any"/>
      <body className={`${josefinSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
