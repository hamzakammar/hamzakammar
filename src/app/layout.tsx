import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./lib/polyfills";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamzaammar.ca"),
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var stored = localStorage.getItem('theme');
            if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          } catch(e) {}
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
