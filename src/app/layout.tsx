import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"], // specify weights you want to use
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atravel Reports",
  description: "See bookings performance reports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}><Suspense>{children}</Suspense></body>
    </html>
  );
}
