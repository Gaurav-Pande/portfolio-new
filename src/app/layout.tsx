import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurav Pande | Software Engineer & ML Enthusiast",
  description: "Software Engineer at Microsoft Azure. Georgia Tech CS grad specializing in Machine Learning. Building intelligent systems at scale.",
  keywords: ["Software Engineer", "Machine Learning", "Microsoft", "Georgia Tech", "AI", "Open Source"],
  authors: [{ name: "Gaurav Pande" }],
  openGraph: {
    title: "Gaurav Pande | Software Engineer & ML Enthusiast",
    description: "Software Engineer at Microsoft Azure. Building intelligent systems at scale.",
    url: "https://gauravpande.in",
    siteName: "Gaurav Pande",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Pande | Software Engineer & ML Enthusiast",
    description: "Software Engineer at Microsoft Azure. Building intelligent systems at scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030014] text-white`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
