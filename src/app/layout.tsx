import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./lib/polyfills";
// import ClientAnalytics from "./components/ClientAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamza Ammar",
  description: "Resume, projects and experience — Hamza Ammar",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Hamza Ammar",
    description: "Resume, projects and experience — Hamza Ammar",
    url: "/",
    siteName: "Hamza Ammar",
    images: [
      {
        url: "/HA.jpg",
        width: 1200,
        height: 630,
        alt: "Hamza Ammar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ClientAnalytics /> */}
        {children}
      </body>
    </html>
  );
}
