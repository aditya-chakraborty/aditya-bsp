import type { Metadata } from "next";
import { Be_Vietnam_Pro, Sarabun } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "BackstagePass - Challenge Feed",
  description: "UI assignment implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} ${sarabun.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
