import type { Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./context.css";

const inter = Inter({ subsets: ["latin"], variable: "--ctx-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ctx-mono" });

export const viewport: Viewport = {
  themeColor: "#16181d",
  colorScheme: "dark",
};

export default function ContextLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ctx ${inter.variable} ${plexMono.variable}`}>{children}</div>;
}
